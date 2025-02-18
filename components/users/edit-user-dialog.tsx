"use client";

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Role, UserRole, UserStatus } from "@/types/roles";
import { User } from "@/types/users";
import { getRoles } from "@/core/roles/api";

interface EditUserDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (user: User) => void;
}

export function EditUserDialog({
  user,
  open,
  onOpenChange,
  onSubmit,
}: EditUserDialogProps) {
  const [formData, setFormData] = useState<User>(user);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>(user.roles);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await getRoles();
      setRoles(response);
    };
    fetchData();
  }, []);

  const handleChange = (
    field: keyof User,
    value: string | Role[] | UserStatus,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      onSubmit({ ...formData, roles: selectedRoles });
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasChanges =
    Object.entries(formData).some(
      ([key, value]) => value !== user[key as keyof User],
    ) || selectedRoles[0].name !== user.roles[0].name;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information. Fill in all required fields.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter user name"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email address"
                required
                disabled={true}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roles">Roles</Label>
              <Select
                value={selectedRoles[0].name}
                onValueChange={(roleName) => {
                  setSelectedRoles([
                    roles.find((role) => role.name === roleName) as Role,
                  ]);
                }}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>

                <SelectContent>
                  {roles.map((role) => (
                    <>
                      <SelectItem value={role.name}>
                        {role.name
                          .split("_")
                          .map(
                            (name) =>
                              name[0].toUpperCase() +
                              name.toLowerCase().slice(1),
                          )
                          .join(" ")}
                      </SelectItem>
                    </>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: UserStatus) =>
                  handleChange("status", value)
                }
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting || !hasChanges}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
