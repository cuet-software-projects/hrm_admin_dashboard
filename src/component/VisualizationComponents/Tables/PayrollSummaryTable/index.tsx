import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React from 'react';

import { userRoles } from '../../../../constants/GlobalConstants';
import useAuthStore from '../../../../store/authStore';
import { IPayroll } from '../../../../types/payroll.type';
import PictureOrAvatar from '../../../Resuables/PictureOrAvatar';
import StatusBadge from '../../../Resuables/StatusBadge';

interface PayrollSummaryTableProps {
  data: IPayroll[] | undefined;
  isLoading: boolean;
  error: unknown;
}

const PayrollSummaryTable: React.FC<PayrollSummaryTableProps> = ({
  data,
  isLoading,
  error,
}) => {
  const { role } = useAuthStore();

  // If an error occurs
  if (error) {
    return <p>An error occured</p>;
  }

  // Configuring the columns of the table
  const columns: ColumnsType<IPayroll> = [
    {
      title: 'Date',
      key: 2,
      dataIndex: 'Date',
      width: 120,
      render: (_, payrollItem) => dayjs(payrollItem.date).format('DD-MM-YYYY'),
    },
    {
      title: 'Salary',
      key: 3,
      dataIndex: 'Salary',
      width: 120,
      render: (_, payrollItem) => payrollItem.salary ?? '--',
    },
    {
      title: 'Status',
      key: 4,
      dataIndex: 'Status',
      width: 120,
      render: (_, payrollItem) =>
        payrollItem.status ? <StatusBadge status={payrollItem.status} /> : '--',
    },
  ];

  if (role === userRoles.admin || role === userRoles.manager) {
    columns.unshift(
      {
        title: 'Employee',
        key: 0,
        dataIndex: 'Employee',
        width: 100,
        fixed: 'left',
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
        key: 1,
        dataIndex: 'Employee ID',
        width: 150,
        render: (_, payrollItem) => payrollItem.employee_info?.employee_id,
      },
    );
  }

  return (
    <div>
      <Table<IPayroll>
        className="default-table"
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        scroll={data && data.length === 0 ? undefined : { x: 'max-content' }}
      />
    </div>
  );
};

export default PayrollSummaryTable;
