import proxyquire from "proxyquire";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);
const expect = chai.expect;

describe("oscn", () => {
  let testee;

  it("exists", cb => {
    testee = proxyquire("../src/index", {
      "courtbot-engine": {
        events: {
          on: sinon.stub()
        }
      }
    });

    expect(testee).to.exist;
    cb();
  })
})
