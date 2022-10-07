const puppeteer = require("puppeteer")

const getPage = async (url, selector) => {
  const browser = await puppeteer.launch({
    // args: chromium.args,
    // executablePath: await chromium.executablePath,
    headless: true,
  })

  const page = await browser.newPage()
  await page.emulateTimezone("America/New_York")
  // page.setDefaultNavigationTimeout(4000);
  // page.setDefaultTimeout(3000);
  await page.goto(url)
  await page.waitForSelector(selector)
  const content = await page.content()
  await browser.close()

  return content
}

exports.fetchDynamicPage = async (url, waitForSelector) => {
  const content = getPage(url, waitForSelector)
  return content
}
