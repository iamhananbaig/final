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

export default function PermissionsTable() {
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPermissions() {
      try {
        const response = await fetch("/api/permissions");
        const data = await response.json();

        if (response.ok) {
          setPermissions(data);
        } else {
          setError(data.error || "Failed to fetch permissions");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    }

    fetchPermissions();
  }, []);

  return (
    <Suspense fallback={<div>Content is Loading...</div>}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map(
            (permission: { id: number; name: string; description: string }) => (
              <TableRow key={permission.id}>
                <TableCell>{permission.name}</TableCell>
                <TableCell>{permission.description}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Suspense>
  );
}
