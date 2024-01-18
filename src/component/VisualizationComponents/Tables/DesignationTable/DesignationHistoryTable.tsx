import Table, { ColumnsType } from 'antd/es/table';
import {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React from 'react';

import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import { IEmployeeDesignationSalary } from '../../../../types/employee.type';

interface DesignationHistoryTableProps {
  data: IEmployeeDesignationSalary[] | undefined;
  isLoading: boolean;
  error: unknown;
  designationId: string;
  employeeId: string;
  paginationTotal: number;
  handleTableChange: ({
    pagination,
    filters,
    sorter,
  }: {
    filters: Record<string, FilterValue | null>;
    pagination: TablePaginationConfig;
    sorter:
      | SorterResult<IEmployeeDesignationSalary>
      | SorterResult<IEmployeeDesignationSalary>[];
  }) => void;
}

const DesignationHistoryTable: React.FC<DesignationHistoryTableProps> = ({
  data,
  isLoading,
  error,
  designationId,
  employeeId,
  paginationTotal,
  handleTableChange,
}) => {
  const { stickyColumn } = useTableConfigStore();

  // If an error occurs
  if (error) {
    return <p>An error occured</p>;
  }

  // Configuring the columns of the table
  const columns: ColumnsType<IEmployeeDesignationSalary> = [
    {
      title: 'Employee ID',
      key: 'Employee ID',
      dataIndex: 'Employee ID',
      width: 100,
      fixed: stickyColumn,
      render: () => employeeId ?? '--',
    },
    {
      title: 'Created At',
      key: 'Created At',
      dataIndex: 'Created At',
      width: 150,
      render: (_, designationHistorItem) =>
        designationHistorItem
          ? dayjs(designationHistorItem.created_at).format('DD/MM/YYYY')
          : '--',
    },
    {
      title: 'Designation',
      key: 'Designation',
      dataIndex: 'Designation',
      width: 120,
      render: (_, designationHistorItem) =>
        designationHistorItem.designation?.name ?? '--',
    },
    {
      title: 'Salary',
      key: 'Salary',
      dataIndex: 'Salary',
      width: 120,
      render: (_, designationHistorItem) => designationHistorItem.salary ?? '--',
    },
    {
      title: 'Reason',
      key: 'Reason',
      dataIndex: 'Reason',
      width: 120,
      render: (_, designationHistorItem) => designationHistorItem.reason ?? '--',
    },
  ];

  const tablePaginationConfig = {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50, 100],
    total: paginationTotal,
    showSizeChanger: true,
    showTotal: (total: number) => `Total ${total} items`,
  };

  const rowSelectionConfig: TableRowSelection<IEmployeeDesignationSalary> = {
    type: 'radio',
    defaultSelectedRowKeys: [designationId],
  };

  return (
    <div>
      <Table<IEmployeeDesignationSalary>
        className="default-table"
        rowKey="designation_id"
        rowSelection={rowSelectionConfig}
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

export default DesignationHistoryTable;
