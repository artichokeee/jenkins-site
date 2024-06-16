const assert = require("assert");
const http = require("http");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe("Website", function () {
  it("should return 200", function (done) {
    http
      .get("http://localhost:8082", function (response) {
        assert.equal(response.statusCode, 200);
        done();
      })
      .on("error", function (err) {
        done(err);
      });
  });
});

describe("HTML Content", function () {
  let document;

  before(function (done) {
    http
      .get("http://localhost:8082", function (response) {
        let data = "";
        response.on("data", (chunk) => (data += chunk));
        response.on("end", () => {
          const dom = new JSDOM(data);
          document = dom.window.document;
          done();
        });
      })
      .on("error", function (err) {
        done(err);
      });
  });

  it("should have the correct title", function () {
    assert.strictEqual(
      document.querySelector("title").textContent,
      "Как начать тестирование"
    );
  });

  it("should have a header with correct text", function () {
    assert.strictEqual(
      document.querySelector("h1").textContent,
      "Как начать тестирование"
    );
  });
});
