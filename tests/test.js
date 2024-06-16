const assert = require("assert");
const http = require("http");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe("Website", function () {
  it("should return 200", function (done) {
    http
      .get("http://localhost:8081", function (response) {
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
      .get("http://localhost:8081", function (response) {
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
      "Тестирование: С чего начать"
    );
  });

  it("should have a header with correct text", function () {
    assert.strictEqual(
      document.querySelector("header h1").textContent,
      "Тестирование: С чего начать"
    );
  });

  it("should have three sections", function () {
    assert.strictEqual(document.querySelectorAll("main section").length, 3);
  });

  it("should have a footer with copyright text", function () {
    assert.strictEqual(
      document.querySelector("footer p").textContent,
      "© 2024 Тестировщик с большим сердцем"
    );
  });

  it("should have an unordered list in the third section", function () {
    const list = document.querySelector("main section:nth-of-type(3) ul");
    assert.ok(list);
  });

  it("should have three list items in the unordered list", function () {
    const listItems = document.querySelectorAll(
      "main section:nth-of-type(3) ul li"
    );
    assert.strictEqual(listItems.length, 3);
  });
});
