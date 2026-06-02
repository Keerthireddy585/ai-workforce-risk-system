"use client";

import { useState } from "react";

export default function EmployeesPage() {
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    risk_score: 0,
    hours_worked: 0,
    tasks_completed: 0,
    delay_days: 0,
    burnout_risk: "",
  });

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

    alert("Employee Added Successfully");
    console.log(data);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Add Employee
      </h1>

      <div className="flex flex-col gap-4 max-w-md">

        <input
          placeholder="Name"
          className="border p-2"
          onChange={(e) =>
            setEmployee({
              ...employee,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="Department"
          className="border p-2"
          onChange={(e) =>
            setEmployee({
              ...employee,
              department: e.target.value,
            })
          }
        />

        <input
          placeholder="Risk Score"
          type="number"
          className="border p-2"
          onChange={(e) =>
            setEmployee({
              ...employee,
              risk_score: Number(e.target.value),
            })
          }
        />

        <input
          placeholder="Hours Worked"
          type="number"
          className="border p-2"
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
          className="border p-2"
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
          className="border p-2"
          onChange={(e) =>
            setEmployee({
              ...employee,
              delay_days: Number(e.target.value),
            })
          }
        />

        <input
          placeholder="Burnout Risk"
          className="border p-2"
          onChange={(e) =>
            setEmployee({
              ...employee,
              burnout_risk: e.target.value,
            })
          }
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-3 rounded"
        >
          Add Employee
        </button>

      </div>
    </div>
  );
}