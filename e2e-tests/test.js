module.exports = {
  "Home Page header is present": function(browser) {
    browser
      .url("http://localhost:3000")
      .waitForElementVisible("h1", 10000)
      .assert.containsText("h1", "Shortest maze navigator")
      .end();
  }
};
