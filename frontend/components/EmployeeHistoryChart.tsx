"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function EmployeeHistoryChart() {

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

    axios
      .get(
        // "http://127.0.0.1:8000/employee-history/12"
        "https://ai-workforce-risk-system.onrender.com/employee-history/13"
      )
      .then((response) => {

        console.log("History Response:")
        console.log(response.data)

        setHistory(
          response.data.history
        )

      })
      .catch((error) => {

        console.log("History Error:")
        console.log(error)

      })

  }, [])

  return (

    <div>

      <h2 className="text-2xl font-bold mb-4">
        Employee Risk History
      </h2>

      <p>
        Records Found: {history.length}
      </p>

      {history.map((record, index) => (

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

      ))}

    </div>

  )

}