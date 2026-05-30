"use client"

import {
  PieChart,
  Pie,
  Tooltip
} from "recharts"

const data = [

  { name: "On Time", value: 70 },

  { name: "Delayed", value: 30 }

]

export default function ProjectDelayChart() {

  return (

    <PieChart width={400} height={300}>

      <Pie
        data={data}
        dataKey="value"
        outerRadius={100}
        fill="#2563eb"
      />

      <Tooltip />

    </PieChart>

  )
}