/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import AttendanceService from '../../../service/attendance.service';
import { IAttendance } from '../../../types';

export function useAttendanceDetails({
  attendanceId,
}: {
  attendanceId?: IAttendance['id'] | null;
}) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.ATTENDANCE_DETAILS, attendanceId],
    queryFn: () => AttendanceService.getAttendanceDetails(attendanceId!),
    enabled: !!attendanceId,
  });
  return {
    ...query,
    isLoading: query.isLoading && !!attendanceId,
  };
}
