"use client";
import { Suspense, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RolesTable() {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoles() {
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
    }

    fetchRoles();
  }, []);

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map(
            (role: { id: number; name: string; permissions: string[] }) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  {role.permissions.length > 0
                    ? role.permissions.join(", ")
                    : "No permissions"}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Suspense>
  );
}
