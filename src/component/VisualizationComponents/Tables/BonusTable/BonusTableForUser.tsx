import { Table } from 'antd';
import {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React from 'react';

import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import { IBonus } from '../../../../types/bonus.type';
import StatusBadge from '../../../Resuables/StatusBadge';

interface BonusTableForUserProps {
  data: IBonus[] | undefined;
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
    sorter: SorterResult<IBonus> | SorterResult<IBonus>[];
  }) => void;
}

const BonusTableForUser: React.FC<BonusTableForUserProps> = ({
  data,
  isLoading,
  error,
  paginationTotal,
  handleTableChange,
}) => {
  const { stickyColumn } = useTableConfigStore();

  // If an error occurs
  if (error) {
    return <p>An error occured</p>;
  }

  // Configuring the columns of the table
  const columns: ColumnsType<IBonus> = [
    {
      title: 'Date',
      key: 'Date',
      dataIndex: 'Date',
      width: 120,
      fixed: stickyColumn,
      render: (_, bonusItem) => dayjs(bonusItem.date).format('DD-MM-YYYY'),
    },
    {
      title: 'Bonus',
      key: 'Bonus',
      dataIndex: 'Bonus',
      width: 120,
      render: (_, bonusItem) => bonusItem.bonus ?? '--',
    },
    {
      title: 'Reason',
      key: 'Reason',
      dataIndex: 'Reason',
      width: 120,
      render: (_, bonusItem) => bonusItem.reason ?? '--',
    },
    {
      title: 'Status',
      key: 'Status',
      dataIndex: 'Status',
      width: 120,
      render: (_, bonusItem) =>
        bonusItem.status ? <StatusBadge status={bonusItem.status} /> : '--',
    },
  ];

  const tablePaginationConfig = {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50, 100],
    total: paginationTotal,
    showSizeChanger: true,
    showTotal: (total: number) => `Total ${total} items`,
  };

  return (
    <div>
      <Table<IBonus>
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

export default BonusTableForUser;
