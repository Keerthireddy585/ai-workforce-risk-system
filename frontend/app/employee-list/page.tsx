"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function EmployeeListPage() {

  const [employees, setEmployees] = useState([])

  const [searchTerm, setSearchTerm] = useState("")

  const [departmentFilter, setDepartmentFilter] = useState("")
  const [burnoutFilter, setBurnoutFilter] = useState("")

  const [editingEmployee, setEditingEmployee] =
    useState<any>(null)

  const deleteEmployee = async (employeeId: number) => {

  await axios.delete(
    `https://ai-workforce-risk-system.onrender.com/employees/${employeeId}`
  )

  setEmployees(
    employees.filter(
      (employee: any) => employee.id !== employeeId
    )
  )

}

  const editEmployee = (employee: any) => {
    setEditingEmployee(employee)
  }


  const saveEmployee = async () => {

  await axios.put(

    `https://ai-workforce-risk-system.onrender.com/employees/${editingEmployee.id}`,
   
    editingEmployee

  )

  const response = await axios.get(
    // "https://ai-workforce-risk-system.onrender.com/employees"
    `${process.env.NEXT_PUBLIC_API_URL}/employees`
    // "http://127.0.0.1:8000/employees"
  )

  setEmployees(response.data)

  setEditingEmployee(null)

}


  useEffect(() => {

    axios
      .get(
        // "https://ai-workforce-risk-system.onrender.com/employees"
        // "http://127.0.0.1:8000/employees"
        `${process.env.NEXT_PUBLIC_API_URL}/employees`
      )
      .then((response) => {

        setEmployees(response.data)

      })

  }, [])

  return (

    <main className="p-10 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

      <h1 className="text-3xl font-bold mb-2">
        Employee List
      </h1>

      <p className="text-gray-500 mb-8">
        View, search, and manage workforce records
      </p>
    
      <input
        type="text"
        placeholder="Search by name or department"
        className="border rounded-lg p-3 mb-6 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="flex gap-4 mb-4">

        <select
          className="border rounded-lg px-4 py-2 bg-white"
          value={departmentFilter}
          onChange={(e) =>
            setDepartmentFilter(e.target.value)
          }
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>

        <select
          className="border rounded-lg px-4 py-2 bg-white"
          value={burnoutFilter}
          onChange={(e) =>
            setBurnoutFilter(e.target.value)
          }
        >
          <option value="">All Burnout Levels</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

      </div>


      {
  editingEmployee && (

    <div className="mb-6 border p-4">

      <h2 className="text-xl font-bold mb-4">
        Edit Employee
      </h2>

      <input
        className="border p-2 mb-2 w-full"
        value={editingEmployee.name}
        onChange={(e) =>
          setEditingEmployee({
            ...editingEmployee,
            name: e.target.value
          })
        }
      />

      <input
        className="border p-2 mb-2 w-full"
        value={editingEmployee.department}
        onChange={(e) =>
          setEditingEmployee({
            ...editingEmployee,
            department: e.target.value
          })
        }
      />

      <button
        onClick={saveEmployee}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>

    </div>

  )
}


    <div className="overflow-x-auto rounded-xl border">

      <table className="w-full bg-white rounded-xl overflow-hidden shadow-sm">
        {/* border border-collapse w-full" */}

        <thead className="bg-blue-50">

          <tr>

            <th className="px-6 py-4 bg-gray text-left text-sm font-semibold uppercase tracking-wide">ID</th>

            <th className="px-6 py-4 bg-gray text-left text-sm font-semibold uppercase tracking-wide">Name</th>

            <th className="px-6 py-4 bg-gray text-left text-sm font-semibold uppercase tracking-wide">Department</th>

            <th className="px-6 py-4 bg-gray text-left text-sm font-semibold uppercase tracking-wide">Risk Score</th>

            <th className="px-6 py-4 bg-gray text-left text-sm font-semibold uppercase tracking-wide">Hours Worked</th>

            <th className="px-6 py-4 bg-gray text-left text-sm font-semibold uppercase tracking-wide">Tasks Completed</th>

            <th className="px-6 py-4 bg-gray text-left text-sm font-semibold uppercase tracking-wide">Delay Days</th>

            <th className="px-6 py-4 bg-gray text-left text-sm font-semibold uppercase tracking-wide">Burnout Risk</th>

            <th className="px-6 py-4 bg-gray text-left text-sm font-semibold uppercase tracking-wide">Actions</th>

          </tr>

        </thead>

        <tbody>

          
          {employees
            .filter((employee: any) => {

              const matchesSearch =
                employee.name
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase())

                ||

                employee.department
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase())

              const matchesDepartment =
                departmentFilter === ""
                ||
                employee.department === departmentFilter

              const matchesBurnout =
                burnoutFilter === ""
                ||
                employee.burnout_risk === burnoutFilter

              return (
                matchesSearch &&
                matchesDepartment &&
                matchesBurnout
              )

           })
           .map((employee: any) => (

            <tr key={employee.id}
            className="hover:bg-blue-50 transition"
            >

              <td className="border px-4 py-3">
                {employee.id}
              </td>

              <td className="border px-4 py-3">
                {employee.name}
              </td>

              <td className="border px-4 py-3">
                {employee.department}
              </td>

              <td className="border px-4 py-3">
                {employee.risk_score}
              </td>

              <td className="border px-4 py-3">
                {employee.hours_worked}
              </td>

              <td className="border px-4 py-3">
                {employee.tasks_completed}
              </td>

              <td className="border px-4 py-3">
                {employee.delay_days}
              </td>

              <td className="border px-4 py-3">
                <span
                  className={
                    employee.burnout_risk === "High"
                    ? "text-red-600 font-semibold"
                    : employee.burnout_risk === "Medium"
                    ? "text-yellow-600 font-semibold"
                    : "text-green-600 font-semibold"
                  }
                >  
                {employee.burnout_risk}
                </span>
              </td>

              <td className="border p-2">

                <div className="flex gap-2">

                  <button
                    onClick={() => editEmployee(employee)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteEmployee(employee.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>

                </div>

              </td>

               

            </tr>

          ))}

        </tbody>

      </table>

    </div>

    </div>
  </main>
  )

}