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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Role } from "@/types/roles";
import { Permission } from "@/types/permissions";
import { getPermissions } from "@/core/permissions/api";

interface EditRoleDialogProps {
  role: Role;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (role: Role) => void;
}

export function EditRoleDialog({
  role,
  open,
  onOpenChange,
  onSubmit,
}: EditRoleDialogProps) {
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description);
  const [availablePermissions, setAvailablePermissions] = useState<
    Permission[]
  >([]);
  const [permissions, setPermissions] = useState<Permission[]>(
    role.permissions,
  );

  useEffect(() => {
    setName(role.name);
    setDescription(role.description);
    setPermissions(role.permissions);
  }, [role]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await getPermissions();
      setAvailablePermissions(response);
    };
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: role.id,
      name,
      description,
      permissions,
    });
  };

  const togglePermission = (permission: Permission) => {
    setPermissions(
      permissions.includes(permission)
        ? permissions.filter((p) => p.name !== permission.name)
        : [...permissions, permission],
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Role</DialogTitle>
          <DialogDescription>
            Update role information and permissions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Role Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="space-y-2">
                {availablePermissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={permission.id!.toString()}
                      checked={permissions.some((p) => p.id === permission.id)}
                      onCheckedChange={() => togglePermission(permission)}
                    />
                    <label
                      htmlFor={permission.id.toString()}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {permission.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
