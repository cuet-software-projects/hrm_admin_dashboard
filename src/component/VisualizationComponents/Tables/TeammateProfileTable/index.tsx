import { Table } from 'antd';
import {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import React from 'react';
import { Link } from 'react-router-dom';

import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import { IUser } from '../../../../types';
import Icon from '../../../Resuables/Icon/Icon';
import PictureOrAvatar from '../../../Resuables/PictureOrAvatar';

interface TeammateProfileTableProps {
  data: IUser[] | undefined;
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
    sorter: SorterResult<IUser> | SorterResult<IUser>[];
  }) => void;
}

const TeammateProfileTable: React.FC<TeammateProfileTableProps> = ({
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
  const columns: ColumnsType<IUser> = [
    {
      title: 'User',
      key: 'User',
      dataIndex: 'User',
      width: 100,
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
      fixed: stickyColumn,
      render: (_, userItem) => (
        <div className="flex justify-center items-center">
          {<PictureOrAvatar userData={{ user: userItem }} />}
          <span className="ml-5 w-[100px] overflow-ellipsis text-left">{`${userItem.first_name} ${userItem.last_name}`}</span>
        </div>
      ),
    },
    {
      title: 'User Email',
      key: 'User Email',
      dataIndex: 'User Email',
      width: 100,
      render: (_, userItem) => userItem.email ?? '--',
    },
    {
      title: 'Employee ID',
      key: 'Employee ID',
      dataIndex: 'Employee ID',
      width: 150,
      render: (_, userItem) =>
        userItem.current_employment_info?.employee_id ?? (
          <span className="text-danger">Not an Employee yet</span>
        ),
    },
    {
      title: 'Contact No',
      key: 'Contact No',
      dataIndex: 'Contact No',
      render: (_, userItem) => userItem.contact_number ?? '--',
    },
    {
      title: 'Designation',
      key: 'Designation',
      dataIndex: 'Designation',
      render: (_, userItem) =>
        userItem.current_employment_info?.current_employee_designation?.name ?? '--',
    },
    {
      title: '-',
      key: '-',
      dataIndex: '-',
      width: 50,
      fixed: stickyColumn,
      render: (_, userItem) => (
        <Link to={`/user-profile?userId=${userItem.id}`}>
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
      <Table<IUser>
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

export default TeammateProfileTable;
