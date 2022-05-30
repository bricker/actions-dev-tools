import sinon from 'sinon';

class SuperagentStub {
  constructor() {
    this.get = sinon.stub().callsFake((url) => {
      this.lastHttp = 'get';
      this.lastUrl = url;
      return this;
    });
    this.head = sinon.stub().callsFake((url) => {
      this.lastHttp = 'head';
      this.lastUrl = url;
      return this;
    });
    this.options = sinon.stub().callsFake((url) => {
      this.lastHttp = 'options';
      this.lastUrl = url;
      return this;
    });
    this.post = sinon.stub().callsFake((url) => {
      this.lastHttp = 'post';
      this.lastUrl = url;
      return this;
    });
    this.put = sinon.stub().callsFake((url) => {
      this.lastHttp = 'put';
      this.lastUrl = url;
      return this;
    });
    this.patch = sinon.stub().callsFake((url) => {
      this.lastHttp = 'patch';
      this.lastUrl = url;
      return this;
    });
    this.delete = sinon.stub().callsFake((url) => {
      this.lastHttp = 'delete';
      this.lastUrl = url;
      return this;
    });

    this.set = sinon.stub().returns(this);
    this.send = sinon.stub().returns(this);
    this.query = sinon.stub().returns(this);
    this.type = sinon.stub().returns(this);
    this.attach = sinon.stub().returns(this);
    this.field = sinon.stub().returns(this);

    // dict where fake responses are stored.
    // To set a response; `superagentStub.responses[HTTP_METHOD][REQ_URL] = new Response(...)`
    this.responses = {
      delete: {},
      get: {},
      head: {},
      options: {},
      post: {},
      put: {},
      patch: {},
    };
  }

  then(res, rej) {
    let resp = this.responses[this.lastHttp][this.lastUrl];
    if (!resp) {
      rej(`No mock response for ${this.lastHttp}: ${this.lastUrl}`);
      return;
    }

    if (Array.isArray(resp)) {
      resp = resp.shift();
    }

    if (resp.status >= 400) {
      // https://github.com/visionmedia/superagent/blob/3c9c0f7feef61328131ae43b06e628bce1c20c17/src/client.js#L400
      const error = new Error(`Mock network error: ${resp.status}`);
      error.status = resp.status;
      error.response = resp.body;
      error.method = this.lastHttp;
      error.url = this.lastUrl;
      rej(error);
      return;
    }

    res(resp);
  }
}

class Response {
  constructor(status, body = {}, headers = {}) {
    this.status = status;
    this.statusCode = status; // clone for APIs that use this instead
    this.body = body;
    this.headers = headers;
  }
}

SuperagentStub.Response = Response;
export default SuperagentStub;
