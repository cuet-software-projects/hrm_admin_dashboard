import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/app-constants';
import PayrollService from '../../service/salary.service';
import { PayrollOverviewAdminReqBody } from '../../types/payroll.type';

export default function useGetPayrollOverviewForEmployee({
  employeeId,
  date,
  payrollStatus,
  bonusStatus,
}: { employeeId: string } & PayrollOverviewAdminReqBody) {
  return useQuery({
    queryKey: [QUERY_KEYS.PAYROLL_OVERVIEW, employeeId, date, payrollStatus, bonusStatus],
    queryFn: () =>
      PayrollService.getPayrollOverviewForEmployee({
        employeeId,
        date,
        payrollStatus,
        bonusStatus,
      }),
  });
}
