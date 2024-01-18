import { Checkbox, Spin, Table, Tooltip } from 'antd';
import {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import { useMemo } from 'react';

import { useGetUserListAll } from '../../../../customHooks/users/useUserListAll';
import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import { IEmployee } from '../../../../types/employee.type';
import PictureOrAvatar from '../../../Resuables/PictureOrAvatar';

interface props {
  data: IEmployee[] | undefined;
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
    sorter: SorterResult<IEmployee> | SorterResult<IEmployee>[];
  }) => void;
}

const EmployeeTable: React.FC<props> = ({
  data,
  isLoading,
  handleTableChange,
  paginationTotal,
}) => {
  const { stickyColumn } = useTableConfigStore();

  // Fetch all the users
  const { data: allUsers, isLoading: isUserDataLoading } = useGetUserListAll();

  // Dropdown for filtering the users
  const userDropdown = useMemo(() => {
    return (
      allUsers?.map((user) => ({
        text: `${user.first_name} ${user.last_name}`,
        value: `${user.id}`,
      })) ?? []
    );
  }, [allUsers]);

  // Dropdown for filtering available employees
  const availabilityDropdown = useMemo(() => {
    return [
      { text: 'On Leave', value: 'ON_LEAVE' },
      { text: 'Available', value: 'ACTIVE' },
    ];
  }, []);

  // Configuring the columns of the table
  const columns: ColumnsType<IEmployee> = [
    {
      title: 'Available?',
      key: 'current_status',
      dataIndex: 'is_available',
      fixed: stickyColumn,
      width: 50,
      filters: availabilityDropdown,
      render: (_, employeeItem) => (
        <Tooltip
          title={
            employeeItem.is_available
              ? 'He is available to contact'
              : 'He is not available to contact'
          }
          placement="right"
        >
          <Checkbox checked={employeeItem.is_available} disabled={true} />
        </Tooltip>
      ),
    },
    {
      title: 'Employee',
      key: 'id',
      dataIndex: 'employee',
      width: 100,
      filters: userDropdown,
      filterSearch: true,
      filterIcon: isUserDataLoading ? <Spin /> : undefined,
      render: (_, employeeItem) => (
        <div className="flex justify-center items-center">
          {employeeItem && employeeItem.user && (
            <>
              <PictureOrAvatar userData={{ user: employeeItem.user }} />
              <span className="ml-5 w-[100px] overflow-ellipsis text-left">{`${employeeItem.user.first_name} ${employeeItem.user.last_name}`}</span>
            </>
          )}
        </div>
      ),
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      render: (_, employeeItem) => (
        <a href={`mailto:${employeeItem.user?.email}`}>
          {employeeItem.user?.email ?? '--'}
        </a>
      ),
    },
    {
      title: 'Phone',
      key: 'contact_number',
      dataIndex: 'phone',
      render: (_, employeeItem) => (
        <a href={`tel:${employeeItem.user?.contact_number}`}>
          {employeeItem.user?.contact_number ?? '--'}
        </a>
      ),
    },
    {
      title: 'Department',
      key: 'department_id',
      dataIndex: 'department',
      render: (_, employeeItem) => employeeItem.department?.name,
    },
    {
      title: 'Branch',
      key: 'branch_id',
      dataIndex: 'branch',
      width: 100,
      fixed: stickyColumn,
      render: (_, employeeItem) => employeeItem.branch?.name ?? '--',
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
      <Table<IEmployee>
        className="default-table"
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        bordered
        onChange={(pagination, filters, sorter) => {
          handleTableChange({ pagination, filters, sorter });
        }}
        pagination={tablePaginationConfig}
        scroll={data && data.length === 0 ? undefined : { x: 'max-content' }}
      />
    </div>
  );
};

export default EmployeeTable;
