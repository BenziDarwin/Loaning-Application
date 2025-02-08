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
import { CreateMemberDialog } from "@/components/onboarding/create-member-dialog";
import type { Member } from "@/types/members";

const initialMembers: Member[] = [];

export default function OnboardingMembersPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreateMember = (
    member: Omit<
      Member,
      | "id"
      | "status"
      | "blacklistHistory"
      | "loanHistory"
      | "grossLent"
      | "netProfit"
      | "totalCycle"
      | "clientValue"
    >,
  ) => {
    const newMember: Member = {
      ...member,
      id: Math.random().toString(36).substr(2, 9),
      status: "dormant",
      blacklistHistory: [],
      loanHistory: [],
      grossLent: 0,
      netProfit: 0,
      totalCycle: 0,
      clientValue: 1,
    };
    setMembers([...members, newMember]);
    setIsCreateOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Member Onboarding
          </h2>
          <p className="text-muted-foreground">
            Register new members and manage their information
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Collector</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  {member.firstName} {member.secondName} {member.thirdName}
                </TableCell>
                <TableCell>{member.region}</TableCell>
                <TableCell>{member.phoneNumber}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.status === "active"
                        ? "bg-green-100 text-green-800"
                        : member.status === "dormant"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {member.status}
                  </span>
                </TableCell>
                <TableCell>{member.collector}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View Profile
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateMemberDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreateMember}
      />
    </div>
  );
}
