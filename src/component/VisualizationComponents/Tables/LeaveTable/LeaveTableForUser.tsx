import { Button, Table } from 'antd';
import {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

import waitingImg from '../../../../assets/icons/waiting.png';
import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import { ILeave } from '../../../../types/leave.type';
import Icon from '../../../Resuables/Icon/Icon';

interface LeaveTableForUserProps {
  data: ILeave[] | undefined;
  isLoading: boolean;
  error: unknown;
  paginationTotal: number;
  onUpdateLeave: ({ leaveItem }: { leaveItem: ILeave }) => void;
  handleTableChange: ({
    pagination,
    filters,
    sorter,
  }: {
    filters: Record<string, FilterValue | null>;
    pagination: TablePaginationConfig;
    sorter: SorterResult<ILeave> | SorterResult<ILeave>[];
  }) => void;
}

const LeaveTableForUser: React.FC<LeaveTableForUserProps> = ({
  data,
  isLoading,
  error,
  paginationTotal,
  onUpdateLeave,
  handleTableChange,
}) => {
  const { stickyColumn } = useTableConfigStore();

  // If an error occurs
  if (error) {
    return <p>An error occured</p>;
  }

  // Configuring the columns of the table
  const columns: ColumnsType<ILeave> = [
    {
      title: 'Leave Start',
      key: 'Leave Start',
      dataIndex: 'Leave Start',
      fixed: stickyColumn,
      render: (_, leaveItem) => dayjs(leaveItem.started_at).format('DD-MM-YYYY'),
    },
    {
      title: 'Leave End',
      key: 'Leave End',
      dataIndex: 'Leave End',
      render: (_, leaveItem) => dayjs(leaveItem.ended_at).format('DD-MM-YYYY'),
    },
    {
      title: 'Leave Type',
      key: 'Leave Type',
      dataIndex: 'Leave Type',
      render: (_, leaveItem) => leaveItem.leave_type ?? '--',
    },
    {
      title: 'Leave Status',
      key: 'Leave Status',
      dataIndex: 'Leave Status',
      render: (_, leaveItem) =>
        leaveItem.leave_status ?? (
          <Button
            shape="round"
            className="bg-brand-grad-1 text-white-1 bg-opacity-70"
            onClick={() => onUpdateLeave({ leaveItem })}
          >
            Update
          </Button>
        ),
    },
    {
      title: 'Action Taken By',
      key: 'Action Taken By',
      dataIndex: 'Action Taken By',
      render: (_, leaveItem) =>
        leaveItem.leave_status ? (
          `${leaveItem.action_taken_by?.user?.first_name} ${leaveItem.action_taken_by?.user?.last_name}`
        ) : (
          <img width={20} height={20} className="m-auto" src={waitingImg} alt="pending" />
        ),
    },
    {
      title: '-',
      key: '-',
      dataIndex: '-',
      width: 50,
      fixed: stickyColumn,
      render: (_, leaveItem) => (
        <Link to={`/leave/details?leaveId=${leaveItem.id}`}>
          <Icon name="ic_open" size={20} color="black-1" />
        </Link>
      ),
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
      <Table<ILeave>
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

export default LeaveTableForUser;
