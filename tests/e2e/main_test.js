const selenium = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const homeUrl = "http://localhost:" + (process.env.PORT || 3000) + "/#testing";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("end to end test", function () {
  let driver;

  beforeAll(function (done) {
    const app = require("../../app/app.js");

    let chromeOptions = new chrome.Options();
    chromeOptions.addArguments("use-fake-ui-for-media-stream");

    driver = new selenium.Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();

    setTimeout(done, 3000);
  });
  afterAll(function () {
    driver.quit();
  });

  it("should take a video and post it", function (done) {
    driver.get(homeUrl);
    setTimeout(() => {
      driver.findElement(selenium.By.css("button#snap")).click()
        .then(setTimeout(() => {
          driver.findElements(selenium.By.css("#images > li > img"))
            .then((els) => {
              expect(els.length).toBe(1);
              done();
            });
        }, 5000));
    }, 1200);
  });

  it("should take a second video and post it", function (done) {
    driver.findElement(selenium.By.css("button#snap")).click()
      .then(setTimeout(() => {
        driver.findElements(selenium.By.css("#images > li > img"))
          .then((els) => {
            expect(els.length).toBe(2);
            done();
          });
      }, 5000));
  });

  it("should reload and still have two videos", function (done) {
    driver.get(homeUrl);
    setTimeout(() => {
      driver.findElements(selenium.By.css("#images > li > img"))
        .then((els) => {
          expect(els.length).toBe(2);
          done();
        });
    }, 1200);
  });

  it("should clear vidoes", function (done) {
    driver.findElement(selenium.By.css("button#clear-button")).click()
      .then(setTimeout(() => {
        driver.findElements(selenium.By.css("#images > li > img"))
          .then((els) => {
            expect(els.length).toBe(0);
            done();
          });
      }, 600));
  });

  it("should reload and still have no vidoes", function (done) {
    driver.get(homeUrl);
    setTimeout(() => {
      driver.findElements(selenium.By.css("#images > li > img"))
        .then((els) => {
          expect(els.length).toBe(0);
          done();
        });
    }, 1200);
  });
});
