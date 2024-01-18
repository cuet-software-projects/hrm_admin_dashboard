import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import RoleService from '../../../service/roles.service';
import { PaginationQueryParams } from '../../../types';

export function useGetRoleList({ page, limit }: PaginationQueryParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.ROLE_LISTS, page, limit],
    queryFn: () => RoleService.getRoles({ page, limit }),
  });
}
