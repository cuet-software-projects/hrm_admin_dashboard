import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import AttendanceService from '../../../service/attendance.service';

const useGetAttendanceOverview = ({ date }: { date: Date }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ATTENDANCE_OVERVIEW, date],
    queryFn: () => AttendanceService.getAttendanceOverview({ date: date }),
  });
};

export default useGetAttendanceOverview;
