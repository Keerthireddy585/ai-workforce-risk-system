"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export default function EmployeeHistoryChart( 
  {
    employeeId,
    employeeName
  }: {
    employeeId:number
    employeeName:string
  }
) {

  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {

    // axios
    //   .get(
    //     "http://127.0.0.1:8000/employee-history/12"
    //   )
    //   .then((response) => {

    //     setHistory(
    //       response.data.history
    //     )

    //   })
    console.log("TEST EMPLOYEE CHART")
    console.log("selected Employee ID:", employeeId)
    axios
      .get(
        // "http://127.0.0.1:8000/employee-history/12"
        // "https://ai-workforce-risk-system.onrender.com/employee-history/13"
        `${process.env.NEXT_PUBLIC_API_URL}/employee-history/${employeeId}`
      )
      .then((response) => {
        
        console.log("History Response:", response.data)

        // console.log("History Response:")
        // console.log(response.data)

        console.log(response.data.history)
        
        const historywithRecord = 
          response.data.history.map(
            (item: any, index:number) => ({
                ...item,
                record: `Record ${index + 1}`
            })
          )
        setHistory(
          historywithRecord
        )

      })
      .catch((error) => {

        console.log("History Error:")
        console.log(error)

      })

  }, [employeeId])

  console.log("History Data:", history)

  return (

    <div>

      <h2 className="text-2xl font-bold mb-4">
        Employee Risk History
      </h2>

      <p className="mb-2 text-gray-600">
        Employee: {employeeName}
      </p>

      <p className="mb-4">
        Records Found: {history.length}
      </p>

      {/* <pre>
        {JSON.stringify(history, null, 2)}
      </pre> */}
      
      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart 
          width={500}
          height={300}
          data={history}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="record" />

          <YAxis domain={[-100, 100]} />

          <Tooltip 
            formatter={(value, name) => [value, name]}
          />

          <Line
              type="linear"
              dataKey="risk_score"
              stroke="#2563eb"
              strokeWidth={4}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
          />

          <Line
            dataKey="productivity_score"
            stroke="#22c55e"
            strokeWidth={3}
          />

       </LineChart>

     </ResponsiveContainer>

      {/* {history.map((record, index) => (

        <div
          key={index}
          className="border-b py-2"
        >

          <p>
            Risk Score:
            {record.risk_score}
          </p>

          <p>
            Productivity:
            {record.productivity_score}
          </p>

          <p>
            Burnout:
            {record.burnout_risk}
          </p>

        </div>

      ))} */}

    </div>

  )

}