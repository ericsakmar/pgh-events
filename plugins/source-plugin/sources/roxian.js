const cheerio = require("cheerio");
const fetchPage = require("./fetchPage");

const url =
  "https://www.livenation.com/venue/KovZ917Ax13/roxian-theatre-events";

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url);

  const $ = cheerio.load(data);

  const events = $(`head script[type="application/ld+json"]`)
    .toArray()
    .map(el => {
      const ldJson = el.children[0].data;
      const json = JSON.parse(ldJson);
      return json;
    })
    .filter(event => event["@type"] === "MusicEvent")
    .map(event => ({
      title: event.name,
      date: event.startDate,
      location: event.location.name,
      link: event.url,
      source: url,
      hasTime: true
    }));

  return events;
};
