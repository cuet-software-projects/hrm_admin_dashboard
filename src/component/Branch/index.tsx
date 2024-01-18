import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import React, { useMemo, useState } from 'react';

import { newDatesFirst } from '../../constants/api';
import { useGetBranchList } from '../../customHooks/branches/useGetBranchList';
import ErrorHandler from '../../helpers/axios/errorHandler';
import SuccessHandler from '../../helpers/axios/successHandler';
import { AntdTableHelpers } from '../../helpers/utility/antdTableHelpers';
import BranchService from '../../service/branch.service';
import useDrawerStore from '../../store/drawerStore';
import { IBranch, PaginationQueryParams, ResponseError } from '../../types';
import FilterButton from '../Resuables/Button/FilterButton';
import Searchbar from '../Resuables/Searchbar';
import BranchDrawer from '../VisualizationComponents/Drawers/BranchDrawer';
import BranchTable from '../VisualizationComponents/Tables/BranchTable/BranchTable';

const Branch: React.FC = () => {
  // Setting the initial page configuration
  const initialPageState: PaginationQueryParams = {
    limit: 10,
    page: 1,
    filters: {},
    sorts: '',
  };

  const [queryParams, setQueryParams] = useState<PaginationQueryParams>(initialPageState);

  const { data, isLoading, error, refetch } = useGetBranchList({
    ...queryParams,
    sorts: newDatesFirst,
  });

  const { drawerOpen, handleDrawerClose } = useDrawerStore();
  const [selectedItemId, setSelectedItemId] = useState<IBranch['id'] | null>(null);

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
    sorter: SorterResult<IBranch> | SorterResult<IBranch>[];
  }) => {
    setQueryParams({
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? 10,
      filters: filters,
      sorts: AntdTableHelpers.parseTableSorts<IBranch>(sorter),
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await BranchService.deleteBranch(id);
      SuccessHandler.handle('The item has been deleted');
      refetch();
    } catch (e) {
      ErrorHandler.handle(e as ResponseError);
    }
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
        <BranchTable
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
        <BranchDrawer onClose={onClose} branchId={selectedItemId} refetch={refetch} />
      )}
    </div>
  );
};

export default Branch;
