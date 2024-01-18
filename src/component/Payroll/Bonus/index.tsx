import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useMemo, useState } from 'react';

import { newDatesFirst } from '../../../constants/api';
import { userRoles } from '../../../constants/GlobalConstants';
import { useGetBonusListOfAllEmployees } from '../../../customHooks/bonuses/useGetBonuseListOfAllEmployees';
import { useGetBonusListOfEmployee } from '../../../customHooks/bonuses/useGetBonusListOfEmployee';
import { AntdTableHelpers } from '../../../helpers/utility/antdTableHelpers';
import useAuthStore from '../../../store/authStore';
import useDrawerStore from '../../../store/drawerStore';
import { usePayrollStore } from '../../../store/payrollStore/payrollStore';
import { PaginationQueryParams } from '../../../types';
import { IBonus } from '../../../types/bonus.type';
import FilterButton from '../../Resuables/Button/FilterButton';
import NotAnEmployee from '../../Resuables/NotAnEmployee';
import Searchbar from '../../Resuables/Searchbar';
import BonusDrawer from '../../VisualizationComponents/Drawers/BonusDrawer';
import BonusTableForAdmin from '../../VisualizationComponents/Tables/BonusTable/BonusTableForAdmin';
import BonusTableForUser from '../../VisualizationComponents/Tables/BonusTable/BonusTableForUser';

const Bonus = () => {
  const { role, userProfileData } = useAuthStore();
  const { drawerOpen, handleDrawerOpen, handleDrawerClose } = useDrawerStore();

  // Setting the initial page configuration
  const initialPageState: PaginationQueryParams = {
    page: 1,
    limit: 10,
    filters: {},
    includes: '',
    search: '',
    sorts: '',
  };

  // Query params state
  const [queryParams, setQueryParams] = useState<PaginationQueryParams>(initialPageState);

  const { setBonusId, setEmployeeId, setIsConfirmEmployeeChange } = usePayrollStore();

  const { data: bonusData, ...rest } =
    role === userRoles.admin || role === userRoles.manager
      ? useGetBonusListOfAllEmployees({
          ...queryParams,
          includes: 'employee_info.user',
          sorts: newDatesFirst,
        })
      : useGetBonusListOfEmployee({
          employeeId: userProfileData?.current_employee_id ?? '',
          ...queryParams,
          filters: { status: ['SENT'] },
          sorts: newDatesFirst,
        });

  const totalCount = useMemo(() => {
    return bonusData?.meta?.totalItems || 0;
  }, [bonusData?.meta]);

  // When drawer is opened for updating bonus info
  const onEditButtonClicked = (bonusItem: IBonus) => {
    setEmployeeId(bonusItem.employee_id ?? null);
    setBonusId(bonusItem.id);
    handleDrawerOpen('update');
  };

  // When Drawer is closed
  const onClose = () => {
    setEmployeeId(null);
    setBonusId(null);
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
    sorter: SorterResult<IBonus> | SorterResult<IBonus>[];
  }) => {
    setQueryParams({
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? 10,
      filters: filters,
      sorts: AntdTableHelpers.parseTableSorts<IBonus>(sorter),
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
          <BonusTableForUser
            data={bonusData?.data}
            isLoading={rest.isLoading}
            error={rest.error}
            paginationTotal={totalCount}
            handleTableChange={handleTableChange}
          />
        )}
        {(role === userRoles.admin || role === userRoles.manager) && (
          <BonusTableForAdmin
            data={bonusData?.data}
            isLoading={rest.isLoading}
            error={rest.error}
            paginationTotal={totalCount}
            onEditButtonClicked={onEditButtonClicked}
            handleTableChange={handleTableChange}
          />
        )}
      </div>
      {drawerOpen && (userRoles.admin || userRoles.manager) && bonusData && (
        <BonusDrawer
          bonusData={bonusData.data}
          isLoading={rest.isLoading}
          error={rest.error}
          refetch={rest.refetch}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default Bonus;
