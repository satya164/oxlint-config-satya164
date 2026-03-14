import { defineConfig } from 'oxlint';
import jest from './configs/jest.ts';
import react from './configs/react.ts';
import recommended from './configs/recommended.ts';
import typechecked from './configs/typechecked.ts';
import vitest from './configs/vitest.ts';

export default defineConfig({
  extends: [recommended, react, typechecked, vitest, jest],
});
