"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", loans: 4000, collections: 2400 },
  { name: "Feb", loans: 3000, collections: 1398 },
  { name: "Mar", loans: 2000, collections: 9800 },
  { name: "Apr", loans: 2780, collections: 3908 },
  { name: "May", loans: 1890, collections: 4800 },
  { name: "Jun", loans: 2390, collections: 3800 },
]

export function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="loans" stroke="#22c55e" />
        <Line type="monotone" dataKey="collections" stroke="#3b82f6" />
      </LineChart>
    </ResponsiveContainer>
  )
}