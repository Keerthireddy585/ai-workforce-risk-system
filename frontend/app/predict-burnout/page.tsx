"use client"

import { useState } from "react"
import axios from "axios"

export default function EmployeePage() {

  const [name, setName] = useState("")

  const [hours, setHours] = useState("")

  const [tasks, setTasks] = useState("")

  const [delays, setDelays] = useState("")

  const [result, setResult] = useState("")

  const predict = async () => {

    const response = await axios.post(

      `${process.env.NEXT_PUBLIC_API_URL}/analytics/predict-burnout`,

      {

        name,

        hours_worked: Number(hours),

        tasks_completed: Number(tasks),

        delay_days: Number(delays)

      }

    )

    setResult(response.data.burnout_risk)

  }

  return (

    <main className="p-10 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold mb-2">
          AI Burnout Risk Predictor 
        </h1>
        
        <p className="text-gray-500 mb-6">
          Predict employee burnout risk using workload metrics
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Employee Name"
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full"
          />

          <input
            type="number"
            placeholder="Hours Worked"
            onChange={(e) => setHours(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full"

          />

          <input
            placeholder="Tasks Completed"
            onChange={(e) => setTasks(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full"

          />

          <input
            placeholder="Delay Days"
            onChange={(e) => setDelays(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full"

          />
        </div>  

      <button 
        onClick={predict}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      > 
        Predict Burnout
      </button>

      {result && (
        <div className="mt-6 p-4 rounded-xl bg-red50 border border-red-200">
          <h3 className="text-lg font-semibold text-red-700">
            Burnout Risk
          </h3>

          <p className="text-3xl font-bold text-red-600">
            {result}
          </p>
        </div>
      )}
      </div>
    </main>
  )
}