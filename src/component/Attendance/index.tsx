import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import React, { useMemo, useState } from 'react';

import { userRoles } from '../../constants/GlobalConstants';
import { useGetAttendanceList } from '../../customHooks/attendances/useGetAttendanceList';
import { useGetSingleEmployeeAttendanceList } from '../../customHooks/attendances/useGetSingleEmployeeAttendanceList';
import { AntdTableHelpers } from '../../helpers/utility/antdTableHelpers';
import AttendanceService from '../../service/attendance.service';
import { useAttendanceStore } from '../../store/attendanceStore/attendanceStore';
import useAuthStore from '../../store/authStore';
import useDrawerStore from '../../store/drawerStore';
import useGlobalFilterStore from '../../store/GlobalFilterStore';
import { IAttendance, PaginationQueryParams } from '../../types';
import FilterButton from '../Resuables/Button/FilterButton';
import NotAnEmployee from '../Resuables/NotAnEmployee';
import Searchbar from '../Resuables/Searchbar';
import AttendanceDrawer from '../VisualizationComponents/Drawers/AttendanceDrawer';
import AttendanceTableForAdmin from '../VisualizationComponents/Tables/AttendanceTable/AttendanceTableForAdmin';
import AttendanceTableForEmployee from '../VisualizationComponents/Tables/AttendanceTable/AttendanceTableForEmployee';

const Attendance: React.FC = () => {
  const { role, userProfileData } = useAuthStore();
  const { searchValue } = useGlobalFilterStore();
  const { entryTime, setEntryTime } = useAttendanceStore();
  const { handleDrawerOpen } = useDrawerStore();

  // Setting the initial page configuration
  const initialPageState: PaginationQueryParams = {
    limit: 10,
    page: 1,
    includes: '',
    filters: {},
    sorts: '',
    search: '',
  };

  // Query params state
  const [queryParams, setQueryParams] = useState<PaginationQueryParams>(initialPageState);

  const [attendanceId, setAttendanceId] = useState<string | null>(null);

  const { data, isLoading, error, refetch } =
    role === userRoles.admin || role === userRoles.manager
      ? useGetAttendanceList({
          ...queryParams,
          search: searchValue,
          includes: 'employee_info.user',
          sorts: '-entry_time',
        })
      : useGetSingleEmployeeAttendanceList({
          ...queryParams,
          employeeId: userProfileData?.current_employee_id ?? null,
          sorts: '-entry_time',
        });

  const { handleDrawerClose } = useDrawerStore();

  const totalCount = useMemo(() => {
    return data?.meta?.totalItems || 0;
  }, [data?.meta]);

  const onClose = () => {
    handleDrawerClose();
  };

  // Change the table data status
  const handleTableChange = ({
    pagination,
    filters,
    sorter,
  }: {
    pagination: TablePaginationConfig;
    filters: Record<string, FilterValue | null>;
    sorter: SorterResult<IAttendance> | SorterResult<IAttendance>[];
  }) => {
    setQueryParams({
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? 10,
      filters: filters,
      sorts: AntdTableHelpers.parseTableSorts<IAttendance>(sorter),
    });
  };

  // This function will open the exit drawer (built for user)
  const handleExitDrawerOpen = ({ attendanceItem }: { attendanceItem: IAttendance }) => {
    setAttendanceId(attendanceItem.id);
    handleDrawerOpen('update');
    setEntryTime(attendanceItem.entry_time);
  };

  // This function updates the marking (built for admin)
  const handleUpdateMark = async ({
    attendanceItem,
    mark,
  }: {
    attendanceItem: IAttendance;
    mark: string;
  }) => {
    try {
      await AttendanceService.updateMarking({
        id: attendanceItem.id,
        updatedMark: parseInt(mark),
      });
      refetch();
    } catch (e) {
      //
    }
  };

  if (!userProfileData?.current_employee_id) {
    return <NotAnEmployee />;
  }

  const AttendanceComponent = useMemo(() => {
    if (role === userRoles.admin || role === userRoles.manager) {
      return AttendanceTableForAdmin;
    } else {
      return AttendanceTableForEmployee;
    }
  }, [role, userRoles, AttendanceTableForAdmin, AttendanceTableForEmployee, entryTime]);

  return (
    <div className="border border-grey-1 border-opacity-10 bg-white-1 py-8 px-4 rounded-lg">
      <div className="relative flex items-center lg:space-x-4 justify-center lg:px-none lg:justify-none"></div>
      <div className="space-y-8">
        <div className="flex items-center justify-start lg:justify-end space-x-4">
          {role !== userRoles.user && (
            <div className="w-full lg:w-72">
              <Searchbar />
            </div>
          )}
          <FilterButton />
        </div>

        <AttendanceComponent
          data={data?.data}
          isLoading={isLoading}
          error={error}
          paginationTotal={totalCount}
          refetch={refetch}
          onAttemptToOpenExitDrawer={handleExitDrawerOpen}
          onChangeMark={handleUpdateMark}
          handleTableChange={handleTableChange}
        />
      </div>

      <AttendanceDrawer attendanceId={attendanceId} onClose={onClose} refetch={refetch} />
    </div>
  );
};

export default Attendance;
