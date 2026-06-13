"use client"

import Link from "next/link"
import {useRouter, usePathname} from "next/navigation";

export default function Sidebar() {

    const router = useRouter();
    const pathname = usePathname();

    if (pathname === "/login") {
        return null;
    }

 return (

<div
 className="
 w-64
 min-h-screen
 bg-slate-950
 text-white
 p-6
 shadow-xl
 "
>

<h2
 className="
 text-3xl
 font-bold
 mb-8
 "
>
AI Workforce
</h2>

{/* <div className="space-y-4"> */}

<div className="flex flex-col gap-2 mt-4">

<Link href="/dashboard"
className={`block rounded-lg px-3 py-2 transition ${
  pathname === "/dashboard"
    ? "bg-slate-800 text-white"
    : "hover:bg-slate-800"
}`}  
>
Dashboard
</Link>


<Link href="/employees"
className={`block rounded-lg px-3 py-2 transition ${
  pathname === "/employees"
    ? "bg-slate-800 text-white"
    : "hover:bg-slate-800"
 }`} >
Add Employee
</Link>


<Link href="/employee-list"
className={`block rounded-lg px-3 py-2 transition ${
  pathname === "/employee-list"
    ? "bg-slate-800 text-white"
    : "hover:bg-slate-800"
 }`} >Employee List
</Link>


<Link href="/analytics"
className={`block rounded-lg px-3 py-2 transition ${
  pathname === "/analytics"
    ? "bg-slate-800 text-white"
    : "hover:bg-slate-800"
 }`} >Analytics
</Link>


<Link href="/predict-burnout"
className={`block rounded-lg px-3 py-2 transition ${
  pathname === "/predict-burnout"
    ? "bg-slate-800 text-white"
    : "hover:bg-slate-800"
 }`} >Predict Burnout
</Link>

<hr className="border-slate-700 my-4" />

<button
  onClick={() => router.push("/login")}
//   className="w-full bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-lg mt-auto transition"
  className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-md text-sm font-medium transition"

>
  Logout
</button>

</div>

</div>

 )
}