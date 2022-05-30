import sinon from 'sinon';

class FakeGitHubClient {
  constructor(token) {
    this.token = token;

    this.pulls = {
      create: sinon.stub(),
      createReview: sinon.stub(),
      updateReview: sinon.stub(),
      dismissReview: sinon.stub(),
      listReviews: sinon.stub().returns({ data: [] }),
      listFiles: sinon.stub().returns({ data: [] }),
      requestReviewers: sinon.stub(),
      listRequestedReviewers: sinon.stub().returns({ data: { users: [], teams: [] } }),
    };

    this.checks = {
      create: sinon.stub().returns({ data: { id: 'testId' } }),
      update: sinon.stub().returns({ data: { id: 'testId' } }),
    };

    this.git = {
      getRef: sinon.stub(),
      createRef: sinon.stub(),
      getCommit: sinon.stub(),
      createBlob: sinon.stub(),
      createTree: sinon.stub(),
      createCommit: sinon.stub(),
      updateRef: sinon.stub(),
    };

    this.repos = {
      createRelease: sinon.stub().returns({ data: { id: 'testReleaseId' } }),
      updateRelease: sinon.stub(),
      uploadReleaseAsset: sinon.stub(),
      getBranch: sinon.stub(),
      listBranches: sinon.stub(),
      getContent: sinon.stub(),
      get: sinon.stub(),
    };

    this.teams = {
      listMembersInOrg: sinon.stub().returns({ data: [] }),
    };

    this.actions = {
      listWorkflowRunArtifacts: sinon.stub().returns({ data: { total_count: 0, artifacts: [] } }),
      getWorkflowRun: sinon.stub(),
      listWorkflowRuns: sinon.stub().returns({ data: [] }),
      cancelWorkflowRun: sinon.stub(),
      createWorkflowDispatch: sinon.stub(),
    };

    this.issues = {
      addLabels: sinon.stub(),
      removeLabel: sinon.stub(),
    };

    this.rest = this;
  }
}

export default class GitHubStub {
  constructor(context) {
    this.context = context;
    this.client = new FakeGitHubClient();
  }

  get ref() {
    return this.context.ref;
  }

  getOctokit() {
    return {
      rest: this.client,

      paginate: (fn, args) => {
        const response = fn(args);
        const data = response.data ? response.data : response;
        return Array.isArray(data) ? data : Array(data);
      },
    };
  }
}
