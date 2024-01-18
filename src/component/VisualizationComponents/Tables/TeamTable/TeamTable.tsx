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
import { ITeam } from '../../../../types';
import DeleteInfoButtonForTable from '../../../Resuables/DeleteInfoButtonForTable';
import DropDownForTable from '../../../Resuables/DropDownForTable';
import EditInfoButtonForTable from '../../../Resuables/EditInfoButtonForTable';

interface TeamTableProps {
  data: ITeam[] | undefined;
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
    sorter: SorterResult<ITeam> | SorterResult<ITeam>[];
  }) => void;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  handleDelete: (id: string) => void;
}

const TeamTable: React.FC<TeamTableProps> = ({
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
  const columns: ColumnsType<ITeam> = [
    {
      title: 'Team Name',
      key: 'Team Name',
      dataIndex: 'Team Name',
      width: 100,
      fixed: stickyColumn,
      render: (_, teamItem) => teamItem.name ?? '--',
    },
    {
      title: 'Team Description',
      key: 'Team Description',
      dataIndex: 'Team Description',
      width: 150,
      render: (_, teamItem) => teamItem.name ?? '--',
    },
    {
      title: '-',
      key: '-',
      dataIndex: '-',
      width: 50,
      fixed: stickyColumn,
      render: (_, teamItem) => (
        <DropDownForTable items={getDropDownItemList({ teamItem })} />
      ),
    },
  ];

  // Action list for dropdown
  function getDropDownItemList({ teamItem }: { teamItem: ITeam }): MenuProps['items'] {
    const labelComponentList = [
      <EditInfoButtonForTable
        key={0}
        handleEdit={() => {
          setId(teamItem.id);
          handleDrawerOpen('update');
        }}
      />,
      <DeleteInfoButtonForTable key={1} handleDelete={() => handleDelete(teamItem.id)} />,
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
      <Table<ITeam>
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

export default TeamTable;
