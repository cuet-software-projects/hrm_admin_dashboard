import { MenuProps, Table } from 'antd';
import {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import React from 'react';

import useDrawerStore from '../../../../store/drawerStore';
import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import { IBranch } from '../../../../types';
import DeleteInfoButtonForTable from '../../../Resuables/DeleteInfoButtonForTable';
import DropDownForTable from '../../../Resuables/DropDownForTable';
import EditInfoButtonForTable from '../../../Resuables/EditInfoButtonForTable';

interface BranchTableProps {
  data: IBranch[] | undefined;
  isLoading: boolean;
  error: unknown;
  paginationTotal: number;
  handleTableChange: ({
    pagination,
    filters,
    sorter,
  }: {
    filters: Record<string, FilterValue | null>;
    pagination: TablePaginationConfig;
    sorter: SorterResult<IBranch> | SorterResult<IBranch>[];
  }) => void;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  handleDelete: (id: string) => void;
}

const BranchTable: React.FC<BranchTableProps> = ({
  data,
  isLoading,
  error,
  paginationTotal,
  setId,
  handleDelete,
  handleTableChange,
}) => {
  const { stickyColumn } = useTableConfigStore();
  const { handleDrawerOpen } = useDrawerStore();

  // If an error occurs
  if (error) {
    return <p>An error occured</p>;
  }

  // Configuring the columns of the table
  const columns: ColumnsType<IBranch> = [
    {
      title: 'Branch ID',
      key: 'Branch ID',
      dataIndex: 'Branch ID',
      width: 100,
      fixed: stickyColumn,
      render: (_, branchItem) => branchItem.code ?? '--',
    },
    {
      title: 'Branch Name',
      key: 'Branch Name',
      dataIndex: 'Branch Name',
      width: 150,
      render: (_, branchItem) => branchItem.name ?? '--',
    },
    {
      title: 'Branch Address',
      key: 'Branch Address',
      dataIndex: 'Branch Address',
      width: 120,
      render: (_, branchItem) => branchItem.address ?? '--',
    },
    {
      title: '-',
      key: '-',
      dataIndex: '-',
      width: 50,
      fixed: stickyColumn,
      render: (_, branchItem) => (
        <DropDownForTable items={getDropDownItemList({ branchItem })} />
      ),
    },
  ];

  // Action list for dropdown
  function getDropDownItemList({
    branchItem,
  }: {
    branchItem: IBranch;
  }): MenuProps['items'] {
    const labelComponentList = [
      <EditInfoButtonForTable
        key={0}
        handleEdit={() => {
          setId(branchItem.id);
          handleDrawerOpen('update');
        }}
      />,
      <DeleteInfoButtonForTable
        key={1}
        handleDelete={() => handleDelete(branchItem.id)}
      />,
    ];
    return labelComponentList.map((component, index) => ({
      key: index,
      label: component,
    }));
  }

  const tablePaginationConfig = {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50, 100],
    total: paginationTotal,
    showSizeChanger: true,
    showTotal: (total: number) => `Total ${total} items`,
  };

  return (
    <div>
      <Table<IBranch>
        className="default-table"
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        onChange={(pagination, filters, sorter) => {
          handleTableChange({ pagination, filters, sorter });
        }}
        pagination={tablePaginationConfig}
        scroll={data && data.length === 0 ? undefined : { x: 'max-content' }}
      />
    </div>
  );
};

export default BranchTable;
