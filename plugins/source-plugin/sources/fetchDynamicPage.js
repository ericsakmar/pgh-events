const puppeteer = require("puppeteer")

const TIMEOUT = 10_000

const getPage = async (url, selector) => {
  const browser = await puppeteer.launch({
    headless: true,
  })

  const page = await browser.newPage()
  await page.emulateTimezone("America/New_York")

  const res = await page.goto(url)
  console.log(`fetching ${url} - status: ${res.status()}`)

  await page.waitForSelector(selector, { timeout: TIMEOUT })
  const content = await page.content()

  // should this be in a finally() or something?
  await browser.close()

  return content
}

exports.fetchDynamicPage = async (url, waitForSelector) => {
  const content = getPage(url, waitForSelector)
  return content
}
