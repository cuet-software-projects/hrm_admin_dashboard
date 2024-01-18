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
import { IDesignation } from '../../../../types';
import DeleteInfoButtonForTable from '../../../Resuables/DeleteInfoButtonForTable';
import DropDownForTable from '../../../Resuables/DropDownForTable';
import EditInfoButtonForTable from '../../../Resuables/EditInfoButtonForTable';

interface DesignationTableProps {
  data: IDesignation[] | undefined;
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
    sorter: SorterResult<IDesignation> | SorterResult<IDesignation>[];
  }) => void;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  handleDelete: (id: string) => void;
}

const DesignationTable: React.FC<DesignationTableProps> = ({
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
  const columns: ColumnsType<IDesignation> = [
    {
      title: 'Designation',
      key: 'Designation',
      dataIndex: 'Designation',
      fixed: stickyColumn,
      align: 'left',
      render: (_, designationItem) => designationItem.name ?? '--',
    },
    {
      title: '-',
      key: '-',
      dataIndex: '-',
      fixed: stickyColumn,
      render: (_, designationItem) => (
        <DropDownForTable items={getDropDownItemList({ designationItem })} />
      ),
    },
  ];

  // Action list for dropdown
  function getDropDownItemList({
    designationItem,
  }: {
    designationItem: IDesignation;
  }): MenuProps['items'] {
    const labelComponentList = [
      <EditInfoButtonForTable
        key={0}
        handleEdit={() => {
          setId(designationItem.id);
          handleDrawerOpen('update');
        }}
      />,
      <DeleteInfoButtonForTable
        key={1}
        handleDelete={() => handleDelete(designationItem.id)}
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
      <Table<IDesignation>
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

export default DesignationTable;
