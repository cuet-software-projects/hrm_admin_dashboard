import { Divider, Pagination, PaginationProps } from 'antd';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';

import { newDatesFirst } from '../../../../constants/api';
import { useGetEmployeesInLeave } from '../../../../customHooks/leaves/useGetEmployeesInLeave';
import CustomDatePicker from '../../../Resuables/CustomDatePicker';
import Loading from '../../../Resuables/Loader';
import PictureOrAvatar from '../../../Resuables/PictureOrAvatar';

const PAGE_SIZE = 5;

const EmployeesInLeave = () => {
  const initialPageState: IPaginationProp = {
    limit: PAGE_SIZE,
    page: 1,
    filters: '',
    sorts: '',
  };
  const [queryParams, setQueryParams] = useState<IPaginationProp>(initialPageState);
  const [selectedDate, setSelectedDate] = useState<Date>(dayjs().toDate());

  const { data, isLoading, error } = useGetEmployeesInLeave({
    page: queryParams.page,
    limit: queryParams.limit,
    date: selectedDate,
    sorts: newDatesFirst,
  });

  const totalCount = useMemo(() => {
    return data?.meta?.totalItems || 0;
  }, [data?.meta]);

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setQueryParams({ ...queryParams, page: current + 1, limit: pageSize });
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>An error occured.</p>;
  }
  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-between items-center mb-5">
        <h2 className="text-lg font-bold">Employees in leave</h2>
        <CustomDatePicker
          selectedDate={selectedDate}
          onChangeDate={(date: Date) => {
            setSelectedDate(date);
          }}
        />
      </div>
      {data?.data.length === 0 && (
        <div className="text-lg font-bold text-blue text-opacity-80">
          All team members are present! No employees are on leave today. 🎉
        </div>
      )}
      {data?.data.map((leaveItem) => {
        return (
          <React.Fragment key={leaveItem.id}>
            <div key={leaveItem.id} className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {leaveItem?.employee_info?.user && (
                  <PictureOrAvatar userData={{ user: leaveItem.employee_info.user }} />
                )}
                <div>
                  <span className="text-lg">
                    {`${leaveItem.employee_info?.user?.first_name} ${leaveItem.employee_info?.user?.last_name}`}
                  </span>
                  <br />
                  <span className="capitalize text-black-1 text-opacity-70 font-semibold">
                    {leaveItem.leave_type.toLowerCase()} Leave
                  </span>
                </div>
              </div>
              <p className="text-warning font-bold">{`${dayjs(
                leaveItem.started_at,
              ).format('DD/MM')} - ${dayjs(leaveItem.ended_at).format('DD/MM')}`}</p>
            </div>
            <Divider className="my-3 mx-0" />
          </React.Fragment>
        );
      })}
      {totalCount > 5 && (
        <Pagination
          className="mx-auto w-fit"
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={initialPageState.page}
          total={totalCount}
        />
      )}
    </div>
  );
};

export default EmployeesInLeave;
