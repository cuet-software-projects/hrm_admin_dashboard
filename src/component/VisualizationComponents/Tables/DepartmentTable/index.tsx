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
import { IDepartment } from '../../../../types/department.type';
import DeleteInfoButtonForTable from '../../../Resuables/DeleteInfoButtonForTable';
import DropDownForTable from '../../../Resuables/DropDownForTable';
import EditInfoButtonForTable from '../../../Resuables/EditInfoButtonForTable';
import ExpandableText from '../../../Resuables/ExpandableText';

interface DepartmentalTableProps {
  data: IDepartment[] | undefined;
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
    sorter: SorterResult<IDepartment> | SorterResult<IDepartment>[];
  }) => void;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  handleDelete: (id: string) => void;
}

const DepartmentTable: React.FC<DepartmentalTableProps> = ({
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
  const columns: ColumnsType<IDepartment> = [
    {
      title: 'Prefix Code',
      key: 'Prefix Code',
      dataIndex: 'Prefix Code',
      width: 100,
      fixed: stickyColumn,
      render: (_, departmentItem) => departmentItem.prefix_code ?? '--',
    },
    {
      title: 'Code',
      key: 'Code',
      dataIndex: 'Code',
      width: 150,
      render: (_, departmentItem) => departmentItem.code ?? '--',
    },
    {
      title: 'Name',
      key: 'Name',
      dataIndex: 'Name',
      width: 120,
      render: (_, departmentItem) => departmentItem.name ?? '--',
    },
    {
      title: 'Description',
      key: 'Description',
      dataIndex: 'Description',
      width: 120,
      render: (_, departmentItem) =>
        departmentItem.description ? (
          <ExpandableText text={departmentItem.description} />
        ) : (
          '---'
        ),
    },
    {
      title: '-',
      key: '-',
      dataIndex: '-',
      width: 50,
      fixed: stickyColumn,
      render: (_, departmentItem) => (
        <DropDownForTable items={getDropDownItemList({ departmentItem })} />
      ),
    },
  ];

  // Action list for dropdown
  function getDropDownItemList({
    departmentItem,
  }: {
    departmentItem: IDepartment;
  }): MenuProps['items'] {
    const labelComponentList = [
      <EditInfoButtonForTable
        key={0}
        handleEdit={() => {
          setId(departmentItem.id);
          handleDrawerOpen('update');
        }}
      />,
      <DeleteInfoButtonForTable
        key={1}
        handleDelete={() => handleDelete(departmentItem.id)}
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
      <Table<IDepartment>
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

export default DepartmentTable;
