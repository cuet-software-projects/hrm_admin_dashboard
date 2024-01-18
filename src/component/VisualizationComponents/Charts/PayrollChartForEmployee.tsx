import dayjs from 'dayjs';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { shortMonthsForEconomicYear } from '../../../constants/GlobalConstants';
import useGetPayrollOverviewForEmployee from '../../../customHooks/payrolls/useGetPayrollOverviewForEmployee';
import useAuthStore from '../../../store/authStore';
import { monthWiseAmountType } from '../../../types/payroll.type';
import LifetimeIncomeInfo from '../../Dashboard/UserDashboard/IncomeInfo';
import CustomDatePicker from '../../Resuables/CustomDatePicker';
import Loading from '../../Resuables/Loader';

const PayrollChartForEmployee = () => {
  const { userProfileData } = useAuthStore();
  const { pathname } = useLocation();
  const [selectedDate, setSelectedDate] = useState<Date>(dayjs().toDate());
  const { data, ...rest } = useGetPayrollOverviewForEmployee({
    employeeId: `${userProfileData?.current_employee_id}`,
    date: selectedDate,
    payrollStatus: 'SENT',
    bonusStatus: 'SENT',
  });

  if (data && data.monthWiseAmountList) {
    const newMonthWiseData: monthWiseAmountType[] = [];
    const currentMonthShortname: string = dayjs().format('MMM');

    shortMonthsForEconomicYear.map((shortMonthName, index) => {
      const monthlyData = data.monthWiseAmountList.find(
        (item) => item.month === shortMonthName,
      );
      if (monthlyData) {
        newMonthWiseData.push(monthlyData);
      } else {
        if (index < shortMonthsForEconomicYear.indexOf(currentMonthShortname)) {
          newMonthWiseData.push({
            month: shortMonthName,
            payroll: 0,
            bonus: 0,
          });
        } else {
          newMonthWiseData.push({
            month: shortMonthName,
            payroll: null,
            bonus: null,
          });
        }
      }
    });
    data.monthWiseAmountList = newMonthWiseData;
  }

  return (
    <>
      <div
        className="flex flex-wrap flex-col-reverse md:flex-row"
        id="payroll_chart_employee"
      >
        <div className="bg-danger-50 flex-1 rounded-lg w-full md:w-1/2 lg:w-2/3 py-5">
          {rest.isLoading && (
            <div className="w-full h-full">
              <Loading />
            </div>
          )}
          {rest.isError && (
            <p className="w-full h-full flex justify-center items-center">
              An error occurred
            </p>
          )}
          {!rest.isLoading && !rest.isError && (
            <>
              <div className="flex flex-wrap justify-between items-center px-4 lg:px-8 pb-3">
                <p className="font-bold text-center">Payroll Summary</p>
                <div className="flex justify-start md:justify-between items-center flex-wrap space-x-2 md:space-x-5">
                  <div className="flex flex-col items-center rounded-md text-black-1">
                    <CustomDatePicker
                      selectedDate={selectedDate}
                      placeholderText="2023"
                      dateFormat="yyyy"
                      onChangeDate={(date: Date) => {
                        setSelectedDate(date);
                      }}
                    />
                  </div>
                </div>
              </div>
              <ResponsiveContainer
                width="100%"
                height={400}
                id="payroll_summary_employee"
              >
                <LineChart data={data?.monthWiseAmountList}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="payroll"
                    name="Payroll"
                    stroke="#CB3C2390"
                    strokeWidth={5}
                  />
                  <Line
                    type="monotone"
                    dataKey="bonus"
                    name="Bonus"
                    stroke="#82ca9d"
                    strokeWidth={5}
                  />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </>
          )}
        </div>
        {pathname.includes('dashboar') && (
          <div className="md:pl-3 rounded-lg w-full md:w-1/2 lg:w-1/3 pb-5 md:pb-0">
            <LifetimeIncomeInfo
              lifeTimeIncome={data?.lifeTimeIncome}
              lifeTimeBonus={data?.lifeTimeBonus}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PayrollChartForEmployee;
