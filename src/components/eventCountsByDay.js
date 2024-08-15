import { AxisBottom, AxisLeft } from "@visx/axis"
import { Group } from "@visx/group"
import { useParentSize } from "@visx/responsive"
import { scaleLinear, scaleTime } from "@visx/scale"
import { LinePath } from "@visx/shape"
import { formatInTimeZone } from "date-fns-tz"
import * as React from "react"
import * as styles from "./eventCountsByDay.module.css"

const axisColor = "#888"

const formatDate = d => formatInTimeZone(d, "America/New_York", "LLL d")

const EventCountsByDay = ({ counts }) => {
  const { parentRef, width } = useParentSize()
  const height = 200
  const margin = { top: 10, right: 0, bottom: 25, left: 25 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // TODO probably memo stuff
  const data = counts.map(d => ({
    date: new Date(d.date),
    count: d.count,
  }))

  const allDates = data.map(d => d.date)

  // horizontal, x scale
  const timeScale = scaleTime({
    range: [0, innerWidth],
    domain: [Math.min(...allDates), Math.max(...allDates)],
  })

  // vertical, y scale
  const rdScale = scaleLinear({
    range: [innerHeight, 0],
    domain: [0, Math.max(...data.map(d => d.count))],
  })

  return (
    <div ref={parentRef} className={styles.container}>
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          <AxisLeft
            tickTextFill={axisColor}
            stroke={axisColor}
            tickStroke={axisColor}
            scale={rdScale}
            tickLabelProps={() => ({
              fill: axisColor,
              fontSize: 11,
              textAnchor: "end",
            })}
          />

          <AxisBottom
            scale={timeScale}
            stroke={axisColor}
            tickStroke={axisColor}
            tickTextFill={axisColor}
            top={innerHeight}
            tickFormat={formatDate}
            tickLabelProps={() => ({
              fill: axisColor,
              fontSize: 11,
              textAnchor: "middle",
            })}
          />

          <LinePath
            stroke="#fff"
            strokeWidth={1}
            data={data}
            x={d => timeScale(d.date)}
            y={d => rdScale(d.count)}
          />
        </Group>
      </svg>
    </div>
  )
}

export default EventCountsByDay
