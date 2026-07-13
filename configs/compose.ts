import { defineConfig, type OxlintConfig, type OxlintOverride } from 'oxlint';

export type Config = OxlintConfig | readonly Config[];

type OverrideFields = Pick<
  OxlintConfig,
  'env' | 'globals' | 'jsPlugins' | 'plugins' | 'rules'
>;

const isConfigArray = (config: Config): config is readonly Config[] =>
  Array.isArray(config);

const patternsMatch = (previous: string[], current: string[]): boolean => {
  const previousPatterns = new Set(previous);
  const currentPatterns = new Set(current);

  return (
    previousPatterns.size === currentPatterns.size &&
    [...previousPatterns].every((pattern) => currentPatterns.has(pattern))
  );
};

const mergeOverride = (
  previous: OxlintOverride,
  current: OverrideFields,
): OxlintOverride => {
  const result = { ...previous };

  if (current.env) {
    result.env = { ...previous.env, ...current.env };
  }

  if (current.globals) {
    result.globals = { ...previous.globals, ...current.globals };
  }

  if (current.jsPlugins) {
    result.jsPlugins = [...(previous.jsPlugins ?? []), ...current.jsPlugins];
  }

  if (current.plugins) {
    result.plugins = [
      ...new Set([...(previous.plugins ?? []), ...current.plugins]),
    ];
  }

  if (current.rules) {
    result.rules = { ...previous.rules, ...current.rules };
  }

  return result;
};

const scopesMatch = (
  previous: OxlintOverride,
  current: OxlintOverride,
): boolean =>
  patternsMatch(previous.files, current.files) &&
  patternsMatch(previous.excludeFiles ?? [], current.excludeFiles ?? []);

export const compose = (...configs: Config[]): OxlintConfig => {
  let result: OxlintConfig = {};
  let overrides: OxlintOverride[] = [];

  const merge = (config: Config): void => {
    if (isConfigArray(config)) {
      config.forEach(merge);
      return;
    }

    config.extends?.forEach(merge);

    overrides = overrides.map((override) => {
      const inherited = { ...override };

      if (config.plugins && result.plugins) {
        inherited.plugins = [
          ...new Set([...result.plugins, ...(override.plugins ?? [])]),
        ];
      }

      if (config.jsPlugins && result.jsPlugins) {
        inherited.jsPlugins = [
          ...result.jsPlugins,
          ...(override.jsPlugins ?? []),
        ];
      }

      return mergeOverride(inherited, config);
    });

    const current = { ...config };
    const currentOverrides = current.overrides ?? [];
    const previous = result;

    delete current.extends;
    delete current.overrides;

    result = {
      ...previous,
      ...current,
    };

    if (previous.categories || current.categories) {
      result.categories = { ...previous.categories, ...current.categories };
    }

    if (previous.env || current.env) {
      result.env = { ...previous.env, ...current.env };
    }

    if (previous.globals || current.globals) {
      result.globals = { ...previous.globals, ...current.globals };
    }

    if (previous.options || current.options) {
      result.options = { ...previous.options, ...current.options };
    }

    if (previous.rules || current.rules) {
      result.rules = { ...previous.rules, ...current.rules };
    }

    if (previous.settings || current.settings) {
      result.settings = { ...previous.settings, ...current.settings };
    }

    if (previous.ignorePatterns || current.ignorePatterns) {
      result.ignorePatterns = [
        ...(previous.ignorePatterns ?? []),
        ...(current.ignorePatterns ?? []),
      ];
    }

    if (previous.jsPlugins || current.jsPlugins) {
      result.jsPlugins = [
        ...(previous.jsPlugins ?? []),
        ...(current.jsPlugins ?? []),
      ];
    }

    if (previous.plugins || current.plugins) {
      result.plugins = [
        ...new Set([...(previous.plugins ?? []), ...(current.plugins ?? [])]),
      ];
    }

    currentOverrides.forEach((override) => {
      const index = overrides.findIndex((current) =>
        scopesMatch(current, override),
      );

      if (index === -1) {
        overrides.push(override);
        return;
      }

      const [previousOverride] = overrides.splice(index, 1);

      overrides.push(mergeOverride(previousOverride, override));
    });
  };

  configs.forEach(merge);

  if (overrides.length > 0) {
    result.overrides = overrides;
  }

  return defineConfig(result);
};
