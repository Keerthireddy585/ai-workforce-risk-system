"use client"

import axios from "axios"
import { useState } from "react"

export default function LoginPage() {

  const [token, setToken] = useState("")
  const [role, setRole] = useState("Manager")


  const handleLogin = async () => {

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      {
        role: role
      }
    )

     localStorage.setItem(
    "token",
    response.data.access_token
  )

  localStorage.setItem(
  "role",
  response.data.role
)

  window.location.href = "/dashboard"
  }


  return (

    <main className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-md w-[400px]">

        <h1 className="text-3xl font-bold mb-6">
          Workforce Login
        </h1>
        
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        >
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl w-full"
        >
          Login
        </button>


        <p className="mt-6 text-sm break-all">
          {token}
        </p>

      </div>

    </main>
  )
}