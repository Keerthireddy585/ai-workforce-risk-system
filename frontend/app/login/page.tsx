"use client"

import axios from "axios"
import { useState } from "react"
import {useRouter} from "next/navigation";

export default function LoginPage() {

    console.log("LOGIN PAGE RENDERED")


  const [token, setToken] = useState("")
  const [role, setRole] = useState("Manager")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();

  const handleLogin = async () => {

    //  alert("LOGIN BUTTON CLICKED")

    try{
      console.log("BEFORE AXIOS")

    console.log("LOGIN BUTTON CLICKED")

    console.log("USERNAME:", username)
    console.log("PASSWORD:", password)
    console.log("ROLE SENT:", role)
    
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL)

    console.log(
      "LOGIN URL:",
      `${process.env.NEXT_PUBLIC_API_URL}/login`
    )

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      {
        username,
        password,
        role
      }
    )

    console.log("AFTER AXIOS")
    
     localStorage.setItem(
    "token",
    response.data.access_token
  )

  console.log("LOGIN RESPONSE:", response.data)

  localStorage.setItem(
  "role",
  response.data.role
)

  window.location.href = "/dashboard"
  } catch (error) {
    console.log("LOGIN ERROR:", error)
    alert("LOGIN FAILED")
  }
}


  return (

    <main className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-md w-[400px]">

        <h1 className="text-3xl font-bold mb-6">
          Workforce Login
        </h1>
        
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-4"
          />

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
          // onClick={() => router.push("/dashboard")}
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Sign In
        </button>


        <p className="mt-6 text-sm break-all">
          {token}
        </p>

      </div>

    </main>
  )
}