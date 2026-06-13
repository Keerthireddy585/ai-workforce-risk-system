"use client";

import { useState } from "react";

export default function EmployeesPage() {
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    hours_worked: 0,
    tasks_completed: 0,
    delay_days: 0,
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    const response = await fetch(
      "https://ai-workforce-risk-system.onrender.com/employees",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      }
    );

    const data = await response.json();

    setSuccess(true);
    console.log(data);
  };

  return (
    <main className="p-10 bg-gray-100 min-h-screen">
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-1">
        Add Employee
      </h1>

      <p className="text-gray-500 mb-8">
        Add a new employee record to the workforce system
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">

        <input
          placeholder="Name"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500p"
          onChange={(e) =>
            setEmployee({
              ...employee,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="Department"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500p"
          onChange={(e) =>
            setEmployee({
              ...employee,
              department: e.target.value,
            })
          }
        />

       

        <input
          placeholder="Hours Worked"
          type="number"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500p"
          onChange={(e) =>
            setEmployee({
              ...employee,
              hours_worked: Number(e.target.value),
            })
          }
        />

        <input
          placeholder="Tasks Completed"
          type="number"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500p"
          onChange={(e) =>
            setEmployee({
              ...employee,
              tasks_completed: Number(e.target.value),
            })
          }
        />

        <input
          placeholder="Delay Days"
          type="number"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500p"
          onChange={(e) =>
            setEmployee({
              ...employee,
              delay_days: Number(e.target.value),
            })
          }
        />
      </div>
       
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Add Employee
        </button>
      </div>

        {success && (
          <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-green-700 font-semibold">
              Employee added succesfully
            </p>
          </div>
        )}

      
    </div>
  </main>
  );
}