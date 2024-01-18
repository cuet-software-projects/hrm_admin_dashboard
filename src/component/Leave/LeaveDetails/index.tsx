import dayjs from 'dayjs';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useLeaveDetails } from '../../../customHooks/leaves/useGetLeaveDetails';
import Button from '../../Resuables/Button/Button';
import Loading from '../../Resuables/Loader';
import LeaveDetailsContainer from './LeaveDetailsContainer';

export default function LeaveDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const leaveId = searchParams.get('leaveId');
  const { data, isLoading, error } = useLeaveDetails({ leaveId: leaveId });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>An error occurred.</p>;
  }

  return (
    <div className="mb-8 flex justify-center">
      <LeaveDetailsContainer>
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-10  bg-white-1 p-4 rounded-xl shadow-sm border-[1px] border-grey-1 border-opacity-10">
            <p className="font-semibold w-40">Employee Name:</p>
            <p className="font-normal">
              {`${data?.employee_info?.user?.first_name} ${data?.employee_info?.user?.last_name}`}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-10  bg-white-1 p-4 rounded-xl shadow-sm border-[1px] border-grey-1 border-opacity-10">
            <p className="font-semibold w-40">Leave Start Time:</p>
            <p className="font-normal">{dayjs(data?.started_at).format('DD-MM-YYYY')}</p>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-10 bg-white-1 p-4 rounded-xl shadow-sm border-[1px] border-grey-1 border-opacity-10">
            <p className="font-semibold w-40">Leave End Time:</p>
            <p className="font-normal">{dayjs(data?.ended_at).format('DD-MM-YYYY')}</p>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-10 bg-white-1 p-4 rounded-xl shadow-sm border-[1px] border-grey-1 border-opacity-10">
            <p className="font-semibold w-40">Leave Type:</p>
            <p className="font-normal">{data?.leave_type}</p>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-10 bg-white-1 p-4 rounded-xl shadow-sm border-[1px] border-grey-1 border-opacity-10">
            <p className="font-semibold w-40">Leave Status:</p>
            <p className="font-normal">{data?.leave_status}</p>
          </div>
          {data?.leave_status && (
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-10 bg-white-1 p-4 rounded-xl shadow-sm border-[1px] border-grey-1 border-opacity-10">
              <p className="font-semibold w-40 capitalize">
                {data?.leave_status.toLowerCase()} by:
              </p>
              <p className="font-normal">{data?.action_taken_by?.user?.userName}</p>
            </div>
          )}
          <div className="bg-white-1 p-4 rounded-xl space-y-8 shadow-sm border-[1px] border-grey-1 border-opacity-10">
            <p className="font-semibold w-40 ">Leave Application:</p>
            <p className="font-normal">{data?.description}</p>
          </div>
          <Button
            block
            className="flex justify-center items-center"
            size={'large'}
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </Button>
        </div>
      </LeaveDetailsContainer>
    </div>
  );
}
