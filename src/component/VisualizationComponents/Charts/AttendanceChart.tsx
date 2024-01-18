import React from 'react';
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

import { utils } from '../../../helpers/utility';
import { IAttendance } from '../../../types';
import Loading from '../../Resuables/Loader';

interface AttendanceChartProps {
  data: IAttendance[] | null;
  isLoading: boolean;
  error: unknown;
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ data, isLoading, error }) => {
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>An error occured.</p>;
  }

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative"
      id="attendance_marking_user"
    >
      <p className="font-bold pb-3">Last 7 days marking</p>
      {/* No attendance given */}
      {data && data.length === 0 && (
        <p className="text-danger font-bold ml-2 absolute">You have no marks to show!</p>
      )}
      {/* Attendance given but no attendance is marked */}
      {data && data.length > 0 && !data.find((item) => item.markings) && (
        <p className="text-danger font-bold ml-2 absolute">
          Your attendance is not marked yet!
        </p>
      )}
      <ResponsiveContainer height={400}>
        <LineChart
          data={data ? utils.formatAttendanceChartData(data) : []}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="mark"
            stroke="#F57B1C90"
            strokeOpacity={20}
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
