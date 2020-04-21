// Generated by Selenium IDE
const { Builder, By } = require('selenium-webdriver');

async function getStats() {
  let driver = await new Builder().forBrowser('chrome').build();
  await driver.get("https://www.coronavirus.in.gov/map-test/test.htm");
  const totalPositiveCases = await driver.findElement(By.css(".m-stats-cards-card-wrapper:nth-child(4) .h1")).getText()
  const totalDeaths = await driver.findElement(By.css(".m-stats-cards-card-wrapper:nth-child(5) .h1")).getText()
  driver.close();
  return {
    'IN': {
      totalPositiveCases,
      totalDeaths
    }
  };
}

module.exports.getStats = getStats; 