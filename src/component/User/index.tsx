import {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import React, { useMemo, useState } from 'react';

import {
  CURRENT_EMPLOYEE_DESIGNATION,
  CURRENT_EMPLOYMENT_INFO,
  newDatesFirst,
} from '../../constants/api';
import { useGetUserList } from '../../customHooks/users/useGetUserLists';
import ErrorHandler from '../../helpers/axios/errorHandler';
import SuccessHandler from '../../helpers/axios/successHandler';
import { AntdTableHelpers } from '../../helpers/utility/antdTableHelpers';
import UserService from '../../service/user.service';
import useDrawerStore from '../../store/drawerStore';
import useGlobalFilterStore from '../../store/GlobalFilterStore';
import { IUser, PaginationQueryParams, ResponseError } from '../../types';
import Button from '../Resuables/Button/Button';
import FilterButton from '../Resuables/Button/FilterButton';
import Searchbar from '../Resuables/Searchbar';
import ClientDrawer from '../VisualizationComponents/Drawers/ClientDrawer';
import UserDrawer from '../VisualizationComponents/Drawers/UserDrawer';
import UserTable from '../VisualizationComponents/Tables/UserTable/UserTable';

const User: React.FC = () => {
  const { searchValue } = useGlobalFilterStore();
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

  // Fetch data
  const { data, isLoading, error, refetch } = useGetUserList({
    ...queryParams,
    includes: `${CURRENT_EMPLOYMENT_INFO}.${CURRENT_EMPLOYEE_DESIGNATION},user_roles.role`,
    sorts: newDatesFirst,
    search: searchValue,
  });

  // Drawer state
  const {
    drawerOpen,
    isOpenClientDrawer,
    handleDrawerOpen,
    setIsOpenClientDrawer,
    handleDrawerClose,
  } = useDrawerStore();

  // Item Id is required for tracking which item is selected
  const [selectedItemId, setSelectedItemId] = useState<IUser['id'] | null>(null);

  // Count the total items
  const totalCount = useMemo(() => {
    return data?.meta?.totalItems || 0;
  }, [data?.meta]);

  // close the drawer
  const onClose = () => {
    setSelectedItemId(null);
    handleDrawerClose();
    setIsOpenClientDrawer(false);
  };

  // Change the table data status
  const handleTableChange = ({
    pagination,
    filters,
    sorter,
  }: {
    pagination: TablePaginationConfig;
    filters: Record<string, FilterValue | null>;
    sorter: SorterResult<IUser> | SorterResult<IUser>[];
  }) => {
    setQueryParams({
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? 10,
      filters: filters,
      sorts: AntdTableHelpers.parseTableSorts<IUser>(sorter),
    });
  };

  // Delete a time
  const handleDelete = async (id: string) => {
    try {
      await UserService.deleteUser(id);
      SuccessHandler.handle('The item has been deleted');
      refetch();
    } catch (e) {
      ErrorHandler.handle(e as ResponseError);
    }
  };

  // open the client drawer in create mode
  const handleClickAddClient = () => {
    handleDrawerOpen('create');
    setIsOpenClientDrawer(true);
  };

  return (
    <div className="border border-grey-1 border-opacity-10 bg-white-1 py-8 px-4 rounded-lg">
      <div className="relative flex items-center lg:space-x-4 justify-center px-8 lg:px-none lg:justify-none"></div>
      <div className="space-y-8">
        <div className="flex items-center justify-start lg:justify-end space-x-4">
          <div className="w-full lg:w-72">
            <Searchbar />
          </div>
          <FilterButton />
          <Button onClick={handleClickAddClient}>+ Add Client</Button>
        </div>
        <UserTable
          data={data?.data}
          isLoading={isLoading}
          error={error}
          paginationTotal={totalCount}
          setId={setSelectedItemId}
          handleDelete={handleDelete}
          handleTableChange={handleTableChange}
        />
      </div>
      {drawerOpen && !isOpenClientDrawer && (
        <UserDrawer onClose={onClose} userId={selectedItemId} refetch={refetch} />
      )}
      {drawerOpen && isOpenClientDrawer && (
        <ClientDrawer
          onClose={onClose}
          userId={selectedItemId}
          refetchAllUsers={refetch}
        />
      )}
    </div>
  );
};

export default User;
