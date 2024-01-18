import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { newDatesFirst } from '../../constants/api';
import { useGetDesignationHistoryList } from '../../customHooks/employees/useGetDesignationHistoryList';
import { useEmployeeDetails } from '../../customHooks/employees/useGetEmployeeDetails';
import { AntdTableHelpers } from '../../helpers/utility/antdTableHelpers';
import { PaginationQueryParams } from '../../types';
import { IEmployeeDesignationSalary } from '../../types/employee.type';
import FilterButton from '../Resuables/Button/FilterButton';
import Searchbar from '../Resuables/Searchbar';
import DesignationHistoryTable from '../VisualizationComponents/Tables/DesignationTable/DesignationHistoryTable';

const DesignationHistory: React.FC = () => {
  const [searchParams] = useSearchParams();
  const employeeId = searchParams.get('employeeId');
  const designationId = searchParams.get('designationId');

  // Setting the initial page configuration
  const initialPageState: PaginationQueryParams = {
    limit: 10,
    page: 1,
    filters: {},
    sorts: '',
  };

  const [queryParams, setQueryParams] = useState<PaginationQueryParams>(initialPageState);

  const { data: employeeData } = useEmployeeDetails({ employeeId: employeeId });

  const { data, isLoading, error } = useGetDesignationHistoryList({
    ...queryParams,
    employeeId: employeeId,
    sorts: newDatesFirst,
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
    sorter:
      | SorterResult<IEmployeeDesignationSalary>
      | SorterResult<IEmployeeDesignationSalary>[];
  }) => {
    setQueryParams({
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? 10,
      filters: filters,
      sorts: AntdTableHelpers.parseTableSorts<IEmployeeDesignationSalary>(sorter),
    });
  };

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
        {designationId && employeeData && (
          <DesignationHistoryTable
            designationId={designationId}
            data={data?.data}
            isLoading={isLoading}
            error={error}
            paginationTotal={totalCount}
            employeeId={employeeData.employee_id}
            handleTableChange={handleTableChange}
          />
        )}
      </div>
    </div>
  );
};

export default DesignationHistory;
