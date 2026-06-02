"use client"
import axios from "axios"
import {useEffect, useState} from "react"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts"

// const data = [

//   { month: "Jan", productivity: 80 },

//   { month: "Feb", productivity: 75 },

//   { month: "Mar", productivity: 85 },

//   { month: "Apr", productivity: 70 },

//   { month: "May", productivity: 90 }

// ]

export default function ProductivityChart() {

  const [data, setData] = useState([
    {
      month: "Current",
      productivity: 0
    }
  ])

  useEffect(() => {

    axios
      .get(
        "https://ai-workforce-risk-system.onrender.com/productivity-score"
      )
      .then((response) => {

        setData([
          {
            month: "Current",
            productivity:
              response.data.productivity_score
          }
        ])

      })

  }, [])

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
