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
import { IRole } from '../../../../types/role.type';
import DeleteInfoButtonForTable from '../../../Resuables/DeleteInfoButtonForTable';
import DropDownForTable from '../../../Resuables/DropDownForTable';
import EditInfoButtonForTable from '../../../Resuables/EditInfoButtonForTable';

interface RoleTableProps {
  data: IRole[] | undefined;
  isLoading: boolean;
  error: unknown;
  paginationTotal: number;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  handleDelete: (id: string) => void;
  handleTableChange: ({
    pagination,
    filters,
    sorter,
  }: {
    filters: Record<string, FilterValue | null>;
    pagination: TablePaginationConfig;
    sorter: SorterResult<IRole> | SorterResult<IRole>[];
  }) => void;
}

const RoleTableForAdmin: React.FC<RoleTableProps> = ({
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
  const columns: ColumnsType<IRole> = [
    {
      title: 'Role Name',
      key: 'Role Name',
      dataIndex: 'Role Description',
      width: 200,
      fixed: stickyColumn,
      align: 'center',
      render: (_, roleItem) => roleItem.name ?? '--',
    },
    {
      title: 'Role Description',
      key: 'Role Description',
      dataIndex: 'Role Description',
      render: (_, roleItem) =>
        roleItem.description && roleItem.description.length > 0
          ? roleItem.description
          : '---',
    },
    {
      title: '-',
      key: '-',
      dataIndex: '-',
      width: 50,
      fixed: stickyColumn,
      render: (_, roleItem) => (
        <DropDownForTable items={getDropDownItemList({ roleItem })} />
      ),
    },
  ];

  // Action list for dropdown
  function getDropDownItemList({ roleItem }: { roleItem: IRole }): MenuProps['items'] {
    const labelComponentList = [
      <EditInfoButtonForTable
        key={0}
        handleEdit={() => {
          setId(roleItem.id);
          handleDrawerOpen('update');
        }}
      />,
      <DeleteInfoButtonForTable key={1} handleDelete={() => handleDelete(roleItem.id)} />,
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
      <Table<IRole>
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

export default RoleTableForAdmin;
