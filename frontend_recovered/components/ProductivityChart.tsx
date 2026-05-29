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

  { month: "Jan", productivity: 80 },

  { month: "Feb", productivity: 75 },

  { month: "Mar", productivity: 85 },

  { month: "Apr", productivity: 70 },

  { month: "May", productivity: 90 }

]

export default function ProductivityChart() {

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
        dataKey="productivity"
        stroke="#2563eb"
        strokeWidth={3}
      />

    </LineChart>

  )
}