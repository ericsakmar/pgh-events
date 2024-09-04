import { scaleLinear } from "@visx/scale"
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
} from "date-fns"
import { navigate } from "gatsby"
import * as React from "react"

const OUT_OF_BOUNDS = -1

const parseDate = d => parse(d, "yyyy-MM-dd", new Date())
const formatDate = d => format(d, "yyyy-MM-dd")
const daySize = 20
const dayPadding = 4
const width = daySize * 7 + dayPadding * 6

// assumes all dates are in the same month
const MonthChart = ({ counts, maxCount }) => {
  const firstDate = parseDate(counts[0].date)
  const monthStart = startOfMonth(firstDate)
  const monthEnd = endOfMonth(firstDate)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const scale = scaleLinear({
    domain: [0, maxCount],
    range: ["#222831", "#ffffff"],
  })

  const dates = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  }).map(date => ({
    date,
    count: isSameMonth(date, firstDate)
      ? counts.find(c => c.date === formatDate(date))?.count ?? OUT_OF_BOUNDS
      : undefined,
  }))

  const rows = dates.length / 7
  const height = rows * daySize + (rows - 1) * dayPadding

  return (
    <svg width={width} height={height}>
      {dates.map(({ date, count }, i) => {
        if (count === undefined) {
          return null
        }

        const day = getDay(date)
        const week = Math.floor(i / 7)

        if (count === OUT_OF_BOUNDS) {
          return (
            <rect
              key={date.toString()}
              width={daySize - 2}
              height={daySize - 1}
              x={(daySize + dayPadding) * day + 1}
              y={(daySize + dayPadding) * week + 1}
              stroke="#5b6370"
              strokeWidth={1}
              strokeDasharray={4}
              fill="transparent"
              rx={3}
              ry={3}
            >
              <title>out of range</title>
            </rect>
          )
        }

        return (
          <rect
            key={date.toString()}
            width={daySize}
            height={daySize}
            x={(daySize + dayPadding) * day}
            y={(daySize + dayPadding) * week}
            rx={3}
            ry={3}
            fill={scale(count)}
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/${formatDate(date)}`)
            }}
          >
            <title>{`${formatDate(date)}: ${count} events`}</title>
          </rect>
        )
      })}
    </svg>
  )
}

export default MonthChart
