"use client"

import { useEffect, useState } from "react"

import axios from "axios"

import {jwtDecode} from "jwt-decode"

import ProductivityChart from "../../components/ProductivityChart"
import BurnoutChart from "../../components/BurnoutChart"
import ProjectDelayChart from "../../components/ProjectDelayChart"

export default function DashboardPage() {

  const [role, setRole] = useState("")
  const [bottlenecks, setBottlenecks] =
  useState<any[]>([])

  useEffect(() => {

  const token = localStorage.getItem("token")

  if (token) {

    const decoded: any = jwtDecode(token)

    setRole(decoded.role)
  }

//   axios
//     .get(
//       "http://127.0.0.1:8000/bottleneck-detection"
//     )
//     .then((response) => {

//       setBottlenecks(
//         response.data.bottlenecks
//       )

//     })
     axios
       .get(
         "http://127.0.0.1:8000/bottleneck-detection"
       )
       .then((response) => {

         console.log("Bottleneck API Response:")
         console.log(response.data)

         setBottlenecks(
           response.data.bottlenecks
         )

       })
       .catch((error) => {

         console.log("Bottleneck API Error:")
         console.log(error)

       })

}, [])


  return (

    <main className="p-10 min-h-screen bg-gray-100">

      <h1 className="text-4xl font-bold mb-8">
        Enterprise Workforce Dashboard
      </h1>


      <div className="mb-8">

        <p className="text-2xl font-semibold">
          Logged in as: {role}
        </p>

      </div>


      {/* ADMIN DASHBOARD */}

      {role === "Admin" && (

        <div className="grid grid-cols-2 gap-8">

          <div className="p-6 bg-white rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold mb-4">
              Productivity Trends
            </h2>

            <ProductivityChart />

          </div>


          <div className="p-6 bg-white rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold mb-4">
              Burnout Analytics
            </h2>

            <BurnoutChart />

          </div>


          <div className="p-6 bg-white rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold mb-4">
              Project Delay Analytics
            </h2>

            <ProjectDelayChart />

          </div>

        </div>

      )}

        <div className="p-6 bg-white rounded-2xl shadow-md">

          <h2 className="text-2xl font-bold mb-4">
            Bottlenecks Detected
          </h2>

          <p className="text-4xl font-bold text-red-500">
            {bottlenecks.length}
          </p>

          {bottlenecks.map((employee: any) => (

          <div
            key={employee.employee_id}
            className="border-b py-2"
          >

            <p>
              {employee.employee_name}
            </p>

            <p className="text-sm text-gray-500">
              Delay Days: {employee.delay_days}
            </p>

          </div>
        ))}

         </div>
       

      {/* HR DASHBOARD */}

      {role === "HR" && (

        <div className="grid grid-cols-2 gap-8">

          <div className="p-6 bg-white rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold mb-4">
              Burnout Analytics
            </h2>

            <BurnoutChart />

          </div>

        </div>

      )}


      {/* MANAGER DASHBOARD */}

      {role === "Manager" && (

        <div className="grid grid-cols-2 gap-8">

          <div className="p-6 bg-white rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold mb-4">
              Productivity Trends
            </h2>

            <ProductivityChart />

          </div>


          <div className="p-6 bg-white rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold mb-4">
              Project Delay Analytics
            </h2>

            <ProjectDelayChart />

          </div>

        </div>

      )}

    </main>
  )
}