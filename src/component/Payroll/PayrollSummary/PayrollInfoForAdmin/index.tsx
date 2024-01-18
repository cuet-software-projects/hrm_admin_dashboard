import { useGetPayrollOfAllEmployees } from '../../../../customHooks/payrolls/useGetPayrollOfAllEmployee';
import PayrollChartForAdmin from '../../../VisualizationComponents/Charts/PayrollChartForAdmin';
import PayrollSummaryTable from '../../../VisualizationComponents/Tables/PayrollSummaryTable';

const PayrollInfoForAdmin = () => {
  const { data: payrollData, ...rest } = useGetPayrollOfAllEmployees({
    page: 1,
    limit: 5,
  });
  return (
    <div>
      <div className="bg-danger-50 rounded-lg w-full py-5">
        <PayrollChartForAdmin />
      </div>
      <div className="mt-5">
        <p className="py-5 text-xl font-bold">Payroll Summary Table</p>
        {payrollData?.data && (
          <PayrollSummaryTable
            data={payrollData.data}
            isLoading={rest.isLoading}
            error={rest.error}
          />
        )}
      </div>
    </div>
  );
};

export default PayrollInfoForAdmin;
