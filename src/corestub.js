import sinon from 'sinon';

export default class CoreStub {
  constructor(githubInputs) {
    this.githubInputs = githubInputs || {};
    this.githubOutputs = {};
    this.env = {};

    this.getInput = sinon.stub().callsFake(this.getInputString);
    this.getBooleanInput = sinon.stub().callsFake(this.getInputBoolean);
    this.setOutput = sinon.stub().callsFake(this.setOutputString);
    this.exportVariable = sinon.stub().callsFake(this.setEnvironmentVariable);
    this.info = sinon.spy();
    this.warning = sinon.spy();
    this.setFailed = sinon.spy();
    this.group = (msg, fn) => fn();
  }

  getInputString(key, options) {
    const value = this.githubInputs[key];

    if (value === undefined) {
      if (options && options.required) {
        throw new Error(`Input required and not supplied: ${key}`);
      }
      return '';
    }

    return String(value);
  }

  getInputBoolean(key) {
    const value = this.githubInputs[key];
    return value === 'true';
  }

  setOutputString(key, value) {
    this.githubOutputs[key] = String(value);
  }

  setEnvironmentVariable(key, value) {
    this.env[key] = String(value);
  }
}
