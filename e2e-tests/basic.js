const { mazeMock, incorrectMazeMock } = require("./mocks");

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
  },

  "Check if textarea for drawing maze handles negative case": function(
    browser
  ) {
    const mainPage = browser.page.mainPage();

    mainPage
      .navigate()
      .click("@cofigureMazeButton")
      .setValue("@textarea", incorrectMazeMock)
      .assert.visible("@textareaModal")
      .waitForElementVisible("@errorMessage", 10000)
      .end();
  }
};
