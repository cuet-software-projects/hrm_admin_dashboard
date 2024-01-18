import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import AttendanceService from '../../../service/attendance.service';

export function useGetAttendanceListAll() {
  return useQuery({
    queryKey: [QUERY_KEYS.ATTENDANCE_LIST_ALL],
    queryFn: () => AttendanceService.getAllAttendances(),
  });
}
