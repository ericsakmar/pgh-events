import * as React from "react"
import { parseISO } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"

const format = (date, dateFormat) =>
  formatInTimeZone(date, "America/New_York", dateFormat)

const formatDateTime = date => format(date, "MMMM d 'at' h:mm aa")

const formatDate = date => format(date, "MMMM d, yyyy")

// from https://systemuicons.com/
// and https://kittygiraudel.com/2020/12/10/accessible-icon-links/
const ShareIcon = () => (
  <svg
    height="21"
    viewBox="0 0 21 21"
    width="21"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(3 2)"
    >
      <path d="m15.5.465-8 8.033" />
      <path d="m10.5 16.5-3-8.002-7-2.998 15-5z" />
    </g>
  </svg>
)

const CopyIcon = () => (
  <svg
    height="21"
    viewBox="0 0 21 21"
    width="21"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(3 3)"
    >
      <path d="m14.5 9.5v-7c0-1.1045695-.8954305-2-2-2h-7c-1.1045695 0-2 .8954305-2 2v7c0 1.1045695.8954305 2 2 2h7c1.1045695 0 2-.8954305 2-2z" />
      <path d="m11.5 11.5v1c0 1.1045695-.8954305 2-2 2h-7c-1.1045695 0-2-.8954305-2-2v-7c0-1.1045695.8954305-2 2-2h1" />
    </g>
  </svg>
)

const WebShare = ({ event }) => {
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

  const hasWebShare = navigator && navigator.share

  if (!hasWebShare) {
    return (
      <button onClick={handleCopy} className="buttonLink">
        <CopyIcon />
        <span className="visuallyHidden">Copy event details</span>
      </button>
    )
  }

  return (
    <button onClick={handleClick} className="buttonLink">
      <ShareIcon />
      <span className="visuallyHidden">Share</span>
    </button>
  )
}

export default WebShare
