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
    "https://ai-workforce-risk-system.onrender.com/employees"
  )

  setEmployees(response.data)

  setEditingEmployee(null)

}


  useEffect(() => {

    axios
      .get(
        "https://ai-workforce-risk-system.onrender.com/employees"
      )
      .then((response) => {

        setEmployees(response.data)

      })

  }, [])

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Employee List
      </h1>

      <input
        type="text"
        placeholder="Search by name or department"
        className="border p-2 mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="flex gap-4 mb-4">

        <select
          className="border p-2"
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
          className="border p-2"
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




      <table className="border border-collapse w-full">

        <thead>

          <tr>

            <th className="border p-2">ID</th>

            <th className="border p-2">Name</th>

            <th className="border p-2">Department</th>

            <th className="border p-2">Risk Score</th>

            <th className="border p-2">Hours Worked</th>

            <th className="border p-2">Tasks Completed</th>

            <th className="border p-2">Delay Days</th>

            <th className="border p-2">Burnout Risk</th>

            <th className="border p-2">Actions</th>

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

            <tr key={employee.id}>

              <td className="border p-2">
                {employee.id}
              </td>

              <td className="border p-2">
                {employee.name}
              </td>

              <td className="border p-2">
                {employee.department}
              </td>

              <td className="border p-2">
                {employee.risk_score}
              </td>

              <td className="border p-2">
                {employee.hours_worked}
              </td>

              <td className="border p-2">
                {employee.tasks_completed}
              </td>

              <td className="border p-2">
                {employee.delay_days}
              </td>

              <td className="border p-2">
                {employee.burnout_risk}
              </td>

              <td className="border p-2">

                <div className="flex gap-2">

                  <button
                    onClick={() => editEmployee(employee)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteEmployee(employee.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
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

  )

}