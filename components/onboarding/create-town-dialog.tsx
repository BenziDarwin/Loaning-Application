"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Town } from "@/types/members";

interface CreateTownDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    town: Omit<Town, "id" | "collectorPhone" | "loanPortfolio">,
  ) => void;
}

const collectors = [
  { id: "1", name: "John Doe", phone: "+254 712 345 678" },
  { id: "2", name: "Jane Smith", phone: "+254 723 456 789" },
  { id: "3", name: "Mike Johnson", phone: "+254 734 567 890" },
];

export function CreateTownDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateTownDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    enrollmentDate: "",
    collector: "",
    profilePicture: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      enrollmentDate: new Date(formData.enrollmentDate),
    });
    setFormData({
      name: "",
      nickname: "",
      enrollmentDate: "",
      collector: "",
      profilePicture: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Town</DialogTitle>
          <DialogDescription>
            Enter town details to create a new record. Required fields are
            marked with *.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Town Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                value={formData.nickname}
                onChange={(e) =>
                  setFormData({ ...formData, nickname: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enrollmentDate">Enrollment Date *</Label>
              <Input
                id="enrollmentDate"
                type="date"
                value={formData.enrollmentDate}
                onChange={(e) =>
                  setFormData({ ...formData, enrollmentDate: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collector">Collector *</Label>
              <Select
                value={formData.collector}
                onValueChange={(value) =>
                  setFormData({ ...formData, collector: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select collector" />
                </SelectTrigger>
                <SelectContent>
                  {collectors.map((collector) => (
                    <SelectItem key={collector.id} value={collector.name}>
                      {collector.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profilePicture">Profile Picture URL</Label>
              <Input
                id="profilePicture"
                value={formData.profilePicture}
                onChange={(e) =>
                  setFormData({ ...formData, profilePicture: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Town</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
