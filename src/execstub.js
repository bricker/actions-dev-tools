import sinon from 'sinon';

export default class ExecStub {
  constructor() {
    this.exec = sinon.stub();
    this.getExecOutput = sinon.stub().returns({ stdout: '' });
  }
}
