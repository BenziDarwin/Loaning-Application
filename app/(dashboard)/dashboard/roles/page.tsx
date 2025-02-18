"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateRoleDialog } from "@/components/roles/create-role-dialog";
import { EditRoleDialog } from "@/components/roles/edit-role-dialog";
import { DeleteConfirmDialog } from "@/components/roles/delete-confirm-dialog";
import { createRole, deleteRole, getRoles, updateRole } from "@/core/roles/api";
import { Role } from "@/types/roles";

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleCreateRole = async (role: Role) => {
    try {
      await createRole(role);
      const newRole = {
        ...role,
      };
      setRoles([...roles, newRole]);
      setIsCreateOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = await getRoles();
      setRoles(response);
    };
    fetchData();
  }, []);

  const handleEditRole = async (updatedRole: Role) => {
    try {
      // Update role in the backend
      await updateRole(updatedRole.id!, updatedRole);
      setRoles(
        roles.map((role) => (role.id === updatedRole.id ? updatedRole : role)),
      );
      setIsEditOpen(false);
      setSelectedRole(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRole = async () => {
    if (selectedRole) {
      try {
        // Delete role in the backend
        await deleteRole(selectedRole.id!);
        setRoles(roles.filter((role) => role.id !== selectedRole.id));
        setIsDeleteOpen(false);
        setSelectedRole(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Roles</h2>
          <p className="text-muted-foreground">Manage roles and permissions</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Role
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission.id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {permission.name}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedRole(role);
                      setIsEditOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedRole(role);
                      setIsDeleteOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateRoleDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreateRole}
      />

      {selectedRole && (
        <EditRoleDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          role={selectedRole}
          onSubmit={handleEditRole}
        />
      )}

      {selectedRole && (
        <DeleteConfirmDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          onConfirm={handleDeleteRole}
          roleName={selectedRole.name}
        />
      )}
    </div>
  );
}
