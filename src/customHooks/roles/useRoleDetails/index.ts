/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import RoleService from '../../../service/roles.service';
import { IRole } from '../../../types/role.type';

export function useRoleDetails({ roleId }: { roleId?: IRole['id'] | null }) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.ROLE_DETAILS, roleId],
    queryFn: () => RoleService.getRoleDetails(roleId!),
    enabled: !!roleId,
  });
  return {
    ...query,
    isLoading: query.isLoading && !!roleId,
  };
}
