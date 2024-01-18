import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import AttendanceService from '../../../service/attendance.service';
import { PaginationQueryParams } from '../../../types';
import { IEmployee } from '../../../types/employee.type';

export function useGetSingleEmployeeAttendanceList({
  employeeId,
  page,
  limit,
  sorts,
}: PaginationQueryParams & { employeeId: IEmployee['id'] | null }) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.SINGLE_EMPLOYEE_ATTENDANCE_LIST, page, limit],
    queryFn: () =>
      AttendanceService.getSingleEmployeeAttendances({
        id: employeeId,
        page,
        limit,
        sorts,
      }),
    enabled: !!employeeId,
  });
  return {
    ...query,
    isLoading: query.isLoading && !!employeeId,
  };
}
