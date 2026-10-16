import { adevDiff } from './adev-diff';

export default () => ({ langs: ['angular-ts', 'angular-html'], transformers: [adevDiff()] });
