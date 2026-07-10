const Parser = require("rss-parser")
const parser = new Parser()

// pa rock show
// https://anchor.fm/s/fc5e5770/podcast/rss

// pa rock show flashback
// https://www.buildthescene.com/category/pars-flashback/feed

// 3 questions and a song
// https://www.buildthescene.com/category/3questions/feed

exports.getLinks = async () => {
  const paRockShow = await parser.parseURL(
    "https://anchor.fm/s/fc5e5770/podcast/rss",
  )

  const paRockShowLinks = paRockShow.items.map(i => ({
    title: i.title,
    subtitle: "The Pennsylvania Rock Show",
    url: i.link,
    timestamp: new Date(i.isoDate),
    tags: ["podcast"],
    image:
      "https://www.buildthescene.com/wp-content/uploads/2004/09/Bill-PA-Rock-Show-transparent-background.png",
  }))

  const paRockShowFlashback = await parser.parseURL(
    "https://www.buildthescene.com/category/pars-flashback/feed",
  )

  const paRockShowFlashbackLinks = paRockShowFlashback.items.map(i => ({
    title: i.title,
    subtitle: "The Pennsylvania Rock Show Flashback",
    url: i.link,
    timestamp: new Date(i.isoDate),
    tags: ["podcast"],
    image:
      "https://www.buildthescene.com/wp-content/uploads/2026/02/the-Pennsylvania-Rock-Show-Flashback-Podcast-Artwork.png.jpg",
  }))

  const threeQuestionsAndASong = await parser.parseURL(
    "https://www.buildthescene.com/category/3questions/feed",
  )

  const threeQuestionsAndASongLinks = threeQuestionsAndASong.items.map(i => ({
    title: i.title,
    subtitle: "3 Questions and a Song",
    url: i.link,
    timestamp: new Date(i.isoDate),
    tags: ["podcast"],
    image:
      "https://www.buildthescene.com/wp-content/uploads/2024/10/3-questions-and-a-song-cover-2024-2-scaled.jpg",
  }))

  return [
    ...paRockShowLinks,
    ...threeQuestionsAndASongLinks,
    ...paRockShowFlashbackLinks,
  ]
}

exports.name = "build the scene"
