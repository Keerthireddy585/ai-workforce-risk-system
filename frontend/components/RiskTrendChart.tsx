"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts"

const data = [

  { month: "Jan", risk: 30 },

  { month: "Feb", risk: 35 },

  { month: "Mar", risk: 50 },

  { month: "Apr", risk: 40 },

  { month: "May", risk: 60 }

]

export default function RiskTrendChart() {

  return (

    <AreaChart
      width={500}
      height={300}
      data={data}
    >

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="month" />

      <YAxis />

      <Tooltip />

      <Area
        type="monotone"
        dataKey="risk"
        stroke="#ca8a04"
        fill="#fde047"
      />

    </AreaChart>

  )
}