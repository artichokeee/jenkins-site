const assert = require("assert");
const http = require("https");
const { JSDOM } = require("jsdom");

describe("Website", function () {
  it("should return 200", function (done) {
    http.get(
      "https://artichokeee.github.io/jenkins-site/",
      function (response) {
        assert.strictEqual(response.statusCode, 200);
        done();
      }
    );
  });
});

describe("HTML Content", function () {
  let document;

  before(function (done) {
    http.get(
      "https://artichokeee.github.io/jenkins-site/",
      function (response) {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          const dom = new JSDOM(data);
          document = dom.window.document;
          done();
        });
      }
    );
  });

  it("should have the correct title", function () {
    const title = document.querySelector("title").textContent;
    assert.strictEqual(title, "Тестирование: С чего начать");
  });

  it("should have a header with correct text", function () {
    const header = document.querySelector("header h1").textContent;
    assert.strictEqual(header, "Тестирование: С чего начать");
  });

  it("should have three sections", function () {
    const sections = document.querySelectorAll("main section");
    assert.strictEqual(sections.length, 3);
  });

  it("should have a footer with copyright text", function () {
    const footer = document.querySelector("footer p").textContent;
    assert.strictEqual(footer, "© 2024 Тестировщик с большим сердцем");
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
