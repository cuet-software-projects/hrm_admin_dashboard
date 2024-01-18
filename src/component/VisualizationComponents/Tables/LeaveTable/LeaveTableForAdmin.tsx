import { Select, Table } from 'antd';
import {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { Link } from 'react-router-dom';

import waitingImg from '../../../../assets/icons/waiting.png';
import useGetAllUsersWhoAreCurrentlyEmployed from '../../../../customHooks/users/useGetAllUsersWhoAreCurrentlyEmployed';
import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import { LEAVE_STATUS_TYPE } from '../../../../types';
import { ILeave } from '../../../../types/leave.type';
import { LEAVE_STATUS_VALUE } from '../../../../types/values';
import Icon from '../../../Resuables/Icon/Icon';
import PictureOrAvatar from '../../../Resuables/PictureOrAvatar';

interface LeaveTableForAdminProps {
  data: ILeave[] | undefined;
  isLoading: boolean;
  error: unknown;
  paginationTotal: number;
  setEmployeeId: Dispatch<SetStateAction<string>>;
  handleTableChange: ({
    pagination,
    filters,
    sorter,
  }: {
    filters: Record<string, FilterValue | null>;
    pagination: TablePaginationConfig;
    sorter: SorterResult<ILeave> | SorterResult<ILeave>[];
  }) => void;
  onChangeLeaveStatus: ({
    leaveItem,
    leaveStatusValue,
  }: {
    leaveItem: ILeave;
    leaveStatusValue: LEAVE_STATUS_TYPE;
  }) => void;
}

const LeaveTableForAdmin: React.FC<LeaveTableForAdminProps> = ({
  data,
  isLoading,
  error,
  paginationTotal,
  setEmployeeId,
  handleTableChange,
  onChangeLeaveStatus,
}) => {
  const { stickyColumn } = useTableConfigStore();

  const { data: employeeData } = useGetAllUsersWhoAreCurrentlyEmployed();

  const employeeDropdown = useMemo(() => {
    return (
      employeeData?.map((employee) => ({
        text: `${employee.first_name} ${employee.last_name}`,
        value: `${employee.current_employee_id}`,
      })) ?? []
    );
  }, [employeeData]);

  // If an error occurs
  if (error) {
    return <p>An error occured</p>;
  }

  // Configuring the columns of the table
  const columns: ColumnsType<ILeave> = [
    {
      title: 'Employee',
      key: 'employee_id',
      dataIndex: 'Employee',
      width: 100,
      filters: employeeDropdown,
      filterSearch: true,
      fixed: stickyColumn,
      render: (_, leaveItem) => (
        <div className="flex justify-center items-center">
          {leaveItem.employee_info?.user && (
            <>
              <PictureOrAvatar userData={{ user: leaveItem.employee_info.user }} />
              <span className="ml-5 w-[100px] overflow-ellipsis text-left">{`${leaveItem.employee_info.user.first_name} ${leaveItem.employee_info.user.last_name}`}</span>
            </>
          )}
        </div>
      ),
    },
    {
      title: 'Employee ID',
      key: 'Employee ID',
      dataIndex: 'Employee ID',
      width: 150,
      render: (_, leaveItem) => leaveItem.employee_info?.employee_id,
    },
    {
      title: 'Leave Start',
      key: 'Leave Start',
      dataIndex: 'Leave Start',
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
      width: 150,
      dataIndex: 'Leave Status',
      render: (_, leaveItem) => (
        <Select
          size="large"
          bordered={!leaveItem.leave_status}
          className={`w-full ${leaveItem.leave_status ? '' : 'bg-secondary-2'}`}
          placeholder="Status"
          options={LEAVE_STATUS_VALUE.map((leaveStatus) => ({
            label: leaveStatus,
            value: leaveStatus,
          }))}
          onChange={(value) =>
            onChangeLeaveStatus({ leaveItem, leaveStatusValue: value })
          }
          value={leaveItem.leave_status}
        />
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

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: ILeave[]) => {
      setEmployeeId(selectedRows[0].employee_id);
    },
    getCheckboxProps: (record: ILeave) => ({
      id: record.id,
    }),
  };

  return (
    <div>
      <Table<ILeave>
        className="default-table"
        rowKey="id"
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
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

export default LeaveTableForAdmin;
