import './style.css';

import { Button, DatePicker, Flex, Select, Spin, Table } from 'antd';
import {
  ColumnsType,
  FilterDropdownProps,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React, { Key, useMemo, useState } from 'react';

import useGetAllUsersWhoAreCurrentlyEmployed from '../../../../customHooks/users/useGetAllUsersWhoAreCurrentlyEmployed';
import { utils } from '../../../../helpers/utility';
import { useAttendanceStore } from '../../../../store/attendanceStore/attendanceStore';
import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import { IAttendance } from '../../../../types';
import ExpandableText from '../../../Resuables/ExpandableText';
import Icon from '../../../Resuables/Icon/Icon';
import PictureOrAvatar from '../../../Resuables/PictureOrAvatar';
import AttendanceModal from '../../Modals/AttendanceModal';

interface AttendanceInfoTableProps {
  data: IAttendance[] | undefined;
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
    sorter: SorterResult<IAttendance> | SorterResult<IAttendance>[];
  }) => void;
  refetch: () => void;
  onChangeMark: ({
    attendanceItem,
    mark,
  }: {
    attendanceItem: IAttendance;
    mark: string;
  }) => void;
}

const AttendanceTableForAdmin: React.FC<AttendanceInfoTableProps> = ({
  data,
  isLoading,
  error,
  paginationTotal,
  refetch,
  handleTableChange,
  onChangeMark,
}) => {
  // Using required stores
  const { handleOpenAttendanceModal, markOptions, isAttendanceModalOpen } =
    useAttendanceStore();
  const { stickyColumn } = useTableConfigStore();

  // Fetch employee data required for filtering
  const { data: employeeData, isLoading: isEmployeeDataLoading } =
    useGetAllUsersWhoAreCurrentlyEmployed();

  // State for holding date range
  const [dates, setDates] = useState<(string | undefined)[]>([]);

  // Employee filtering dropdown
  const employeeDropdown = useMemo(() => {
    return (
      employeeData?.map((employee) => ({
        text: `${employee.first_name} ${employee.last_name}`,
        value: `${employee.current_employee_id}`,
      })) ?? []
    );
  }, [employeeData]);

  // handle date picker confirmation
  const handleConfirDateRangePicking = (props: FilterDropdownProps) => {
    props.setSelectedKeys(dates as Key[]);
    props.confirm({ closeDropdown: true });
  };

  // handle date picker reset
  const handleResetDateRangePicking = (props: FilterDropdownProps) => {
    setDates([]);
    props.setSelectedKeys([]);
    props.confirm({ closeDropdown: false });
  };

  // Date range picking dropdown
  const rangePickerDropDown = (props: FilterDropdownProps) => {
    return (
      <Flex vertical className="p-2">
        <DatePicker.RangePicker
          allowClear={false}
          format={'DD-MM-YYYY'}
          value={dates.length > 0 ? [dayjs(dates[0]), dayjs(dates[1])] : undefined}
          onChange={(dates) => {
            if (dates) {
              const choosenDates = dates?.map((date) =>
                date ? date.toDate().toISOString() : undefined,
              );
              setDates(choosenDates);
            }
          }}
        />
        <Flex className="pt-5" justify="end" gap={10}>
          <Button type="link" onClick={() => handleResetDateRangePicking(props)}>
            Reset
          </Button>
          <Button
            type="primary"
            className="bg-blue bg-opacity-30 text-black-1"
            onClick={() => handleConfirDateRangePicking(props)}
          >
            Ok
          </Button>
          <Button type="primary" className="bg-danger" onClick={props.close}>
            Close
          </Button>
        </Flex>
      </Flex>
    );
  };

  // If an error occurs
  if (error) {
    return <p>An error occured</p>;
  }

  // Configuring the columns of the table
  const columns: ColumnsType<IAttendance> = [
    {
      title: 'Employee',
      key: 'employee_id',
      dataIndex: 'Employee',
      width: 100,
      fixed: stickyColumn,
      filters: employeeDropdown,
      filterSearch: true,
      filterIcon: isEmployeeDataLoading ? <Spin /> : undefined,
      render: (_, attendanceItem) => (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex justify-center items-center"
        >
          {attendanceItem.employee_info?.user && (
            <>
              <PictureOrAvatar userData={{ user: attendanceItem.employee_info?.user }} />
              <span className="ml-5 w-[100px] overflow-ellipsis text-left">{`${attendanceItem.employee_info.user.first_name} ${attendanceItem.employee_info.user.last_name}`}</span>
            </>
          )}
        </div>
      ),
    },
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'Date',
      filterDropdown: rangePickerDropDown,
      onFilter: () => dates.length >= 1,
      width: 120,
      render: (_, attendanceItem) =>
        dayjs(attendanceItem.entry_time).format('DD-MM-YYYY'),
    },
    {
      title: 'Employee ID',
      key: 'Employee ID',
      dataIndex: 'Employee ID',
      width: 140,
      render: (_, attendanceItem) => attendanceItem.employee_info?.employee_id,
    },
    {
      title: 'Entry Time',
      key: 'Entry Time',
      dataIndex: 'Entry Time',
      width: 120,
      render: (_, attendanceItem) => dayjs(attendanceItem.entry_time).format('hh:mm A'),
    },
    {
      title: 'Exit Time',
      key: 'Exit Time',
      dataIndex: 'Exit Time',
      width: 120,
      render: (_, attendanceItem) =>
        attendanceItem.exit_time
          ? dayjs(attendanceItem.exit_time).format('hh:mm A')
          : '--',
    },
    {
      title: 'Work Description',
      key: 'Work Description',
      width: 300,
      dataIndex: 'Work Description',
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
      key: 'Marking',
      dataIndex: 'Marking',
      width: 100,
      render: (_, attendanceItem) => (
        <Select
          bordered={!attendanceItem.markings}
          size="large"
          className={`w-full ${attendanceItem.markings ? '' : 'bg-secondary-2'}`}
          placeholder="10"
          options={markOptions}
          onClick={(e) => e.stopPropagation()}
          onChange={(value) => onChangeMark({ attendanceItem, mark: value })}
          value={
            attendanceItem.markings ? attendanceItem.markings.toString() : 'Not marked'
          }
        />
      ),
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
        scroll={{ x: 'max-content' }}
      />
      {/* This is needed to ensure the form inside it is reinitialized every time with new data */}
      {isAttendanceModalOpen && <AttendanceModal refetch={refetch} />}
    </div>
  );
};

export default AttendanceTableForAdmin;
