"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts"

const data = [

  { month: "Jan", burnout: 20 },

  { month: "Feb", burnout: 25 },

  { month: "Mar", burnout: 35 },

  { month: "Apr", burnout: 45 },

  { month: "May", burnout: 40 }

]

export default function BurnoutChart() {

  return (

    <LineChart
      width={500}
      height={300}
      data={data}
    >

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="month" />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="burnout"
        stroke="#dc2626"
        strokeWidth={3}
      />

    </LineChart>

  )
}