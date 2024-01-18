import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useMemo, useState } from 'react';

import { userRoles } from '../../constants/GlobalConstants';
import { useGetEmploymeeList } from '../../customHooks/employees/useGetEmployeeList';
import { AntdTableHelpers } from '../../helpers/utility/antdTableHelpers';
import useAuthStore from '../../store/authStore';
import { PaginationQueryParams } from '../../types';
import { IEmployee } from '../../types/employee.type';
import FilterButton from '../Resuables/Button/FilterButton';
import Searchbar from '../Resuables/Searchbar';
import EmployeeTable from '../VisualizationComponents/Tables/EmployeeTable';

const CurrentEmployees = () => {
  const { role } = useAuthStore();

  // Setting the initial page configuration
  const initialPageState: PaginationQueryParams = {
    page: 1,
    limit: 10,
    filters: {},
    includes: 'user,department,branch',
    search: '',
    sorts: '',
  };

  // Query params state
  const [queryParams, setQueryParams] = useState<PaginationQueryParams>(initialPageState);

  const { data, isLoading, error } = useGetEmploymeeList({ ...queryParams });

  const totalCount = useMemo(() => {
    return data?.meta?.totalItems ?? 0;
  }, [data?.meta]);

  // Change the table data status
  const handleTableChange = ({
    pagination,
    filters,
    sorter,
  }: {
    pagination: TablePaginationConfig;
    filters: Record<string, FilterValue | null>;
    sorter: SorterResult<IEmployee> | SorterResult<IEmployee>[];
  }) => {
    setQueryParams({
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? 10,
      filters: filters,
      sorts: AntdTableHelpers.parseTableSorts<IEmployee>(sorter),
    });
  };

  return (
    <div className="border border-grey-1 border-opacity-10 bg-white-1 py-8 px-4 rounded-lg">
      <div className="space-y-8">
        <div className="flex items-center justify-start lg:justify-end space-x-4">
          {role !== userRoles.user && (
            <div className="w-full lg:w-72">
              <Searchbar />
            </div>
          )}
          <FilterButton />
        </div>

        <EmployeeTable
          data={data?.data}
          isLoading={isLoading}
          error={error}
          handleTableChange={handleTableChange}
          paginationTotal={totalCount}
        />
      </div>
    </div>
  );
};

export default CurrentEmployees;
