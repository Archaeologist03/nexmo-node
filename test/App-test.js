import sinon from "sinon";

import nexmo from "../lib/index";
import App from "../lib/App";

import NexmoStub from "./NexmoStub";

const appAPIMapping = {
  getApplications: "get|{}",
  createApplication: "create",
  getApplication: "get|someAppId",
  updateApplication: "update",
  deleteApplication: "delete"
};

describe("App Object", () => {
  it("should implement all v1 APIs", () => NexmoStub.checkAllFunctionsAreDefined(appAPIMapping, App));
    
  it("should proxy the function call to the underlying `nexmo` object", () => NexmoStub.checkAllFunctionsAreCalled(appAPIMapping, App));

  it("should call nexmo.getApplications if 1st param is object", () => {
    const mock = sinon.mock(nexmo);
    mock.expects("getApplications").once();

    const app = new App(
      {
        apiKey: "test",
        apiSecret: "test"
      },
      {
        nexmoOverride: nexmo
      }
    );
    app.get({});
  });

  it("should call nexmo.getApplication if 1st param is an app ID", () => {
    const mock = sinon.mock(nexmo);
    mock.expects("getApplication").once();

    const app = new App(
      {
        apiKey: "test",
        apiSecret: "test"
      },
      {
        nexmoOverride: nexmo
      }
    );
    app.get("some-app-id");
  }); 
});
