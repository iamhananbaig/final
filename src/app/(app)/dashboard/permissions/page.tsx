import { CreatePermission } from "./_components/createpermissionmodal";
import PermissionsTable from "./_components/permissionstable";

export default function Page() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Permissions</h1>
      <CreatePermission />
      <PermissionsTable />
    </div>
  );
}
