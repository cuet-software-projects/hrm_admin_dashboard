import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import DepartmentService from '../../../service/department.service';
import { PaginationQueryParams } from '../../../types';

export function useDepartmentLists({ page, limit }: PaginationQueryParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.DEPARTMENT_LISTS, page, limit],
    queryFn: () => DepartmentService.getDepartments({ page, limit }),
  });
}
