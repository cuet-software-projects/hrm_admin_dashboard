import { Divider } from 'antd';

import AttendanceOverviewChart from '../../VisualizationComponents/Charts/AttendanceOverviewChart';
import PayrollChartForAdmin from '../../VisualizationComponents/Charts/PayrollChartForAdmin';
import EmployeesInLeave from './EmployeesInLeave';

const AdminDashboard = () => {
  return (
    <div className="bg-white-1 px-4 lg:px-8 py-8 rounded-lg shadow mb-5">
      <div className="flex flex-col md:flex-row items-start justify-center md:space-x-20 md:justify-between space-y-5 md:space-y-0 min-h-[450px]">
        <div className="bg-danger-50 rounded-lg w-full md:w-full py-5">
          <PayrollChartForAdmin />
        </div>
      </div>
      <Divider />
      <div className="flex flex-col md:flex-row items-start justify-center md:space-x-10 md:justify-between space-y-5 md:space-y-0">
        <div className="w-full md:w-1/2 lg:w-2/3">
          <div className="py-5 bg-green-1 bg-opacity-10 rounded-lg">
            <AttendanceOverviewChart />
          </div>
        </div>
        <div className="w-full md-w-1/2 lg:w-1/3">
          <EmployeesInLeave />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
