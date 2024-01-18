import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import RoleService from '../../../service/roles.service';

export function useGetRoleListAll() {
  return useQuery({
    queryKey: [QUERY_KEYS.ROLE_LIST_ALL],
    queryFn: () => RoleService.getAllRoles(),
  });
}
