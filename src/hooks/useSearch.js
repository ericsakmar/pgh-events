const isSet = term => term && term.length > 0

const byDate = (allEvents, date) => ({ [date]: allEvents[date] })

const byKeyword = (allEvents, keyword) => {
  const normalizedKeyword = keyword.toUpperCase()

  const filtered = Object.entries(allEvents)
    .map(([date, events]) => ({
      [date]: events.filter(e =>
        e.title.toUpperCase().includes(normalizedKeyword)
      )
    }))
    .filter(x => Object.values(x)[0].length > 0)
    .reduce((x, acc) => ({ ...x, ...acc }), {})

  return filtered
}

// TODO make this better?
const byVenue = (allEvents, venue) => {
  const filtered = Object.entries(allEvents)
    .map(([date, events]) => ({
      [date]: events.filter(e => e.location === venue)
    }))
    .filter(x => Object.values(x)[0].length > 0)
    .reduce((x, acc) => ({ ...x, ...acc }), {})

  return filtered
}

const filter = (date, keyword, venue, allEvents) => {
  let filtered = allEvents

  if (isSet(date)) {
    filtered = byDate(allEvents, date)
  }

  if (isSet(venue)) {
    filtered = byVenue(filtered, venue)
  }

  if (isSet(keyword)) {
    filtered = byKeyword(filtered, keyword)
  }

  return filtered
}

const useSearch = (rawSearch, defaultEvents, allEvents) => {
  const search = new URLSearchParams(rawSearch)

  const date = search.get("d") || ""
  const keyword = search.get("q") || ""
  const venue = search.get("v") || ""

  const isSearching = isSet(date) || isSet(keyword) || isSet(venue)

  const events = isSearching
    ? filter(date, keyword, venue, allEvents)
    : defaultEvents

  return {
    events,
    isSearching,
    params: {
      date,
      keyword,
      venue
    }
  }
}

export default useSearch
