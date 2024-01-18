import '../style.css';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import React, { useEffect } from 'react';

import { totalPaidLeaves } from '../../../constants/GlobalConstants';
import { useGetLeavesOverallOfAnEmployee } from '../../../customHooks/leaves/useGetLeavesOverallOfAnEmployee';
import Loading from '../../Resuables/Loader';
import LeaveCard from '../LeaveCard';

const LeaveInfo = ({
  employeeId,
  setRemainingLeaves,
}: {
  employeeId: string;
  setRemainingLeaves: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { data, isLoading, error } = useGetLeavesOverallOfAnEmployee({
    employeeId: employeeId,
  });
  if (isLoading) {
    <Loading />;
  }
  if (error) {
    <p>An error occured during loading the leave infos.</p>;
  }

  let totalSickLeaves = 0;
  let totalCasualLeaves = 0;
  let totalApprovedLeaves = 0;
  let remainingLeaves = 0;

  if (data) {
    totalSickLeaves = data.SICK;
    totalCasualLeaves = data.CASUAL;
    totalApprovedLeaves = totalCasualLeaves + totalSickLeaves;
    remainingLeaves = totalPaidLeaves - totalApprovedLeaves;
  }

  useEffect(() => {
    setRemainingLeaves(remainingLeaves);
  }, [data]);

  return (
    <div>
      <div className="w-full lg:flex lg:space-x-4 lg:justify-between lg:px-none lg:justify-none">
        <div className="hidden w-full lg:flex lg:space-x-4 lg:justify-between lg:px-none lg:justify-none">
          <LeaveCard title={'Sick Leaves'} days={totalSickLeaves} />
          <LeaveCard title={'Casual Leaves'} days={totalCasualLeaves} />
          <LeaveCard title={'Approved Leaves'} days={totalApprovedLeaves} />
          <LeaveCard title={'Remaining Leaves'} days={remainingLeaves} />
        </div>
        <div className="lg:hidden w-full">
          <Carousel
            dots={false}
            arrows={true}
            prevArrow={<LeftOutlined rev={''} />}
            nextArrow={<RightOutlined rev={''} />}
          >
            <LeaveCard title={'Sick Leaves'} days={totalSickLeaves} />
            <LeaveCard title={'Casual Leaves'} days={totalCasualLeaves} />
            <LeaveCard title={'Approved Leaves'} days={totalApprovedLeaves} />
            <LeaveCard title={'Remaining Leaves'} days={remainingLeaves} />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default LeaveInfo;
