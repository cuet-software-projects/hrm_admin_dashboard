import { MenuProps, Table } from 'antd';
import {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';

import useGetAllUsersWhoAreCurrentlyEmployed from '../../../../customHooks/users/useGetAllUsersWhoAreCurrentlyEmployed';
import useDrawerStore from '../../../../store/drawerStore';
import { usePayrollStore } from '../../../../store/payrollStore/payrollStore';
import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import { IPayroll } from '../../../../types/payroll.type';
import DropDownForTable from '../../../Resuables/DropDownForTable';
import EditInfoButtonForTable from '../../../Resuables/EditInfoButtonForTable';
import PictureOrAvatar from '../../../Resuables/PictureOrAvatar';
import StatusBadge from '../../../Resuables/StatusBadge';

interface SalaryTableForAdminProps {
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

const SalaryTableForAdmin: React.FC<SalaryTableForAdminProps> = ({
  data,
  isLoading,
  error,
  paginationTotal,
  handleTableChange,
}) => {
  const { stickyColumn } = useTableConfigStore();
  const { handleDrawerOpen } = useDrawerStore();
  const { setSalaryId: setPayrollId, setEmployeeId } = usePayrollStore();

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
  const columns: ColumnsType<IPayroll> = [
    {
      title: 'Employee',
      key: 'employee_id',
      dataIndex: 'Employee',
      width: 100,
      fixed: stickyColumn,
      filters: employeeDropdown,
      filterSearch: true,
      render: (_, payrollItem) => (
        <div className="flex justify-center items-center">
          {payrollItem.employee_info?.user && (
            <>
              <PictureOrAvatar userData={{ user: payrollItem.employee_info.user }} />
              <span className="ml-5 w-[100px] overflow-ellipsis text-left">{`${payrollItem.employee_info.user.first_name} ${payrollItem.employee_info.user.last_name}`}</span>
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
      render: (_, payrollItem) => payrollItem.employee_info?.employee_id,
    },
    {
      title: 'Date',
      key: 'Date',
      dataIndex: 'Date',
      width: 120,
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
    {
      title: '-',
      key: '-',
      dataIndex: '-',
      width: 50,
      fixed: stickyColumn,
      render: (_, payrollItem) => (
        <DropDownForTable items={getDropDownItemList({ payrollItem })} />
      ),
    },
  ];

  // Action list for dropdown
  function getDropDownItemList({
    payrollItem,
  }: {
    payrollItem: IPayroll;
  }): MenuProps['items'] {
    const labelComponentList = [
      <EditInfoButtonForTable
        key={0}
        handleEdit={() => {
          setEmployeeId(payrollItem.employee_id ?? null);
          setPayrollId(payrollItem.id);
          handleDrawerOpen('update');
        }}
      />,
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

export default SalaryTableForAdmin;
