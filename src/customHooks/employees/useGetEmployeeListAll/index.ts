import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import EmployeeService from '../../../service/employee.service';

export function useGetEmployeeListAll() {
  return useQuery({
    queryKey: [QUERY_KEYS.EMPLOYEE_LIST_ALL],
    queryFn: () => EmployeeService.getAllEmployees(),
  });
}
