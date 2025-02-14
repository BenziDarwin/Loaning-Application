"use client";

import { use, useEffect, useState } from "react";
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
import { CreateUserDialog } from "@/components/users/create-user-dialog";
import { EditUserDialog } from "@/components/users/edit-user-dialog";
import { DeleteConfirmDialog } from "@/components/users/delete-confirm-dialog";
import { deleteUser, getUsers, updateUser } from "@/core/user/api";
import { User } from "@/types/users";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleCreateUser = (user: Omit<User, "id">) => {
    const newUser = {
      ...user,
      id: 0,
    };
    setUsers([...users, newUser]);
    setIsCreateOpen(false);
  };

  const handleEditUser = async (updatedUser: User) => {
    try {
      // Update the user on the server
      await updateUser(updatedUser.id, updatedUser);
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
      );
      setIsEditOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      if (selectedUser) {
        // Delete the user from the server
        await deleteUser(selectedUser.id);
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        setIsDeleteOpen(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  useEffect(() => {
    // Fetch users from the server
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        console.log(response);
        setUsers(response);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.roles[0].name}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsEditOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedUser(user);
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

      <CreateUserDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreateUser}
      />

      {selectedUser && (
        <EditUserDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          user={selectedUser}
          onSubmit={handleEditUser}
        />
      )}

      {selectedUser && (
        <DeleteConfirmDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          onConfirm={handleDeleteUser}
          userName={selectedUser.name}
        />
      )}
    </div>
  );
}
