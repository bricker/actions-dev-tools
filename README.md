# actions-dev-tools

Tools for developing Github Actions.

## Installation

TODO

## Test Stubs

The test stubs are an incomplete suite of sinon stubs for common libraries used in javascript actions.

For example, a stub for the `@actions/core` npm package is provided as `CoreStub`. You can pass in an instance of this stub object to your tests and use it as a stub or spy. For example:

```js
import test from 'node:test'
import assert from 'node:assert'
import { CoreStub } from '@bricker/actions-dev-tools';
import runAction from './action/main.js'

test('successful action output', async (t) => {
  const coreStub = new CoreStub();
  await runAction({ core: coreStub });
  assert(coreStub.setOutput.calledWith('result', 'success'));
});
```

### CoreStub

TODO

### ExecStub

TODO

### GitHubStub

TODO

### FsStub

TODO

### GraphqlStub

TODO

### SuperagentStub

TODO

### Utility

TODO
