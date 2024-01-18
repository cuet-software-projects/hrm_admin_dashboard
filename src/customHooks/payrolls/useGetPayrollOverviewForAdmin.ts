import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/app-constants';
import PayrollService from '../../service/salary.service';
import { PayrollOverviewAdminReqBody } from '../../types/payroll.type';

export default function useGetPayrollOverviewForAdmin({
  date,
  payrollStatus,
  bonusStatus,
}: PayrollOverviewAdminReqBody) {
  return useQuery({
    queryKey: [QUERY_KEYS.PAYROLL_OVERVIEW, date, payrollStatus, bonusStatus],
    queryFn: () =>
      PayrollService.getPayrollOverviewForAdmin({ date, payrollStatus, bonusStatus }),
  });
}
