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
import type { Member, Gender } from "@/types/members";

interface CreateMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
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
  ) => void;
}

const towns = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"];

export function CreateMemberDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateMemberDialogProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    thirdName: "",
    idNumber: "",
    dateOfBirth: "",
    gender: "" as Gender,
    town: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
    idFrontImage: "",
    idBackImage: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      dateOfBirth: new Date(formData.dateOfBirth),
      enrollmentDate: new Date(),
      collector: "Auto-assigned", // This would be determined based on town
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription>
            Enter member details to create a new account. Required fields are
            marked with *.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondName">Second Name *</Label>
              <Input
                id="secondName"
                value={formData.secondName}
                onChange={(e) =>
                  setFormData({ ...formData, secondName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thirdName">Third Name *</Label>
              <Input
                id="thirdName"
                value={formData.thirdName}
                onChange={(e) =>
                  setFormData({ ...formData, thirdName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idNumber">ID Number *</Label>
              <Input
                id="idNumber"
                value={formData.idNumber}
                onChange={(e) =>
                  setFormData({ ...formData, idNumber: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select
                value={formData.gender}
                onValueChange={(value: Gender) =>
                  setFormData({ ...formData, gender: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="town">Town *</Label>
              <Select
                value={formData.town}
                onValueChange={(value) =>
                  setFormData({ ...formData, town: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select town" />
                </SelectTrigger>
                <SelectContent>
                  {towns.map((town) => (
                    <SelectItem key={town} value={town}>
                      {town}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profilePicture">Profile Picture URL *</Label>
              <Input
                id="profilePicture"
                value={formData.profilePicture}
                onChange={(e) =>
                  setFormData({ ...formData, profilePicture: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idFrontImage">ID Front Image URL *</Label>
              <Input
                id="idFrontImage"
                value={formData.idFrontImage}
                onChange={(e) =>
                  setFormData({ ...formData, idFrontImage: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idBackImage">ID Back Image URL *</Label>
              <Input
                id="idBackImage"
                value={formData.idBackImage}
                onChange={(e) =>
                  setFormData({ ...formData, idBackImage: e.target.value })
                }
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
