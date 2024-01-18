import { useGetRoleListAll } from '../../customHooks/roles/useGetRoleListAll';
import UserRoleListTable from '../VisualizationComponents/Tables/RoleTable/RoleListTableOfSingleUser';

const UserRoleList = () => {
  const { data: rolesData, isLoading, error } = useGetRoleListAll();

  return (
    <div>
      <UserRoleListTable data={rolesData} isLoading={isLoading} error={error} />
    </div>
  );
};

export default UserRoleList;
