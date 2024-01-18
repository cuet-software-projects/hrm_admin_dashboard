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
import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import { IBonus } from '../../../../types/bonus.type';
import DropDownForTable from '../../../Resuables/DropDownForTable';
import EditInfoButtonForTable from '../../../Resuables/EditInfoButtonForTable';
import PictureOrAvatar from '../../../Resuables/PictureOrAvatar';
import StatusBadge from '../../../Resuables/StatusBadge';

interface BonusTableForAdminProps {
  data: IBonus[] | undefined;
  isLoading: boolean;
  error: unknown;
  paginationTotal: number;
  onEditButtonClicked: (bonusItem: IBonus) => void;
  handleTableChange: ({
    pagination,
    filters,
    sorter,
  }: {
    filters: Record<string, FilterValue | null>;
    pagination: TablePaginationConfig;
    sorter: SorterResult<IBonus> | SorterResult<IBonus>[];
  }) => void;
}

const BonusTableForAdmin: React.FC<BonusTableForAdminProps> = ({
  data,
  isLoading,
  error,
  paginationTotal,
  onEditButtonClicked,
  handleTableChange,
}) => {
  const { stickyColumn } = useTableConfigStore();

  // fetch all current employees
  const { data: employeeData } = useGetAllUsersWhoAreCurrentlyEmployed();

  // Dropdown for employee filter
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
  const columns: ColumnsType<IBonus> = [
    {
      title: 'Employee',
      key: 'employee_id',
      dataIndex: 'Employee',
      width: 100,
      filters: employeeDropdown,
      filterSearch: true,
      fixed: stickyColumn,
      render: (_, bonusItem) => (
        <div className="flex justify-center items-center">
          {bonusItem.employee_info?.user && (
            <>
              <PictureOrAvatar userData={{ user: bonusItem.employee_info.user }} />
              <span className="ml-5 w-[100px] overflow-ellipsis text-left">{`${bonusItem.employee_info.user.first_name} ${bonusItem.employee_info.user.last_name}`}</span>
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
      render: (_, bonusItem) => bonusItem.employee_info?.employee_id,
    },
    {
      title: 'Date',
      key: 'Date',
      dataIndex: 'Date',
      width: 120,
      render: (_, bonusItem) => dayjs(bonusItem.date).format('DD-MM-YYYY'),
    },
    {
      title: 'Bonus',
      key: 'Bonus',
      dataIndex: 'Bonus',
      width: 120,
      render: (_, bonusItem) => bonusItem.bonus ?? '--',
    },
    {
      title: 'Reason',
      key: 'Reason',
      dataIndex: 'Reason',
      width: 120,
      render: (_, bonusItem) => bonusItem.reason ?? '--',
    },
    {
      title: 'Status',
      key: 'Status',
      dataIndex: 'Status',
      width: 120,
      render: (_, bonusItem) =>
        bonusItem.status ? <StatusBadge status={bonusItem.status} /> : '--',
    },
    {
      title: '-',
      key: '-',
      dataIndex: '-',
      width: 50,
      fixed: stickyColumn,
      render: (_, bonusItem) => (
        <DropDownForTable items={getDropDownItemList({ bonusItem })} />
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

  // Action list for dropdown
  function getDropDownItemList({ bonusItem }: { bonusItem: IBonus }): MenuProps['items'] {
    const labelComponentList = [
      <EditInfoButtonForTable
        key={0}
        handleEdit={() => onEditButtonClicked(bonusItem)}
      />,
    ];
    return labelComponentList.map((component, index) => ({
      key: index,
      label: component,
    }));
  }
  return (
    <div>
      <Table<IBonus>
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

export default BonusTableForAdmin;
