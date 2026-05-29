"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts"

const data = [

  { team: "Engineering", workload: 85 },

  { team: "HR", workload: 40 },

  { team: "Marketing", workload: 60 },

  { team: "Operations", workload: 95 }

]

export default function WorkloadChart() {

  return (

    <BarChart
      width={500}
      height={300}
      data={data}
    >

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="team" />

      <YAxis />

      <Tooltip />

      <Bar
        dataKey="workload"
        fill="#ea580c"
      />

    </BarChart>

  )
}