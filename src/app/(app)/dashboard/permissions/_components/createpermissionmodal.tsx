"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export async function addPermission(data: {
  name: string;
  description: string;
}) {
  try {
    const response = await fetch("/api/permissions/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "An unexpected error occurred.");
    }

    return { success: true };
  } catch (error) {
    console.error("Error adding permission:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    };
  }
}

// Define schema
const schema = z.object({
  name: z.string().min(3, "Permission name must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Permission description must be at least 3 characters long"),
});

// Define form type
type PermissionFormData = z.infer<typeof schema>;

export function CreatePermission() {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PermissionFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<PermissionFormData> = async (data) => {
    setError(null);
    setSuccess(null);

    const res = await addPermission({ ...data });

    if (res?.error) {
      setError(
        typeof res.error === "string"
          ? res.error
          : "An unexpected error occurred."
      );
    } else {
      setSuccess("Permission created successfully!");
      reset();
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="w-fit" asChild>
        <Button variant="default">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Permission</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Permission Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter permission name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="description">Permission Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter permission Description"
              className="h-20 resize-none"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit">Create</Button>
        </form>
        {success && <p className="text-green-500 mt-2">{success}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </DialogContent>
    </Dialog>
  );
}
