import dayjs from 'dayjs';
import React, { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import useGetAttendanceOverview from '../../../customHooks/attendances/useGetAttendanceOverview';
import CustomDatePicker from '../../Resuables/CustomDatePicker';
import Loading from '../../Resuables/Loader';

const colors = ['#aac1e5', '#a3d5c2', '#ffd79f', '#ffb8a6'];

const labels: Record<string, string> = {
  totalEmployees: 'Total',
  totalEmployeesInLeave: 'In Leave',
  totalPresentEmployees: 'Present',
  totalAbsentEmployees: 'Absent',
};

const AttendanceOverviewChart: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | string | null>(
    dayjs().toDate(),
  );

  const { data, isLoading, error } = useGetAttendanceOverview({
    date: dayjs(selectedDate).toDate(),
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>An error occured.</p>;
  }
  if (!data) {
    return <p>No data available.</p>;
  }
  const dataEntries = Object.entries(data).map(([key, value], index) => ({
    fieldName: labels[key],
    fieldValue: value,
    color: colors[index],
  }));

  const formatXAxis = (tickItem: string) => labels[tickItem] || tickItem;

  return (
    <>
      <div className="flex flex-wrap justify-between items-center px-8 pb-3">
        <p className="font-bold text-center">Attendance Overview</p>
        <CustomDatePicker
          selectedDate={selectedDate}
          onChangeDate={(date: Date) => {
            setSelectedDate(date);
          }}
        />
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={dataEntries}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fieldName" tickFormatter={formatXAxis} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="fieldValue" fill="#8884d8" radius={[10, 10, 0, 0]} barSize={50}>
            <LabelList dataKey="fieldValue" position="top" fill="#454545" />
            {dataEntries.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default AttendanceOverviewChart;
