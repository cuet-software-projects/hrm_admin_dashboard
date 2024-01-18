import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useMemo, useState } from 'react';

import {
  CURRENT_EMPLOYEE_DESIGNATION,
  CURRENT_EMPLOYMENT_INFO,
  newDatesFirst,
} from '../../constants/api';
import { useGetUserList } from '../../customHooks/users/useGetUserLists';
import { AntdTableHelpers } from '../../helpers/utility/antdTableHelpers';
import { IUser, PaginationQueryParams } from '../../types';
import FilterButton from '../Resuables/Button/FilterButton';
import Searchbar from '../Resuables/Searchbar';
import TeammateProfileTable from '../VisualizationComponents/Tables/TeammateProfileTable';

const TeammateProfile = () => {
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

  const { data, isLoading, error } = useGetUserList({
    ...queryParams,
    sorts: newDatesFirst,
    includes: `${CURRENT_EMPLOYMENT_INFO}.${CURRENT_EMPLOYEE_DESIGNATION}`,
  });

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
    sorter: SorterResult<IUser> | SorterResult<IUser>[];
  }) => {
    setQueryParams({
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? 10,
      filters: filters,
      sorts: AntdTableHelpers.parseTableSorts<IUser>(sorter),
    });
  };

  return (
    <div className="border border-grey-1 border-opacity-10 bg-white-1 py-8 px-4 rounded-lg">
      <div className="space-y-8">
        <div className="flex items-center justify-start lg:justify-end space-x-4">
          <div className="w-full lg:w-72">
            <Searchbar />
          </div>
          <FilterButton />
        </div>
        <TeammateProfileTable
          data={data?.data.filter((user) => user.current_employment_info?.isCurrent)}
          isLoading={isLoading}
          error={error}
          paginationTotal={totalCount}
          handleTableChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default TeammateProfile;
