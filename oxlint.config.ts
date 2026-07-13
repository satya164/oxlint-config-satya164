import { compose } from './configs/index.ts';
import jest from './configs/jest.ts';
import react from './configs/react.ts';
import recommended from './configs/recommended.ts';
import typechecked from './configs/typechecked.ts';
import vitest from './configs/vitest.ts';

export default compose(recommended, react, typechecked, vitest, jest);
