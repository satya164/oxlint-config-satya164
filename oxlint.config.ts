import { defineConfig } from 'oxlint';
import jest from './jest.ts';
import react from './react.ts';
import recommended from './recommended.ts';
import typechecked from './typechecked.ts';
import vitest from './vitest.ts';

export default defineConfig({
  extends: [recommended, react, typechecked, vitest, jest],
});
