"use client";

import { useState } from "react";
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
import { CreateCollectorDialog } from "@/components/onboarding/create-collector-dialog";
import type { Collector } from "@/types/members";

const initialCollectors: Collector[] = [];

export default function OnboardingCollectorsPage() {
  const [collectors, setCollectors] = useState<Collector[]>(initialCollectors);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreateCollector = (
    collector: Omit<Collector, "id" | "enrollmentDate" | "password">,
  ) => {
    const newCollector: Collector = {
      ...collector,
      id: Math.random().toString(36).substr(2, 9),
      enrollmentDate: new Date(),
      password: Math.random().toString(36).substr(2, 8), // This would be replaced with proper password generation
    };
    setCollectors([...collectors, newCollector]);
    setIsCreateOpen(false);
    // Here you would implement SMS/email notification with the password
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Collector Onboarding
          </h2>
          <p className="text-muted-foreground">
            Register new collectors and manage their information
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Collector
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>ID Number</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Enrollment Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collectors.map((collector) => (
              <TableRow key={collector.id}>
                <TableCell>
                  {collector.firstName} {collector.secondName}{" "}
                  {collector.thirdName}
                </TableCell>
                <TableCell>{collector.idNumber}</TableCell>
                <TableCell>{collector.phoneNumber}</TableCell>
                <TableCell>{collector.email || "N/A"}</TableCell>
                <TableCell>
                  {collector.enrollmentDate.toLocaleDateString()}
                </TableCell>
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

      <CreateCollectorDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreateCollector}
      />
    </div>
  );
}
