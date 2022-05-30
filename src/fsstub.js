import sinon from 'sinon';

export default class FsStub {
  constructor(data) {
    this.data = data || {};
    this.readdir = sinon.stub();
    this.writeFile = sinon.stub().callsFake(this.writeFileFake);
    this.readFile = sinon.stub().callsFake(this.readFileFake);
    this.rename = sinon.stub().callsFake(this.renameFake);
    this.rmdir = sinon.stub().callsFake(this.rmdirFake);
    this.lstat = sinon.stub();
  }

  writeFileFake(filename, data) {
    this.data[filename] = data;
  }

  readFileFake(filename) {
    return this.data[filename];
  }

  renameFake(oldName, newName) {
    const data = this.data[oldName];
    this.data[newName] = data;
    delete this.data[oldName];
  }

  rmdirFake(destination) {
    Object.keys(this.data).forEach((key) => {
      if (key.match(`^${destination}`)) {
        delete this.data[key];
      }
    });
  }
}
