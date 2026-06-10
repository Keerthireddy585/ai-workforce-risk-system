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

      `${process.env.NEXT_PUBLIC_API_URL}/predict-burnout`,

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

    <main className="p-10">

      <h1 className="text-3xl font-bold mb-6">

        Employee Burnout Prediction

      </h1>

      <input
        placeholder="Employee Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Hours Worked"
        onChange={(e) => setHours(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Tasks Completed"
        onChange={(e) => setTasks(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Delay Days"
        onChange={(e) => setDelays(e.target.value)}
      />

      <br /><br />

      <button onClick={predict}>
        Predict Burnout
      </button>

      <h2 className="mt-6 text-2xl">

        Burnout Risk: {result}

      </h2>

    </main>
  )
}