"use client"
import { useEffect, useState } from "react"
import axios from "axios"

export default function AnalyticsPage() {

    const [employees, setEmployees] = useState<any[]>([])
    const [historyData, setHistoryData] = useState<any[]>([])


    useEffect(() => {

      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/employees`
        )
        .then((response) => {
          setEmployees(response.data)

        //   console.log("Employees API Response:")
        //   console.log(response.data)

        })

        


        console.log("API URL:", process.env.NEXT_PUBLIC_API_URL)



       axios
         .get(
           `${process.env.NEXT_PUBLIC_API_URL}/employee-history/2`
         )
         .then((response) => {

            console.log(response.data.history)

           setHistoryData(
             response.data.history
           )
         })

     }, [])



    const averageProductivity =
    employees.length > 0
      ? Math.round(

          employees.reduce(

            (sum, employee) =>

              sum +
              (
                employee.tasks_completed /
                Math.max(employee.hours_worked, 1)
              ) * 100,

            0

          ) / employees.length

        )
      : 0


      const averageBurnout =

      employees.length > 0

      ? Math.round(

          employees.reduce(

            (sum, employee) => {

              if (
                employee.burnout_risk === "High"
              )
                return sum + 100

              if (
                employee.burnout_risk === "Medium"
              )
                return sum + 50

              return sum

            },

            0

          ) / employees.length

        )

      : 0


      const departmentCounts = employees.reduce(
        (acc: any, employee: any) => {

          acc[employee.department] =
            (acc[employee.department] || 0) + 1

          return acc

        },
        {}
      )
       

      const highRiskCount = employees.filter(
        (employee: any) =>
          employee.burnout_risk === "High"
      ).length

      const mediumRiskCount = employees.filter(
        (employee: any) =>
          employee.burnout_risk === "Medium"
      ).length

      const lowRiskCount = employees.filter(
        (employee: any) =>
          employee.burnout_risk === "Low"
      ).length


      const highRiskPercent =
      employees.length > 0
        ? Math.round(
            (highRiskCount / employees.length) * 100
          )
        : 0

      const mediumRiskPercent =
      employees.length > 0
        ? Math.round(
            (mediumRiskCount / employees.length) * 100
          )
        : 0

      const lowRiskPercent =
      employees.length > 0
        ? Math.round(
            (lowRiskCount / employees.length) * 100
          )
        : 0  
    

      const delayedProjects = employees.filter(
        (employee: any) =>
          employee.delay_days > 5
      ).length

      const atRiskProjects = employees.filter(
        (employee: any) =>
          employee.delay_days > 0 &&
          employee.delay_days <= 5
      ).length

      const onTimeProjects = employees.filter(
        (employee: any) =>
          employee.delay_days === 0
      ).length

      
      const highestDepartment =
      Object.entries(departmentCounts).length > 0

      ? Object.entries(departmentCounts).sort(
          (a: any, b: any) => b[1] - a[1]
        )[0][0]

      : "N/A"


      const productivityStatus =

      averageProductivity >= 70

      ? "Productivity is performing well across the workforce."

      : "Productivity may require attention."


      const burnoutStatus =

      highRiskCount > 0

      ? `${highRiskCount} employees are currently in the high burnout risk category.`

      : "No employees are currently in the high burnout risk category."


      const projectStatus =

      delayedProjects > 0

      ? `${delayedProjects} projects require immediate attention.`

      : "All projects are currently on track."


      const monthOrder = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

      const sortedHistory = [...historyData].sort(
        (a, b) =>
          monthOrder.indexOf(a.month) -
          monthOrder.indexOf(b.month)
      );


    //   const [historyData, setHistoryData] = useState<any[]>([])

    return (
        <div className="p-10">
            <div className="mb-8">
                <h1 className="text-4xl font-bold">
                    Workforce Analytics
                </h1>


                <p className="text-gray-600 mt-2 mb-8">
                    Workforce insights, trends and performance metrics
                </p>

                <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl mb-8">

                  <h2 className="text-2xl font-semibold mb-2">
                    Analytics Overview
                  </h2>

                  <p className="text-gray-600">
                    Monitor workforce trends, employee wellbeing,
                    project performance and operational risks.
                  </p>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-gray-500">Total Employees</h3>
                    <p className="text-3xl font-bold mt-2">{employees.length}</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-gray-500">Avg Productivity</h3>
                    <p className="text-3xl font-bold mt-2">{averageProductivity}%</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-gray-500">Avg Burnout Risk</h3>
                    <p className="text-3xl font-bold mt-2">{averageBurnout}%</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-gray-500">Active Alerts</h3>
                    <p className="text-3xl font-bold mt-2">{
                         employees.filter(
                           (employee) =>
                             employee.burnout_risk === "High"
                         ).length
                    }</p>

                  </div>

                </div>



                <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

                  <h2 className="text-2xl font-semibold mb-6">
                    Department Performance
                  </h2>

                  <div className="space-y-5">

                    {Object.entries(departmentCounts).map(
                      ([department, count]: any) => (

                        <div key={department}>

                          <div className="flex justify-between mb-1">

                            <span>{department}</span>

                            <span>{count}</span>

                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-3">

                            <div
                              className="bg-blue-600 h-3 rounded-full"
                              style={{
                                width: `${
                                  (count / employees.length) * 100
                                }%`,
                              }}
                            ></div>

                          </div>
     
                        </div>

                      )
                    )}

                </div>
        </div>

                    {/* <div>
                      <div className="flex justify-between mb-1">
                        <span>Engineering</span>
                        <span>82%</span>
                      </div>
  
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{ width: "82%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>HR</span>
                      <span>75%</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-600 h-3 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Marketing</span>
                      <span>68%</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-yellow-500 h-3 rounded-full"
                        style={{ width: "68%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Operations</span>
                      <span>71%</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-purple-600 h-3 rounded-full"
                        style={{ width: "71%" }}
                      ></div>
                    </div>
                  </div>

                </div>

            </div> */}



            {/* burnout risk distribution */}
                <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

                  <h2 className="text-2xl font-semibold mb-6">
                    Burnout Risk Distribution
                  </h2>

                  <div className="space-y-5">

                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Low Risk</span>
                        <span>{lowRiskPercent}%</span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-green-500 h-4 rounded-full"
                          style={{
                            width: `${lowRiskPercent}%`
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Medium Risk</span>
                        <span>{mediumRiskPercent}%</span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-yellow-500 h-4 rounded-full"
                          style={{
                            width: `${mediumRiskPercent}%`
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span>High Risk</span>
                        <span>{highRiskPercent}%</span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-red-500 h-4 rounded-full"
                          style={{
                            width: `${highRiskPercent}%`
                          }}
                        ></div>
                     </div>
                    </div>

                </div>

            </div>

                {/* <pre>
                  {JSON.stringify(historyData, null, 2)}
                </pre> */}

                <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

                  <h2 className="text-2xl font-semibold mb-6">
                    Productivity Trend
                  </h2>

                  <div className="grid grid-cols-5 gap-4 items-end h-64">

                    {sortedHistory.map((record) => (

                      <div
                        key={record.record}
                        className="flex flex-col items-center"
                      >

                        <div
                          className="bg-blue-500 w-12 rounded-t-lg"
                          style={{
                            height: `${Math.max(
                              (record.productivity_score / 250) * 120,
                              40
                            )}px`
                          }}
                        ></div>

                        <span className="mt-2 text-black font-medium">
                          {/* {JSON.stringify(record)}  */}
                          {record.month}
                          {/* Record {record.record} */}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>



                {/* Project delay analytics */}
                <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

                  <h2 className="text-2xl font-semibold mb-6">
                    Project Delay Analytics
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                      <h3 className="text-gray-600">
                        On-Time Projects
                      </h3>

                      <p className="text-4xl font-bold text-green-600 mt-2">
                        {onTimeProjects}
                      </p>
                    </div>

                    <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
                      <h3 className="text-gray-600">
                        At-Risk Projects
                      </h3>

                      <p className="text-4xl font-bold text-yellow-600 mt-2">
                        {atRiskProjects}
                      </p>
                    </div>

                    <div className="bg-red-50 p-5 rounded-xl border border-red-200">
                      <h3 className="text-gray-600">
                        Delayed Projects
                      </h3>

                      <p className="text-4xl font-bold text-red-600 mt-2">
                        {delayedProjects}
                      </p>
                    </div>

                  </div>

                </div>



                <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

                  <h2 className="text-2xl font-semibold mb-6">
                    Key Insights
                  </h2>

                  <div className="space-y-4">

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                      {productivityStatus}
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                      {highestDepartment} currently has the highest workforce allocation.
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      {burnoutStatus}
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                      {projectStatus}
                    </div>

                  </div>

                </div>

            </div>
            
        </div>
    );
}