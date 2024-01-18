import React from 'react';

import { newDatesLast } from '../../../constants/api';
import { useGetSingleEmployeeAttendanceList } from '../../../customHooks/attendances/useGetSingleEmployeeAttendanceList';
import { utils } from '../../../helpers/utility';
import useAuthStore from '../../../store/authStore';
import AttendanceChart from '../../VisualizationComponents/Charts/AttendanceChart';
import PayrollChartForEmployee from '../../VisualizationComponents/Charts/PayrollChartForEmployee';
import UserBirthdayEvent from './UserBirthdayEvent';
import UserMarkingStatusMsg from './UserMarkingStatusMsg';
import WelcomeMsg from './WelcomeMsg';

const UserDashboard: React.FC = () => {
  const { userProfileData } = useAuthStore();
  const {
    data: attendanceData,
    isLoading: isAttendanceDataLoading,
    error: attendanceError,
  } = useGetSingleEmployeeAttendanceList({
    employeeId: userProfileData?.current_employee_id ?? '',
    page: 1,
    limit: 7,
    sorts: newDatesLast,
  });

  return (
    <>
      <UserBirthdayEvent />
      <div className="bg-white-1 px-4 lg:px-8 py-8 rounded-lg shadow mb-5 overflow-auto">
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-20 md:justify-between space-y-5 md:space-y-0 mt-5">
          <div className="flex flex-col justify-between w-full md:w-1/2 mb-10 md:mb-0">
            {/* welcoming message */}
            <WelcomeMsg
              userName={`${userProfileData?.first_name} ${userProfileData?.last_name}`}
            />
            <br />
            {/* Status based on marking */}
            {attendanceData && attendanceData.data && (
              <UserMarkingStatusMsg
                averageMark={utils.calculateAvgMark({
                  attendanceData: attendanceData.data,
                })}
              />
            )}
          </div>

          {/* Related to attendance marking */}
          <div className="min-h-[410px] flex items-center justify-center bg-danger-50 rounded-lg w-full md:w-1/2 py-5">
            <AttendanceChart
              isLoading={isAttendanceDataLoading}
              error={attendanceError}
              data={attendanceData ? attendanceData.data : null}
            />
          </div>
        </div>
      </div>
      {/* Related to Payroll summary and income related content */}
      <div className="bg-white-1 px-4 lg:px-8 py-8 rounded-lg shadow mb-5 overflow-auto">
        <div>
          <PayrollChartForEmployee />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
