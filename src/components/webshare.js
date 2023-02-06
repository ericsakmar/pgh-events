import * as React from "react"
import { parseISO } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"

const format = (date, dateFormat) =>
  formatInTimeZone(date, "America/New_York", dateFormat)

const formatDateTime = date => format(date, "MMMM d 'at' h:mm aa")

const formatDate = date => format(date, "MMMM d, yyyy")

// from https://feathericons.com/
// and https://kittygiraudel.com/2020/12/10/accessible-icon-links/
const ShareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    class="feather feather-share-2"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
)

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    class="feather feather-copy"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
)

const WebShare = ({ event }) => {
  const [hasWebShare, setHasWebShare] = React.useState(false)

  // doing this here so that it updates on first real render
  React.useEffect(() => {
    setHasWebShare(navigator && navigator.share)
  }, [])

  const date = parseISO(event.date)

  const shareText = `Check out this show I found on https://pgh.events - \n${
    event.title
  } at ${event.location} on ${
    event.hasTime ? formatDateTime(date) : formatDate(date)
  }`

  const handleClick = async () => {
    const shareData = { text: shareText }

    try {
      await navigator.share(shareData)
    } catch {
      // no prob
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText)
  }

  if (!hasWebShare) {
    return (
      <button onClick={handleCopy} className="buttonLink buttonLink-tight">
        <div className="buttonIcon">
          <CopyIcon />
        </div>
        <p>Copy event details</p>
      </button>
    )
  }

  return (
    <button onClick={handleClick} className="buttonLink buttonLink-tight">
      <div className="buttonIcon">
        <ShareIcon />
      </div>
      <p>Share</p>
    </button>
  )
}

export default WebShare
