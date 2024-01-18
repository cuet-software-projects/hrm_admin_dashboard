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
import { IPayroll } from '../../../../types/payroll.type';
import StatusBadge from '../../../Resuables/StatusBadge';

interface SalaryTableForUserProps {
  data: IPayroll[] | undefined;
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
    sorter: SorterResult<IPayroll> | SorterResult<IPayroll>[];
  }) => void;
}

const SalaryTableForUser: React.FC<SalaryTableForUserProps> = ({
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
  const columns: ColumnsType<IPayroll> = [
    {
      title: 'Date',
      key: 'Date',
      dataIndex: 'Date',
      width: 120,
      fixed: stickyColumn,
      render: (_, payrollItem) => dayjs(payrollItem.date).format('DD-MM-YYYY'),
    },
    {
      title: 'Salary',
      key: 'Salary',
      dataIndex: 'Salary',
      width: 120,
      render: (_, payrollItem) => payrollItem.salary ?? '--',
    },
    {
      title: 'Status',
      key: 'Status',
      dataIndex: 'Status',
      width: 120,
      render: (_, payrollItem) =>
        payrollItem.status ? <StatusBadge status={payrollItem.status} /> : '--',
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
      <Table<IPayroll>
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

export default SalaryTableForUser;
