import './style.css';

import { Button, Table } from 'antd';
import {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React from 'react';

import { utils } from '../../../../helpers/utility';
import { useAttendanceStore } from '../../../../store/attendanceStore/attendanceStore';
import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import { IAttendance } from '../../../../types';
import ExpandableText from '../../../Resuables/ExpandableText';
import Icon from '../../../Resuables/Icon/Icon';
import AttendanceModal from '../../Modals/AttendanceModal';

interface AttendanceInfoTableProps {
  data: IAttendance[] | undefined;
  isLoading: boolean;
  error: unknown;
  paginationTotal: number;
  onAttemptToOpenExitDrawer: ({
    attendanceItem,
  }: {
    attendanceItem: IAttendance;
  }) => void;
  handleTableChange: ({
    pagination,
    filters,
    sorter,
  }: {
    filters: Record<string, FilterValue | null>;
    pagination: TablePaginationConfig;
    sorter: SorterResult<IAttendance> | SorterResult<IAttendance>[];
  }) => void;
  refetch: () => void;
}

const AttendanceTableForEmployee: React.FC<AttendanceInfoTableProps> = ({
  data,
  isLoading,
  error,
  paginationTotal,
  onAttemptToOpenExitDrawer,
  handleTableChange,
  refetch,
}) => {
  // Using required stores
  const { handleOpenAttendanceModal, isAttendanceModalOpen } = useAttendanceStore();
  const { stickyColumn } = useTableConfigStore();

  // If an error occurs
  if (error) {
    return <p>An error occured</p>;
  }

  // Configuring the columns of the table
  const columns: ColumnsType<IAttendance> = [
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'Date',
      width: 120,
      fixed: stickyColumn,
      render: (_, attendanceItem) =>
        dayjs(attendanceItem.entry_time).format('DD-MM-YYYY'),
    },
    {
      title: 'Entry Time',
      key: 'entry_time',
      dataIndex: 'Entry Time',
      width: 120,
      render: (_, attendanceItem) => dayjs(attendanceItem.entry_time).format('hh:mm A'),
    },
    {
      title: 'Exit Time',
      key: 'exit_time',
      dataIndex: 'Exit Time',
      width: 120,
      render: (_, attendanceItem) =>
        attendanceItem.exit_time ? (
          dayjs(attendanceItem.exit_time).format('hh:mm A')
        ) : (
          <Button
            block
            size="middle"
            shape="round"
            className="bg-blue bg-opacity-20"
            onClick={(e) => {
              e.stopPropagation();
              onAttemptToOpenExitDrawer({ attendanceItem });
            }}
          >
            Exit
          </Button>
        ),
    },
    {
      title: 'Work Description',
      key: 'work_descriptions',
      dataIndex: 'Work Description',
      width: 300,
      render: (_, attendanceItem) =>
        attendanceItem.work_descriptions ? (
          <div onClick={(e) => e.stopPropagation()}>
            <ExpandableText text={attendanceItem.work_descriptions} />
          </div>
        ) : (
          '---'
        ),
    },
    {
      title: 'Marking',
      key: 'marking',
      dataIndex: 'Marking',
      width: 100,
      render: (_, attendanceItem) => attendanceItem.markings ?? '--',
    },
    {
      title: 'Working Hours',
      key: 'Working Hours',
      dataIndex: 'Working Hours',
      width: 150,
      render: (_, attendanceItem) => {
        const workingHours =
          attendanceItem.exit_time && attendanceItem.entry_time
            ? utils.calculateWorkingHours({
                entryTime: dayjs(attendanceItem.entry_time).toDate(),
                exitTime: dayjs(attendanceItem.exit_time).toDate(),
                breakDurationHours: attendanceItem.break_duration ?? 0,
              })
            : null;
        return workingHours
          ? `${workingHours.hours} hours ${workingHours.minutes} mins`
          : '--';
      },
    },
    {
      title: '-',
      key: '-',
      dataIndex: '-',
      width: 50,
      fixed: stickyColumn,
      render: (_, attendanceItem: IAttendance) => (
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenAttendanceModal(attendanceItem);
          }}
        >
          <Icon name="ic_open" size={20} color="black-1" />
        </div>
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

  // Open Attendance details modal when a row clicked
  const handleRowClick = (attendanceItem: IAttendance) => {
    return {
      onClick: () => handleOpenAttendanceModal(attendanceItem),
    };
  };

  return (
    <div>
      <Table<IAttendance>
        className="default-table"
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        onRow={handleRowClick}
        onChange={(pagination, filters, sorter) => {
          handleTableChange({ pagination, filters, sorter });
        }}
        pagination={tablePaginationConfig}
        scroll={data && data.length === 0 ? undefined : { x: 'max-content' }}
      />
      {/* This is needed to ensure the form inside it is reinitialized every time with new data */}
      {isAttendanceModalOpen && <AttendanceModal refetch={refetch} />}
    </div>
  );
};

export default AttendanceTableForEmployee;
