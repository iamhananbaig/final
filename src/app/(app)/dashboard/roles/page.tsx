import { CreateRole } from "./_components/createrolemodal";
import RolesTable from "./_components/rolestable";

export default function Page() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Roles</h1>
      <CreateRole />
      <RolesTable />
    </div>
  );
}
