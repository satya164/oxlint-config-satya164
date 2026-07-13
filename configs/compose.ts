import { defineConfig, type OxlintConfig } from 'oxlint';

export type Config = OxlintConfig | readonly Config[];

const isConfigArray = (config: Config): config is readonly Config[] =>
  Array.isArray(config);

export const compose = (...configs: Config[]): OxlintConfig => {
  let result: OxlintConfig = {};

  const merge = (config: Config): void => {
    if (isConfigArray(config)) {
      config.forEach(merge);
      return;
    }

    config.extends?.forEach(merge);

    const current = { ...config };
    const previous = result;

    delete current.extends;

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

    if (previous.overrides || current.overrides) {
      result.overrides = [
        ...(previous.overrides ?? []),
        ...(current.overrides ?? []),
      ];
    }

    if (previous.plugins || current.plugins) {
      result.plugins = [
        ...new Set([...(previous.plugins ?? []), ...(current.plugins ?? [])]),
      ];
    }
  };

  configs.forEach(merge);

  return defineConfig(result);
};
