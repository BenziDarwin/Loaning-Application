"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateTownDialog } from "@/components/onboarding/create-town-dialog";
import type { Town } from "@/types/members";
import { getTowns } from "@/core/towns/api";

export default function OnboardingTownsPage() {
  const [towns, setTowns] = useState<Town[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getTowns();
        setTowns(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateTown = (town: Town) => {
    const newTown: Town = {
      ...town,
      collectorPhone: "Auto-filled based on collector",
      loanPortfolio: 0,
    };
    setTowns([...towns, newTown]);
    setIsCreateOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Town Onboarding</h2>
          <p className="text-muted-foreground">
            Register new towns and manage their information
          </p>
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            ) : towns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No towns registered yet
                </TableCell>
              </TableRow>
            ) : (
              towns.map((town) => (
                <TableRow key={town.id}>
                  <TableCell className="font-medium">{town.name}</TableCell>
                  <TableCell>{town.nickname || "N/A"}</TableCell>
                  <TableCell>
                    {town.collector?.firstName
                      ? `${town.collector.firstName} ${town.collector.secondName} ${town.collector.thirdName}`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {new Date(town.enrollmentDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${town.loanPortfolio.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <CreateTownDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreateTown}
      />
    </div>
  );
}
