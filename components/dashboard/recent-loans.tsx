"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const recentLoans = [
  {
    member: "John Doe",
    amount: "250,000 ugx",
    date: "2024-03-20",
    status: "active",
  },
  {
    member: "Jane Smith",
    amount: "180,000 UGX",
    date: "2024-03-19",
    status: "overdue",
  },
  {
    member: "Mike Johnson",
    amount: "320,000 UGX",
    date: "2024-03-18",
    status: "completed",
  },
]

export function RecentLoans() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentLoans.map((loan) => (
          <TableRow key={loan.member}>
            <TableCell className="font-medium">{loan.member}</TableCell>
            <TableCell>{loan.amount}</TableCell>
            <TableCell>{loan.date}</TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  loan.status === "active"
                    ? "bg-green-100 text-green-800"
                    : loan.status === "overdue"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {loan.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}