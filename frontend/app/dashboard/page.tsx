"use client"

import { useEffect, useState } from "react"

import {jwtDecode} from "jwt-decode"

import ProductivityChart from "../../components/ProductivityChart"
import BurnoutChart from "../../components/BurnoutChart"
import ProjectDelayChart from "../../components/ProjectDelayChart"

export default function DashboardPage() {

  const [role, setRole] = useState("")


  useEffect(() => {

    const token = localStorage.getItem("token")

    if (token) {

      const decoded: any = jwtDecode(token)

      setRole(decoded.role)
    }

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