"use client";
import { Suspense, useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditRolePermissionsForm } from "./EditRolePermissionsForm";

export default function RolesTable() {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRoles = useCallback(async () => {
    try {
      const response = await fetch("/api/roles");
      const data = await response.json();

      if (response.ok) {
        setRoles(data);
      } else {
        setError(data.error || "Failed to fetch roles");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  if (loading) {
    return <div>Loading roles...</div>;
  }

  if (error) {
    return <div className="text-red-500 font-semibold">{error}</div>;
  }

  if (roles.length === 0) {
    return <div>No roles available.</div>;
  }

  return (
    <Suspense fallback={<div>Content is Loading...</div>}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map(
            (role: {
              id: number;
              name: string;
              permissions: { permission: { name: string } }[];
            }) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  {role.permissions.map((p) => p.permission.name).join(", ")}
                </TableCell>
                <TableCell>
                  <EditRolePermissionsForm
                    roleId={role.id}
                    roleName={role.name}
                    onSuccessAction={fetchRoles}
                  />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Suspense>
  );
}
