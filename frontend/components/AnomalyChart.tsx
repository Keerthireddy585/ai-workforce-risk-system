"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts"

const data = [

  { week: "W1", anomalies: 2 },

  { week: "W2", anomalies: 5 },

  { week: "W3", anomalies: 1 },

  { week: "W4", anomalies: 7 }

]

export default function AnomalyChart() {

  return (

    <LineChart
      width={500}
      height={300}
      data={data}
    >

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="week" />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="anomalies"
        stroke="#b91c1c"
        strokeWidth={3}
      />

    </LineChart>

  )
}