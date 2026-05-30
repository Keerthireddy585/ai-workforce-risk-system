// export default function Home() {
//   return (
//     <main className="p-10">

//       <h1 className="text-4xl font-bold mb-8">
//         AI Workforce Risk Intelligence Dashboard
//       </h1>

//       <div className="grid grid-cols-3 gap-6">

//         <div className="p-6 border rounded-xl">
//           <h2 className="text-2xl font-semibold">
//             Productivity Score
//           </h2>

//           <p className="text-3xl mt-4">
//             85
//           </p>
//         </div>

//         <div className="p-6 border rounded-xl">
//           <h2 className="text-2xl font-semibold">
//             Burnout Risk
//           </h2>

//           <p className="text-3xl mt-4">
//             High
//           </p>
//         </div>

//         <div className="p-6 border rounded-xl">
//           <h2 className="text-2xl font-semibold">
//             Project Risk
//           </h2>

//           <p className="text-3xl mt-4">
//             Medium
//           </p>
//         </div>

//       </div>

//     </main>
//   )
// }




// connecting frontend to API
// "use client"

// import axios from "axios"
// import { useEffect, useState } from "react"

// export default function Home() {

//   const [score, setScore] = useState(0)

//   useEffect(() => {

//     axios
//       .get("http://127.0.0.1:8000/productivity-score")

//       .then((response) => {

//         setScore(response.data.productivity_score)

//       })

//   }, [])

//   return (

//     <main className="p-10">

//       <h1 className="text-4xl font-bold mb-8">
//         AI Workforce Risk Intelligence Dashboard
//       </h1>

//       <div className="grid grid-cols-3 gap-6">

//         <div className="p-6 border rounded-xl">

//           <h2 className="text-2xl font-semibold">
//             Productivity Score
//           </h2>

//           <p className="text-3xl mt-4">
//             {score}
//           </p>

//         </div>

//       </div>

//     </main>
//   )
// }



//  connecting frontend to api
"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import ProductivityChart from "../components/ProductivityChart"
import BurnoutChart from "../components/BurnoutChart"
import WorkloadChart from "../components/WorkloadChart"
import RiskTrendChart from "../components/RiskTrendChart"
import ProjectDelayChart from "../components/ProjectDelayChart"
import AnomalyChart from "../components/AnomalyChart"

export default function Home() {

  const [score, setScore] = useState<number | null>(null)

  const [burnoutRisk, setBurnoutRisk] = useState("")

  const [projectRisk, setProjectRisk] = useState("")

  const [anomalyAlert, setAnomalyAlert] = useState("")

  const [workloadStatus, setWorkloadStatus] = useState("")


  useEffect(() => {

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/productivity-score`)
      .then(response => {
        setScore(response.data.productivity_score)
      })

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/burnout-risk`)
      .then(response => {
        setBurnoutRisk(response.data.burnout_risk)
      })

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/project-risk`)
      .then(response => {
        setProjectRisk(response.data.project_risk)
      })

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/anomaly-alert`)
      .then(response => {
        setAnomalyAlert(response.data.anomaly_alert)
      })

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/workload-status`)
      .then(response => {
        setWorkloadStatus(response.data.workload_status)
      })

  }, [])


  return (

    <main className="p-10 min-h-screen bg-gray-100">

      <h1 className="text-4xl font-bold mb-8">
        AI Workforce Risk Intelligence Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6">


        <div className="p-6 bg-white rounded-2xl shadow-md">

          <h2 className="text-2xl font-semibold">
            Productivity Score
          </h2>

          <p className="text-5xl mt-4 font-bold">
            {score}
          </p>

        </div>


        <div className="p-6 bg-white rounded-2xl shadow-md">

          <h2 className="text-2xl font-semibold">
            Burnout Risk
          </h2>

          <p className="text-4xl mt-4 font-bold text-red-500">
            {burnoutRisk}
          </p>

        </div>


        <div className="p-6 bg-white rounded-2xl shadow-md">

          <h2 className="text-2xl font-semibold">
            Project Risk
          </h2>

          <p className="text-4xl mt-4 font-bold text-yellow-500">
            {projectRisk}
          </p>

        </div>


        <div className="p-6 bg-white rounded-2xl shadow-md">

          <h2 className="text-2xl font-semibold">
            Anomaly Alert
          </h2>

          <p className="text-2xl mt-4 font-bold text-red-600">
            {anomalyAlert}
          </p>

        </div>


        <div className="p-6 bg-white rounded-2xl shadow-md">

         <h2 className="text-2xl font-semibold">
            Workload Status
          </h2>

          <p className="text-4xl mt-4 font-bold text-orange-500">
            {workloadStatus}
          </p>

        </div>

        <div className="mt-10 p-6 bg-white rounded-2xl shadow-md">

         <h2 className="text-3xl font-bold mb-6">
           Productivity Trends
         </h2>

         <ProductivityChart />
 
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md">

         <h2 className="text-2xl font-bold mb-4">
           Burnout Trends
         </h2>

         <BurnoutChart />

        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md">

         <h2 className="text-2xl font-bold mb-4">
           Workload Distribution
         </h2>

         <WorkloadChart />

        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md">

         <h2 className="text-2xl font-bold mb-4">
           Risk Trend Analysis
         </h2>

         <RiskTrendChart />

        </div>


        <div className="p-6 bg-white rounded-2xl shadow-md">

         <h2 className="text-2xl font-bold mb-4">
           Project Delay Analytics
         </h2>

         <ProjectDelayChart />

        </div>


        <div className="p-6 bg-white rounded-2xl shadow-md">

         <h2 className="text-2xl font-bold mb-4">
           Anomaly Frequency
         </h2>

         <AnomalyChart />

        </div>

     </div>
    </main>
  )
}