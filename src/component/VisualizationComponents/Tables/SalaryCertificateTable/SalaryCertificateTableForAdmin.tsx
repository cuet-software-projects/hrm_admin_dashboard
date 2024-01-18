import Table, { ColumnsType } from 'antd/es/table';
import {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';

import useGetAllUsersWhoAreCurrentlyEmployed from '../../../../customHooks/users/useGetAllUsersWhoAreCurrentlyEmployed';
import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import { SALARY_CERTIFICATE_STATUS_TYPE } from '../../../../types';
import { ISalaryCertificate } from '../../../../types/salary-certificate.type';
import { SALARY_CERTIFICATE_STATUS_VALUES } from '../../../../types/values';
import PictureOrAvatar from '../../../Resuables/PictureOrAvatar';
import Select from '../../../Resuables/Select/Select';

interface SalaryCertificateTableProps {
  data: ISalaryCertificate[] | undefined;
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
    sorter: SorterResult<ISalaryCertificate> | SorterResult<ISalaryCertificate>[];
  }) => void;
  onChangeSalaryCertificateStatus: ({
    salaryCertificateItem,
    statusValue,
  }: {
    salaryCertificateItem: ISalaryCertificate;
    statusValue: SALARY_CERTIFICATE_STATUS_TYPE;
  }) => void;
}

const SalaryCertificateTableForAdmin: React.FC<SalaryCertificateTableProps> = ({
  data,
  isLoading,
  error,
  paginationTotal,
  handleTableChange,
  onChangeSalaryCertificateStatus,
}) => {
  const { stickyColumn } = useTableConfigStore();

  // Fetch all current employees
  const { data: employeeData } = useGetAllUsersWhoAreCurrentlyEmployed();

  // dropdown for the emplyee search
  const employeeDropdown = useMemo(() => {
    return (
      employeeData?.map((employee) => ({
        text: `${employee.first_name} ${employee.last_name}`,
        value: `${employee.id}`,
      })) ?? []
    );
  }, [employeeData]);

  // If an error occurs
  if (error) {
    return <p>An error occured</p>;
  }

  // Configuring the columns of the table
  const columns: ColumnsType<ISalaryCertificate> = [
    {
      title: 'User',
      key: 'user_id',
      dataIndex: 'User',
      width: 100,
      fixed: stickyColumn,
      filters: employeeDropdown,
      filterSearch: true,
      render: (_, salaryCertificateItem) => (
        <div className="flex justify-start items-center">
          {salaryCertificateItem?.user && (
            <PictureOrAvatar userData={{ user: salaryCertificateItem?.user }} />
          )}
          <span className="ml-5 w-[100px] overflow-ellipsis text-left">{`${salaryCertificateItem?.user?.first_name} ${salaryCertificateItem.user?.last_name}`}</span>
        </div>
      ),
    },
    {
      title: 'Created Date',
      key: 'Created Date',
      dataIndex: 'Created Date',
      render: (_, salaryCertificateItem) =>
        salaryCertificateItem.created_at
          ? dayjs(salaryCertificateItem.created_at).format('DD-MM-YYYY')
          : '--',
    },
    {
      title: 'Updated Date',
      key: 'Updated Date',
      dataIndex: 'Updated Date',
      render: (_, salaryCertificateItem) =>
        salaryCertificateItem.updated_at
          ? dayjs(salaryCertificateItem.updated_at).format('DD-MM-YYYY')
          : '--',
    },
    {
      title: 'Salary',
      key: 'Salary',
      dataIndex: 'Salary',
      render: (_, salaryCertificateItem) => salaryCertificateItem.current_salary ?? '--',
    },
    {
      title: 'Designation',
      key: 'Designation',
      dataIndex: 'Designation',
      render: (_, salaryCertificateItem) =>
        salaryCertificateItem.current_designation ?? '--',
    },
    {
      title: 'Desired Issue Date',
      key: 'Desired Issue Date',
      dataIndex: 'Desired Issue Date',
      render: (_, salaryCertificateItem) =>
        salaryCertificateItem.issue_date
          ? dayjs(salaryCertificateItem.issue_date).format('DD-MM-YYYY')
          : '--',
    },
    {
      title: 'Reason',
      key: 'Reason',
      dataIndex: 'Reason',
      render: (_, salaryCertificateItem) => salaryCertificateItem.reason ?? '--',
    },
    {
      title: 'Status',
      key: 'Status',
      dataIndex: 'Status',
      render: (_, salaryCertificateItem) => salaryCertificateItem.status ?? '--',
    },
    {
      title: '-',
      key: '-',
      dataIndex: '-',
      width: 150,
      fixed: stickyColumn,
      render: (_, salaryCertificateItem) => (
        <Select
          className="w-full bg-white-1"
          bordered={!salaryCertificateItem.status}
          options={SALARY_CERTIFICATE_STATUS_VALUES.map((value) => ({
            label: value,
            value: value,
          }))}
          onChange={(value) =>
            onChangeSalaryCertificateStatus({
              salaryCertificateItem: salaryCertificateItem,
              statusValue: value,
            })
          }
          value={salaryCertificateItem.status ?? undefined}
        />
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
      <Table<ISalaryCertificate>
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

export default SalaryCertificateTableForAdmin;
