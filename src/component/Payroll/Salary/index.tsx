import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useMemo, useState } from 'react';

import { newDatesFirst } from '../../../constants/api';
import { userRoles } from '../../../constants/GlobalConstants';
import { useGetPayrollOfAllEmployees } from '../../../customHooks/payrolls/useGetPayrollOfAllEmployee';
import { useGetPayrollOfEmployee } from '../../../customHooks/payrolls/useGetPayrollOfEmployee';
import { AntdTableHelpers } from '../../../helpers/utility/antdTableHelpers';
import useAuthStore from '../../../store/authStore';
import useDrawerStore from '../../../store/drawerStore';
import { usePayrollStore } from '../../../store/payrollStore/payrollStore';
import { PaginationQueryParams } from '../../../types';
import { IPayroll } from '../../../types/payroll.type';
import FilterButton from '../../Resuables/Button/FilterButton';
import NotAnEmployee from '../../Resuables/NotAnEmployee';
import Searchbar from '../../Resuables/Searchbar';
import SalaryDrawer from '../../VisualizationComponents/Drawers/SalaryDrawer';
import SalaryTableForAdmin from '../../VisualizationComponents/Tables/SalaryTable/SalaryTableForAdmin';
import SalaryTableForUser from '../../VisualizationComponents/Tables/SalaryTable/SalaryTableForUser';

const Salary = () => {
  const { role, userProfileData } = useAuthStore();
  const { drawerOpen, handleDrawerClose } = useDrawerStore();
  const { setIsConfirmEmployeeChange, setSalaryId, setEmployeeId } = usePayrollStore();

  // Setting the initial page configuration
  const initialPageState: PaginationQueryParams = {
    limit: 10,
    page: 1,
    filters: {},
    sorts: '',
    search: '',
    includes: '',
  };

  // Query params state
  const [queryParams, setQueryParams] = useState<PaginationQueryParams>(initialPageState);

  const { data: payrollData, ...rest } =
    role === userRoles.admin || role === userRoles.manager
      ? useGetPayrollOfAllEmployees({
          ...queryParams,
          includes: 'employee_info.user',
          sorts: newDatesFirst,
        })
      : useGetPayrollOfEmployee({
          employeeId: userProfileData?.current_employee_id ?? '',
          ...queryParams,
          filters: { status: ['SENT'] },
          sorts: newDatesFirst,
        });

  const totalCount = useMemo(() => {
    return payrollData?.meta?.totalItems || 0;
  }, [payrollData?.meta]);

  const onClose = () => {
    setEmployeeId(null);
    setSalaryId(null);
    setIsConfirmEmployeeChange(false);
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
    sorter: SorterResult<IPayroll> | SorterResult<IPayroll>[];
  }) => {
    setQueryParams({
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? 10,
      filters: filters,
      sorts: AntdTableHelpers.parseTableSorts<IPayroll>(sorter),
    });
  };

  if (!userProfileData?.current_employee_id) {
    return <NotAnEmployee />;
  }

  return (
    <div className="border border-grey-1 border-opacity-10 bg-white-1 py-8 px-4 rounded-lg">
      <div className="relative flex items-center lg:space-x-4 justify-center lg:px-none lg:justify-none"></div>
      <div className="space-y-8">
        <div className="flex items-center justify-start lg:justify-end space-x-4">
          <div className="w-full lg:w-72">
            <Searchbar />
          </div>
          <FilterButton />
        </div>
        {role === userRoles.user && (
          <SalaryTableForUser
            data={payrollData?.data}
            isLoading={rest.isLoading}
            error={rest.error}
            paginationTotal={totalCount}
            handleTableChange={handleTableChange}
          />
        )}
        {(role === userRoles.admin || role === userRoles.manager) && (
          <SalaryTableForAdmin
            data={payrollData?.data}
            isLoading={rest.isLoading}
            error={rest.error}
            paginationTotal={totalCount}
            handleTableChange={handleTableChange}
          />
        )}
      </div>
      {drawerOpen && (
        <SalaryDrawer
          onClose={onClose}
          payrollData={payrollData?.data ?? []}
          refetch={rest.refetch}
        />
      )}
    </div>
  );
};

export default Salary;
