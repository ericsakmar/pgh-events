import { format, getMonth, parse } from "date-fns"
import * as React from "react"
import MonthChart from "./monthChart"
import * as styles from "./eventCountsByMonth.module.css"

const parseDate = d => parse(d, "yyyy-MM-dd", new Date())
const formatMonth = d => format(d, "MMMM yyyy")

const EventCountsByMonth = ({ counts }) => {
  const groupedByMonth = counts.reduce((acc, { date, count }) => {
    const month = getMonth(parseDate(date))
    return {
      ...acc,
      [month]: [...(acc[month] || []), { date, count }],
    }
  }, {})

  const months = Object.keys(groupedByMonth)
  const maxCount = Math.max(...counts.map(c => c.count))

  return (
    <div className={styles.container}>
      {months.map(month => (
        <div key={month}>
          <h3 className={styles.header}>
            {formatMonth(parseDate(groupedByMonth[month][0].date))}
          </h3>
          <MonthChart
            key={month}
            counts={groupedByMonth[month]}
            maxCount={maxCount}
          />
        </div>
      ))}
    </div>
  )
}

export default EventCountsByMonth
