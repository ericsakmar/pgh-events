const cheerio = require("cheerio");
const fetchDynamicPage = require("./fetchDynamicPage");

const url = "https://blackforgecoffee.com/pages/events";
const waitForSelector = ".eaec-grid-item-info";

exports.getEvents = async () => {
  const data = await fetchDynamicPage.fetchDynamicPage(url, waitForSelector);

  const $ = cheerio.load(data);

  const events = $(".eaec-grid-item script")
    .toArray()
    .map(el => {
      const ldJson = el.children[0].data;
      const json = JSON.parse(ldJson);
      return json;
    })
    .filter(event => event.location.name !== undefined)
    .map(event => ({
      title: event.name,
      date: event.startDate,
      location: event.location.name,
      link: "https://blackforgecoffee.com/pages/events",
      source: url,
      hasTime: true
    }));

  return events;
};
