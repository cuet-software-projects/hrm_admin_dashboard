import { useGetPayrollOfEmployee } from '../../../../customHooks/payrolls/useGetPayrollOfEmployee';
import useAuthStore from '../../../../store/authStore';
import NotAnEmployee from '../../../Resuables/NotAnEmployee';
import PayrollChartForEmployee from '../../../VisualizationComponents/Charts/PayrollChartForEmployee';
import PayrollSummaryTable from '../../../VisualizationComponents/Tables/PayrollSummaryTable';

const PayrollInfoForUser = () => {
  const { userProfileData } = useAuthStore();
  const { data: payrollData, ...rest } = useGetPayrollOfEmployee({
    employeeId: userProfileData?.current_employee_id ?? '',
    limit: 5,
    page: 1,
    filters: { status: ['SENT'] },
    sorts: '',
    search: '',
    includes: '',
  });

  if (!userProfileData?.current_employee_id) {
    return <NotAnEmployee />;
  }

  return (
    <div>
      <PayrollChartForEmployee />
      <p className="py-5 text-xl font-bold">Payroll Summary Table</p>
      {payrollData?.data && (
        <PayrollSummaryTable
          data={payrollData.data}
          isLoading={rest.isLoading}
          error={rest.error}
        />
      )}
    </div>
  );
};

export default PayrollInfoForUser;
