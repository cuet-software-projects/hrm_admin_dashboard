import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import DepartmentService from '../../../service/department.service';

export function useDepartmentListAll() {
  return useQuery({
    queryKey: [QUERY_KEYS.DEPARTMENT_LIST_ALL],
    queryFn: () => DepartmentService.getAllDepartments(),
  });
}
