"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const FormSchema = z.object({
  permissions: z.array(z.number()).refine((value) => value.length > 0, {
    message: "You have to select at least one permission.",
  }),
});

interface Permission {
  id: number;
  name: string;
}

interface EditRoleProps {
  roleId: number;
  roleName: string;
  onSuccessAction: () => void;
}

export function EditRolePermissionsForm({
  roleId,
  roleName,
  onSuccessAction,
}: EditRoleProps) {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      permissions: [],
    },
  });

  useEffect(() => {
    if (!roleId || !isDialogOpen) return;

    const fetchPermissions = async () => {
      try {
        const [permissionsRes, roleRes] = await Promise.all([
          axios.get("/api/permissions"),
          axios.get(`/api/roles/edit/${roleId}`),
        ]);

        const allPermissions = permissionsRes.data;
        const rolePermissions = roleRes.data.permissions.map(
          (perm: Permission) => perm.id
        );

        setPermissions(allPermissions);
        form.setValue("permissions", rolePermissions);
      } catch (error) {
        toast({
          title: "Error fetching permissions",
          description: "An error occurred while loading permissions.",
        });
      }
    };

    fetchPermissions();
  }, [roleId, isDialogOpen, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await axios.put(`/api/roles/update/${roleId}`, {
        permissions: data.permissions,
      });
      toast({
        title: "Role updated successfully",
        description: "Permissions have been updated.",
      });
      setIsDialogOpen(false);
      onSuccessAction();
    } catch (error) {
      toast({
        title: "Error updating role",
        description: "An error occurred while updating the role.",
      });
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Permissions for {roleName}</DialogTitle>
          <DialogDescription>
            Adjust the permissions for this role. Changes will take effect
            immediately.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="permissions"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Permissions</FormLabel>
                    <FormDescription>
                      Select the permissions to assign to this role.
                    </FormDescription>
                  </div>
                  {permissions.map((permission) => (
                    <FormField
                      key={permission.id}
                      control={form.control}
                      name="permissions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(permission.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([
                                    ...field.value,
                                    permission.id,
                                  ]);
                                } else {
                                  field.onChange(
                                    field.value.filter(
                                      (id) => id !== permission.id
                                    )
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {permission.name}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update Role</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
