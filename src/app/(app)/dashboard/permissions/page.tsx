import { CreatePermission } from "./_components/createpermissionmodal";
import PermissionsPage from "./_components/permissionspage";

export default function page() {
  return (
    <>
      <CreatePermission />
      <PermissionsPage />
    </>
  );
}
