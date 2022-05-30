import sinon from 'sinon';

export default class GraphqlStub {
  constructor() {
    this.mutation = sinon.stub();
    this.query = sinon.stub();
  }
}
