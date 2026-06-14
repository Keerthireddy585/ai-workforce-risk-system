export default function AnalyticsPage() {
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
                    <p className="text-3xl font-bold mt-2">10</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-gray-500">Avg Productivity</h3>
                    <p className="text-3xl font-bold mt-2">82%</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-gray-500">Avg Burnout Risk</h3>
                    <p className="text-3xl font-bold mt-2">34%</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-gray-500">Active Alerts</h3>
                    <p className="text-3xl font-bold mt-2">2</p>
                  </div>

                </div>



                <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

                  <h2 className="text-2xl font-semibold mb-6">
                    Department Performance
                  </h2>

                  <div className="space-y-5">

                    <div>
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

            </div>



            {/* burnout risk distribution */}
                <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

                  <h2 className="text-2xl font-semibold mb-6">
                    Burnout Risk Distribution
                  </h2>

                  <div className="space-y-5">

                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Low Risk</span>
                        <span>60%</span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-green-500 h-4 rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Medium Risk</span>
                        <span>25%</span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-yellow-500 h-4 rounded-full"
                          style={{ width: "25%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span>High Risk</span>
                        <span>15%</span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-red-500 h-4 rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                     </div>
                    </div>

                </div>

            </div>



                <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

                  <h2 className="text-2xl font-semibold mb-6">
                    Productivity Trend
                  </h2>

                  <div className="grid grid-cols-5 gap-4 items-end h-48">

                    <div className="flex flex-col items-center">
                      <div
                        className="bg-blue-500 w-12 rounded-t-lg"
                        style={{ height: "100px" }}
                      ></div>
                      <span className="mt-2">Jan</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div
                        className="bg-blue-500 w-12 rounded-t-lg"
                        style={{ height: "120px" }}
                      ></div>
                      <span className="mt-2">Feb</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div
                        className="bg-blue-500 w-12 rounded-t-lg"
                        style={{ height: "140px" }}
                      ></div>
                      <span className="mt-2">Mar</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div
                        className="bg-blue-500 w-12 rounded-t-lg"
                        style={{ height: "130px" }}
                      ></div>
                      <span className="mt-2">Apr</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div
                        className="bg-blue-500 w-12 rounded-t-lg"
                        style={{ height: "160px" }}
                      ></div>
                      <span className="mt-2">May</span>
                    </div>

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
                        18
                      </p>
                    </div>

                    <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
                      <h3 className="text-gray-600">
                        At-Risk Projects
                      </h3>

                      <p className="text-4xl font-bold text-yellow-600 mt-2">
                        5
                      </p>
                    </div>

                    <div className="bg-red-50 p-5 rounded-xl border border-red-200">
                      <h3 className="text-gray-600">
                        Delayed Projects
                      </h3>

                      <p className="text-4xl font-bold text-red-600 mt-2">
                        2
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
                      Productivity improved by 8% compared to last month.
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                      Engineering department has the highest workload.
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      2 employees are currently in the high burnout risk category.
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                      18 projects are currently on track for timely delivery.
                    </div>

                  </div>

                </div>

            </div>
            
        </div>
    );
}