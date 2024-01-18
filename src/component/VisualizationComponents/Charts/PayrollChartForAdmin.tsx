import { Space } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
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
import useGetPayrollOverviewForAdmin from '../../../customHooks/payrolls/useGetPayrollOverviewForAdmin';
import { BONUS_TYPE, PAYROLL_TYPE } from '../../../types';
import { IPayrollOverviewForAdmin } from '../../../types/payroll.type';
import { BONUS_VALUES, PAYROLL_VALUES } from '../../../types/values';
import CustomDatePicker from '../../Resuables/CustomDatePicker';
import Loading from '../../Resuables/Loader';
import Select from '../../Resuables/Select/Select';

const PayrollChartForAdmin = () => {
  const newData: IPayrollOverviewForAdmin[] = [];
  const [selectedDate, setSelectedDate] = useState<Date>(dayjs().toDate());
  const [payrollStatus, setPayrollStatus] = useState<PAYROLL_TYPE>(PAYROLL_VALUES[1]);
  const [bonusStatus, setBonusStatus] = useState<BONUS_TYPE>(BONUS_VALUES[1]);
  const { data, ...rest } = useGetPayrollOverviewForAdmin({
    date: selectedDate,
    payrollStatus,
    bonusStatus,
  });
  if (rest.isLoading) {
    return <Loading />;
  }
  if (rest.error) {
    return <p>An error occured!</p>;
  }

  if (data) {
    const currentMonthShortname: string = dayjs().format('MMM');

    shortMonthsForEconomicYear.map((shortMonthName, index) => {
      const monthlyData = data.find((item) => item.month === shortMonthName);
      if (monthlyData) {
        newData.push(monthlyData);
      } else {
        if (index < shortMonthsForEconomicYear.indexOf(currentMonthShortname)) {
          newData.push({
            month: shortMonthName,
            totalPayroll: 0,
            totalBonus: 0,
          });
        } else {
          newData.push({
            month: shortMonthName,
            totalPayroll: null,
            totalBonus: null,
          });
        }
      }
    });
  }

  return (
    <>
      <div className="flex flex-wrap justify-between items-center px-4 lg:px-8 pb-3">
        <p className="font-bold text-center">Payroll Summary</p>
        <Space wrap classNames={{ item: 'px-1 w-[130px]' }}>
          <CustomDatePicker
            selectedDate={selectedDate}
            placeholderText="2023"
            dateFormat="yyyy"
            onChangeDate={(date: Date) => {
              setSelectedDate(date);
            }}
          />
          <div className="flex flex-col">
            <label>Payroll Status</label>
            <Select
              className="bg-white-1 bg-opacity-100 text-black-1"
              options={PAYROLL_VALUES.map((item) => ({
                label: item,
                value: item,
              }))}
              value={payrollStatus}
              onChange={(value: string) => setPayrollStatus(value as PAYROLL_TYPE)}
            />
          </div>
          <div className="flex flex-col">
            <label>Bonus Status</label>
            <Select
              className="bg-white-1 bg-opacity-100 text-black-1"
              options={BONUS_VALUES.map((item) => ({
                label: item,
                value: item,
              }))}
              value={bonusStatus}
              onChange={(value: string) => setBonusStatus(value as BONUS_TYPE)}
            />
          </div>
        </Space>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={newData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="totalPayroll"
            name="Payroll"
            stroke="#CB3C2390"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="totalBonus"
            name="Bonus"
            stroke="#82ca9d"
            strokeWidth={5}
          />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default PayrollChartForAdmin;
