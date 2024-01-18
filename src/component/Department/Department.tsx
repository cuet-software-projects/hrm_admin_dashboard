import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import React, { useMemo, useState } from 'react';

import { newDatesFirst } from '../../constants/api';
import { useDepartmentLists } from '../../customHooks/departments/useDepartmentLists';
import ErrorHandler from '../../helpers/axios/errorHandler';
import SuccessHandler from '../../helpers/axios/successHandler';
import { AntdTableHelpers } from '../../helpers/utility/antdTableHelpers';
import DepartmentService from '../../service/department.service';
import useDrawerStore from '../../store/drawerStore';
import { IDepartment, PaginationQueryParams, ResponseError } from '../../types';
import FilterButton from '../Resuables/Button/FilterButton';
import Searchbar from '../Resuables/Searchbar';
import DepartmentDrawer from '../VisualizationComponents/Drawers/DepartmentDrawer';
import DepartmentTable from '../VisualizationComponents/Tables/DepartmentTable';

const Department: React.FC = () => {
  // Setting the initial page configuration
  const initialPageState: PaginationQueryParams = {
    limit: 10,
    page: 1,
    filters: {},
    sorts: '',
  };

  const [queryParams, setQueryParams] = useState<PaginationQueryParams>(initialPageState);
  const { data, isLoading, error, refetch } = useDepartmentLists({
    ...queryParams,
    sorts: newDatesFirst,
  });
  const { drawerOpen, handleDrawerClose } = useDrawerStore();
  const [selectedItemId, setSelectedItemId] = useState<IDepartment['id'] | null>(null);

  const totalCount = useMemo(() => {
    return data?.meta?.totalItems || 0;
  }, [data?.meta]);

  const onClose = () => {
    setSelectedItemId(null);
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
    sorter: SorterResult<IDepartment> | SorterResult<IDepartment>[];
  }) => {
    setQueryParams({
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? 10,
      filters: filters,
      sorts: AntdTableHelpers.parseTableSorts<IDepartment>(sorter),
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await DepartmentService.deleteDepartment(id);
      SuccessHandler.handle('The item has been deleted');
      refetch();
    } catch (e) {
      ErrorHandler.handle(e as ResponseError);
    }
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
        </div>
        <DepartmentTable
          data={data?.data || []}
          isLoading={isLoading}
          error={error}
          paginationTotal={totalCount}
          setId={setSelectedItemId}
          handleDelete={handleDelete}
          handleTableChange={handleTableChange}
        />
      </div>
      {drawerOpen && (
        <DepartmentDrawer
          onClose={onClose}
          departmentId={selectedItemId}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Department;
