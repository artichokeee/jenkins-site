const assert = require("assert");
const https = require("https");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe("Website", function () {
  let dom;

  before(function (done) {
    JSDOM.fromURL("https://artichokeee.github.io/jenkins-site/")
      .then((domInstance) => {
        dom = domInstance;
        done();
      })
      .catch(done);
  });

  it("should return 200", function (done) {
    https
      .get("https://artichokeee.github.io/jenkins-site/", (res) => {
        assert.strictEqual(res.statusCode, 200);
        done();
      })
      .on("error", done);
  });

  describe("HTML Content", function () {
    it("should have the correct title", function () {
      const title = dom.window.document.querySelector("title").textContent;
      assert.strictEqual(title, "Тестирование: С чего начать");
    });

    it("should have a header with correct text", function () {
      const header = dom.window.document.querySelector("header h1").textContent;
      assert.strictEqual(header, "Тестирование: С чего начать");
    });

    it("should have three sections", function () {
      const sections = dom.window.document.querySelectorAll("main section");
      assert.strictEqual(sections.length, 3);
    });
  });
});
