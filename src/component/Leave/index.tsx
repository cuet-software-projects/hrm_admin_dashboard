import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useMemo, useState } from 'react';

import { newDatesFirst } from '../../constants/api';
import { totalPaidLeaves, userRoles } from '../../constants/GlobalConstants';
import { useGetLeaveList } from '../../customHooks/leaves/useGetLeaveList';
import { useGetSingleEmployeeLeaveList } from '../../customHooks/leaves/useGetSingleEmployeeLeaveList';
import { AntdTableHelpers } from '../../helpers/utility/antdTableHelpers';
import LeaveService from '../../service/leave.service';
import useAuthStore from '../../store/authStore';
import useDrawerStore from '../../store/drawerStore';
import { PaginationQueryParams } from '../../types';
import { ILeave } from '../../types/leave.type';
import FilterButton from '../Resuables/Button/FilterButton';
import NotAnEmployee from '../Resuables/NotAnEmployee';
import Searchbar from '../Resuables/Searchbar';
import LeaveDrawer from '../VisualizationComponents/Drawers/LeaveDrawer';
import LeaveTableForAdmin from '../VisualizationComponents/Tables/LeaveTable/LeaveTableForAdmin';
import LeaveTableForUser from '../VisualizationComponents/Tables/LeaveTable/LeaveTableForUser';
import LeaveInfo from './LeaveInfo';

export default function Leave() {
  const { role, userProfileData } = useAuthStore();
  const { handleDrawerOpen } = useDrawerStore();

  // Setting the initial page configuration
  const initialPageState: PaginationQueryParams = {
    limit: 10,
    page: 1,
    filters: {},
    includes: '',
    search: '',
    sorts: '',
  };

  const [queryParams, setQueryParams] = useState<PaginationQueryParams>(initialPageState);

  const { data, isLoading, error, refetch } =
    role === userRoles.admin || role === userRoles.manager
      ? useGetLeaveList({
          ...queryParams,
          includes: 'employee_info.user,action_taken_by.user',
          sorts: newDatesFirst,
        })
      : useGetSingleEmployeeLeaveList({
          employeeId: userProfileData?.current_employee_id ?? '',
          ...queryParams,
          sorts: newDatesFirst,
        });

  const { drawerOpen, handleDrawerClose } = useDrawerStore();

  const [leaveId, setLeaveId] = useState<string>('');
  const [employeeId, setEmployeeId] = useState<string>('');
  const [remainingLeaves, setRemainingLeaves] = useState(totalPaidLeaves);

  const onClose = () => {
    handleDrawerClose();
  };

  const totalCount = useMemo(() => {
    return data?.meta?.totalItems || 0;
  }, [data?.meta]);

  // Change the table data status
  const handleTableChange = ({
    pagination,
    filters,
    sorter,
  }: {
    pagination: TablePaginationConfig;
    filters: Record<string, FilterValue | null>;
    sorter: SorterResult<ILeave> | SorterResult<ILeave>[];
  }) => {
    setQueryParams({
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? 10,
      filters: filters,
      sorts: AntdTableHelpers.parseTableSorts<ILeave>(sorter),
    });
  };

  // This function will select the row and open the drawer (built for user)
  const handleUpdateLeave = ({ leaveItem }: { leaveItem: ILeave }) => {
    setLeaveId(leaveItem.id);
    handleDrawerOpen('update');
  };

  // This function will update the leave status (Built for admin)
  const handleUpdateLeaveStatus = async ({
    leaveItem,
    leaveStatusValue,
  }: {
    leaveItem: ILeave;
    leaveStatusValue: string;
  }) => {
    if (userProfileData && userProfileData.current_employee_id) {
      try {
        await LeaveService.makeApprovalToLeave({
          employeeId: userProfileData?.current_employee_id,
          leaveId: leaveItem.id,
          leaveStatus: leaveStatusValue,
        });
        refetch();
      } catch (e) {
        //
      }
    } else {
      alert('A problem occured. Try again.');
    }
  };

  if (!userProfileData?.current_employee_id) {
    return <NotAnEmployee />;
  }

  return (
    <div className="bg-white-1 p-4 rounded-lg shadow mb-5">
      {role === userRoles.user && (
        <LeaveInfo
          employeeId={`${userProfileData?.current_employee_id}`}
          setRemainingLeaves={setRemainingLeaves}
        />
      )}
      {(role === userRoles.admin || role === userRoles.manager) &&
        employeeId.length > 0 && (
          <LeaveInfo employeeId={employeeId} setRemainingLeaves={setRemainingLeaves} />
        )}
      <div>
        <div className="flex items-center justify-start lg:justify-end space-x-4 my-8">
          <div className="w-full lg:w-72">
            <Searchbar />
          </div>
          <FilterButton />
        </div>
        {role === userRoles.user && (
          <LeaveTableForUser
            data={data?.data}
            isLoading={isLoading}
            error={error}
            paginationTotal={totalCount}
            handleTableChange={handleTableChange}
            onUpdateLeave={handleUpdateLeave}
          />
        )}
        {(role === userRoles.admin || role === userRoles.manager) && (
          <LeaveTableForAdmin
            data={data?.data}
            isLoading={isLoading}
            error={error}
            paginationTotal={totalCount}
            setEmployeeId={setEmployeeId}
            handleTableChange={handleTableChange}
            onChangeLeaveStatus={handleUpdateLeaveStatus}
          />
        )}
      </div>
      {drawerOpen && (
        <LeaveDrawer
          onClose={onClose}
          refetch={() => refetch()}
          leaveId={leaveId}
          allowCreate={
            data?.data.filter((leaveItem) => leaveItem.leave_status === null).length ===
              0 && remainingLeaves > 0
          }
        />
      )}
    </div>
  );
}
