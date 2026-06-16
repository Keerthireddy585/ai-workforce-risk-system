"use client"

import { useEffect, useState } from "react"

import axios from "axios"

import {jwtDecode} from "jwt-decode"

import ProductivityChart from "../../components/ProductivityChart"
import BurnoutChart from "../../components/BurnoutChart"
import ProjectDelayChart from "../../components/ProjectDelayChart"
import EmployeeHistoryChart from "../../components/EmployeeHistoryChart"
import WorkloadChart from "../../components/WorkloadChart"
import RiskTrendChart from "../../components/RiskTrendChart"
import AnomalyChart from "../../components/AnomalyChart"

export default function DashboardPage() {
  
  const [employees, setEmployees] = useState<any[]>([])

  const [
   selectedEmployee,
   setSelectedEmployee
  ] = useState(0)

  const [role, setRole] = useState("")
  const [bottlenecks, setBottlenecks] =
  useState<any[]>([])
  
  const [score, setScore] = useState<number | null>(null)
  const [burnoutRisk, setBurnoutRisk] = useState("")
  const [projectRisk, setProjectRisk] = useState("")
  const [anomalyAlert, setAnomalyAlert] = useState("")
  const [workloadStatus, setWorkloadStatus] = useState("")


  useEffect(() => {

  const token = localStorage.getItem("token")

  if (token) {

    const decoded: any = jwtDecode(token)

    console.log("TOKEN DATA:", decoded)
    console.log("ROLE:", decoded.role)

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
        //  "http://127.0.0.1:8000/bottleneck-detection"
        // "https://ai-workforce-risk-system.onrender.com/bottleneck-detection"
        `${process.env.NEXT_PUBLIC_API_URL}/bottleneck-detection`
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

       axios
         .get(`${process.env.NEXT_PUBLIC_API_URL}/employees`)
         .then((response) => {
           setEmployees(response.data)
         })
         .catch((error) => {
           console.error(error)
         })

       
       axios
         .get(`${process.env.NEXT_PUBLIC_API_URL}/productivity-score`)
         .then((response) => {
           setScore(response.data.productivity_score)
         })

       axios
         .get(`${process.env.NEXT_PUBLIC_API_URL}/burnout-risk`)
         .then((response) => {
           setBurnoutRisk(response.data.burnout_risk)
         })

       axios
         .get(`${process.env.NEXT_PUBLIC_API_URL}/project-risk`)
         .then((response) => {
           setProjectRisk(response.data.project_risk)
         })

       axios
         .get(`${process.env.NEXT_PUBLIC_API_URL}/anomaly-alert`)
         .then((response) => {
           setAnomalyAlert(response.data.anomaly_alert)
         })

       axios
         .get(`${process.env.NEXT_PUBLIC_API_URL}/workload-status`)
         .then((response) => {
           setWorkloadStatus(response.data.workload_status)
         })

       }, [])

  console.log("ROLE:", role)
  console.log("EMPLOYEES:", employees)
  console.log("SELECTED:", selectedEmployee)

  return (

    <main className="p-10 min-h-screen bg-gray-100">

      <h1 className="text-4xl font-bold text-black mb-2">
        Enterprise Workforce Dashboard
      </h1>

      <p className="text-gray-500 text-lg mb-6">
        AI-powered workforce monitoring and risk analytics
      </p>


      <div className="mb-4">

        <p className="text-xl font-semibold text-black mb-4">
          Logged in as: {role}
        </p>

        <div className="grid grid-cols-2 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-gray-500 text-sm uppercase">
              Productivity Score</h2>
            <p className="text-5xl font-bold text-blue-600 mt-2">
              {score}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-gray-500 text-sm uppercase">
              Burnout Risk
            </h2>
            <p className="text-5xl font-bold text-red-500 mt-2">
              {burnoutRisk}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-gray-500 text-sm uppercase">
              Project Risk</h2>
            <p className="text-5xl font-bold text-yellow-500 mt-2">
              {projectRisk}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-gray-500 text-sm uppercase">
              Anomaly Alert</h2>
            <p className="text-xl font-bold text-red-600 mt-2">
              {anomalyAlert}
            </p>
          </div>

        </div>

      </div>


      {/* ADMIN DASHBOARD */}

      {role === "Admin" && (

        <div className="grid grid-cols-2 gap-8">

          <div className="p-6 bg-white rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold text-black mb-4">
              Productivity Trends
            </h2>

            <ProductivityChart />

          </div>


          <div className="p-6 bg-white rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold text-black mb-4">
              Burnout Analytics
            </h2>

            <BurnoutChart />

          </div>


          <div className="p-6 bg-white rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold text-black mb-4">
              Project Delay Analytics
            </h2>

            <ProjectDelayChart />

          </div>

        </div>

      )}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mt-8 mb-6">

          <h2 className="text-gray-500 text-sm uppercase">
            Workload Status
          </h2>

          <p className="text-5xl font-bold text-orange-500 mt-2">
            {workloadStatus}
          </p>

        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md">

          <h2 className="text-2xl font-bold text-black mb-4">
            Bottlenecks Detected
          </h2>

          <p className="text-4xl font-bold text-red-500">
            {bottlenecks.length}
          </p>

          {bottlenecks.map((employee: any) => (

          <div
            key={employee.employee_id}
            className="border-b text-black py-2"
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
        
        <div className="mt-8">
          <label
            className="block text-lg font-semibold text-black mb-2"
          >
            Select Employee for Risk History
          </label>
        

        <select
          value={selectedEmployee}
          onChange={(e)=>
            setSelectedEmployee(
              Number(e.target.value)
            )
          }
          className="w-full p-3 border rounded-lg text-black shadow-sm"
        >

        {/* <option value={10}>
        Rahul
        </option>

        <option value={13}>
        Anjali
        </option>

        <option value={17}>
        John
        </option>

        </select> */}

        {employees.map((employee: any) => (
          <option
            key={employee.id}
            value={employee.id}
          >
            {employee.name}
          </option>
        ))}
        </select>
        </div>


        


        <div className="p-6 bg-white rounded-2xl text-black shadow-md mt-4">

          <EmployeeHistoryChart
          employeeId={selectedEmployee}
          employeeName={
            employees.find(
              (emp: any) => emp.id === selectedEmployee
            )?.name || ""
          }
          />
          
        </div>

        <div className="grid grid-cols-2 gap-6">

          {/* <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2>Productivity Trends</h2>
            <ProductivityChart />
          </div> */}

          <div className="p-6 bg-white rounded-2xl shadow-md mt-6">
            <h2 className="text-2xl text-black font-bold mb-4">
              Burnout Trends</h2>
            <BurnoutChart />
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md mt-6">
            <h2 className="text-2xl text-black font-bold mb-4">
              Workload Distribution</h2>
            <WorkloadChart />
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl text-black font-bold mb-4">
              Risk Trend Analysis</h2>
            <RiskTrendChart />
          </div>

          {/* <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2>Project Delay Analytics</h2>
            <ProjectDelayChart />
          </div> */}

          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl text-black font-bold mb-4">
              Anomaly Frequency</h2>
            <AnomalyChart />
          </div>

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

          <div className="p-6 bg-white text-black rounded-2xl shadow-md mt-6">

            <h2 className="text-2xl font-bold mb-4">
              Productivity Trends
            </h2>

            <ProductivityChart />

          </div>


          <div className="p-6 bg-white text-black rounded-2xl shadow-md mt-6">

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