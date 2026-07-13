# oxlint-config-satya164

This is my personal [Oxlint](https://oxc.rs/) config. I try to avoid rules which are purely stylistic and based on personal opinions. I'm trying to keep it non-intrusive and aimed towards catching actual errors.

## Features

The config includes these plugins:

- [import](https://oxc.rs/docs/guide/usage/linter/rules.html#import)
- [jest](https://oxc.rs/docs/guide/usage/linter/rules.html#jest)
- [promise](https://oxc.rs/docs/guide/usage/linter/rules.html#promise)
- [react](https://oxc.rs/docs/guide/usage/linter/rules.html#react)
- [typescript](https://oxc.rs/docs/guide/usage/linter/rules.html#typescript)
- [unicorn](https://oxc.rs/docs/guide/usage/linter/rules.html#unicorn)
- [vitest](https://oxc.rs/docs/guide/usage/linter/rules.html#vitest)

The config uses the `overrides` feature of oxlint to automatically adjust the config based on the filename. For example, TypeScript support is enabled for `.ts` and `.tsx` files, stricter rules are enabled for test files and more.

## Usage

First, install the required packages:

```sh
npm install --save-dev oxlint oxlint-config-satya164
```

Now create an `oxlint.config.ts` in your project root and compose the configs you need:

```ts
import { compose } from 'oxlint-config-satya164';
import react from 'oxlint-config-satya164/react';
import recommended from 'oxlint-config-satya164/recommended';

export default compose(recommended, react);
```

The `compose` function accepts config objects or nested arrays.
Configs are applied in order, so later rules and options override earlier ones.

You can also enable type-aware rules:

```ts
import { compose } from 'oxlint-config-satya164';
import recommended from 'oxlint-config-satya164/recommended';
import typechecked from 'oxlint-config-satya164/typechecked';

export default compose(recommended, typechecked);
```

Type-aware rules require [`oxlint-tsgolint`](https://www.npmjs.com/package/oxlint-tsgolint):

```sh
npm install --save-dev oxlint-tsgolint
```

## Available configs

- **`recommended`** — Core JavaScript/TypeScript rules, import, promise, and unicorn rules.
- **`react`** — React and React hooks rules including JSX validation, DOM safety, and component best practices.
- **`typechecked`** — Strict type-checked TypeScript rules (requires `oxlint-tsgolint`).
- **`vitest`** — Rules for Vitest test files.
- **`jest`** — Rules for Jest test files.

To lint your files, you can add the following script to your `package.json`:

```json
"scripts": {
  "lint": "oxlint"
}
```

To show lint errors in your editor, install the [Oxc extension](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) for [VSCode](https://code.visualstudio.com). Add the following in `settings.json` to enable auto-fix on save:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.oxc": "always"
  }
}
```

On Mac OS, you can open `settings.json` file from `Code` > `Preferences` > `Settings` or via the keyboard shortcut <kbd>⌘,</kbd>.

Happy linting 🎉
