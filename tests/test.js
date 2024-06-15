const assert = require("assert");
const http = require("https");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe("Website", function () {
  let dom;
  let server;

  before(function (done) {
    JSDOM.fromURL("https://artichokeee.github.io/jenkins-site/")
      .then((domInstance) => {
        dom = domInstance;
        done();
      })
      .catch(done);
  });

  after(function (done) {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  it("should return 200", function (done) {
    http
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

    it("should have a footer with copyright text", function () {
      const footer = dom.window.document.querySelector("footer p").textContent;
      assert.strictEqual(footer, "© 2024 Тестировщик с большим сердцем");
    });

    it("should have an unordered list in the third section", function () {
      const list = dom.window.document
        .querySelectorAll("section")[2]
        .querySelector("ul");
      assert.ok(list);
    });

    it("should have three list items in the unordered list", function () {
      const listItems = dom.window.document
        .querySelectorAll("section")[2]
        .querySelectorAll("ul li");
      assert.strictEqual(listItems.length, 3);
    });
  });
});
