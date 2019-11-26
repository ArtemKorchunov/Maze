const { mazeMock } = require("./mocks");

module.exports = {
  "Home Page header is present": function(browser) {
    const mainPage = browser.page.mainPage();

    mainPage
      .navigate()
      .waitForElementVisible("@title", 10000)
      .assert.containsText("@title", "Shortest maze navigator")
      .end();
  },

  "Check if maze is drawn after inserting it in textfield": function(browser) {
    const mainPage = browser.page.mainPage();

    mainPage
      .navigate()
      .click("@cofigureMazeButton")
      .setValue("@textarea", mazeMock)
      .waitForElementVisible("@canvasContent", 10000);
  },

  "Check if maze instruction is correct": function(browser) {
    const mainPage = browser.page.mainPage();

    mainPage
      .click("@goMultipleStepsForwardBtn")
      .click("@turnLeftBtn")
      .click("@goOneStepForwardBtn")
      .waitForElementVisible("@winModalWindow", 10000)
      .end();
  }
};
