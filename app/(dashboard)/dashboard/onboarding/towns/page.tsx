"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CreateTownDialog } from "@/components/onboarding/create-town-dialog"
import type { Town } from "@/types/members"

const initialTowns: Town[] = []

export default function OnboardingTownsPage() {
  const [towns, setTowns] = useState<Town[]>(initialTowns)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const handleCreateTown = (town: Omit<Town, "id" | "collectorPhone" | "loanPortfolio">) => {
    const newTown: Town = {
      ...town,
      id: Math.random().toString(36).substr(2, 9),
      collectorPhone: "Auto-filled based on collector", // This would be filled from collector data
      loanPortfolio: 0,
    }
    setTowns([...towns, newTown])
    setIsCreateOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Town Onboarding</h2>
          <p className="text-muted-foreground">Register new towns and manage their information</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Town
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Nickname</TableHead>
              <TableHead>Collector</TableHead>
              <TableHead>Enrollment Date</TableHead>
              <TableHead>Loan Portfolio</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {towns.map((town) => (
              <TableRow key={town.id}>
                <TableCell className="font-medium">{town.name}</TableCell>
                <TableCell>{town.nickname || "N/A"}</TableCell>
                <TableCell>{town.collector}</TableCell>
                <TableCell>{town.enrollmentDate.toLocaleDateString()}</TableCell>
                <TableCell>${town.loanPortfolio.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateTownDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreateTown}
      />
    </div>
  )
}