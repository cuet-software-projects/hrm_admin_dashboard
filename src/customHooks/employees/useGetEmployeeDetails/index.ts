/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import EmployeeService from '../../../service/employee.service';
import { IEmployee } from '../../../types/employee.type';

export function useEmployeeDetails({
  employeeId,
}: {
  employeeId?: IEmployee['id'] | null;
}) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.EMPLOYEE_DETAILS, employeeId],
    queryFn: () => EmployeeService.getEmployeeDetails(employeeId!),
    enabled: !!employeeId,
  });
  return {
    ...query,
    isLoading: query.isLoading && !!employeeId,
  };
}
