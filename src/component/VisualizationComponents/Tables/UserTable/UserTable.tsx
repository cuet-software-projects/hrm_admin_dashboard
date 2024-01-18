import { Checkbox, MenuProps, Spin, Tooltip } from 'antd';
import Table, { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useGetRoleListAll } from '../../../../customHooks/roles/useGetRoleListAll';
import { useGetUserListAll } from '../../../../customHooks/users/useUserListAll';
import { utils } from '../../../../helpers/utility';
import useDrawerStore from '../../../../store/drawerStore';
import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import { IUser } from '../../../../types';
import DeleteInfoButtonForTable from '../../../Resuables/DeleteInfoButtonForTable';
import DropDownForTable from '../../../Resuables/DropDownForTable';
import EditInfoButtonForTable from '../../../Resuables/EditInfoButtonForTable';
import Icon from '../../../Resuables/Icon/Icon';
import PictureOrAvatar from '../../../Resuables/PictureOrAvatar';

interface UserTableProps {
  data: IUser[] | undefined;
  isLoading: boolean;
  error: unknown;
  paginationTotal: number;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  handleDelete: (id: string) => void;
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

const UserTable: React.FC<UserTableProps> = ({
  data,
  isLoading,
  error,
  paginationTotal,
  setId,
  handleDelete,
  handleTableChange,
}) => {
  const { stickyColumn } = useTableConfigStore();
  const { handleDrawerOpen, setIsOpenClientDrawer: setClientDrawer } = useDrawerStore();

  // Fetch all the users
  const { data: allUsers, isLoading: isUserDataLoading } = useGetUserListAll();
  const { data: allRoles, isLoading: isRolesLoading } = useGetRoleListAll();

  // Dropdown for filtering the users
  const userDropdown = useMemo(() => {
    return (
      allUsers?.map((user) => ({
        text: `${user.first_name} ${user.last_name}`,
        value: `${user.id}`,
      })) ?? []
    );
  }, [allUsers]);

  // Dropdown for filtering the users based on role type
  const userRoleDropdown = useMemo(() => {
    return (
      allRoles?.map((roleItem) => ({
        text: `${roleItem.name}`,
        value: `${roleItem.id}`,
      })) ?? []
    );
  }, [allUsers]);

  const onEditOptionClicked = ({
    userItem,
    openClientDrawer,
  }: {
    userItem: IUser;
    openClientDrawer?: boolean;
  }) => {
    setId(userItem.id);
    handleDrawerOpen('update');
    if (openClientDrawer) {
      setClientDrawer(openClientDrawer);
    }
  };

  // If an error occurs
  if (error) {
    return <p>An error occured</p>;
  }

  // Configuring the columns of the table
  const columns: ColumnsType<IUser> = [
    {
      title: 'Reg?',
      key: 'is_registered',
      dataIndex: 'is_registered',
      fixed: stickyColumn,
      render: (_, userItem) => (
        <Tooltip
          title={
            userItem.is_registered
              ? 'This user is able to use the system.'
              : 'This user is not able to use the system'
          }
          placement="right"
        >
          <Checkbox checked={userItem.is_registered} disabled={true} />
        </Tooltip>
      ),
    },
    {
      title: 'User',
      key: 'id',
      dataIndex: 'User',
      width: 100,
      fixed: stickyColumn,
      filters: userDropdown,
      filterSearch: true,
      filterIcon: isUserDataLoading ? <Spin /> : undefined,
      render: (_, userItem) => (
        <div className="flex justify-center items-center">
          {<PictureOrAvatar userData={{ user: userItem }} />}
          <span className="ml-5 w-[100px] overflow-ellipsis text-left">{`${userItem.first_name} ${userItem.last_name}`}</span>
        </div>
      ),
    },
    {
      title: 'User Roles',
      key: 'user_roles',
      dataIndex: 'User Roles',
      filters: userRoleDropdown,
      filterSearch: true,
      filterIcon: isRolesLoading ? <Spin /> : undefined,
      render: (_, userItem) => {
        const userRolesList = userItem.roles?.map((role) => role.name);
        return userRolesList && userRolesList.length > 0
          ? userRolesList?.join(', ')
          : '--';
      },
    },
    {
      title: 'User Email',
      key: 'User Email',
      dataIndex: 'User Email',
      render: (_, userItem) => userItem.email ?? '--',
    },
    {
      title: 'Employee ID',
      key: 'Employee ID',
      dataIndex: 'Employee ID',
      render: (_, userItem) => userItem.current_employment_info?.employee_id ?? '--',
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
      fixed: stickyColumn,
      render: (_, userItem: IUser) => (
        <DropDownForTable placement="bottom" items={getDropDownItemList({ userItem })} />
      ),
    },
  ];

  // Action list for dropdown
  function getDropDownItemList({ userItem }: { userItem: IUser }): MenuProps['items'] {
    const labelComponentList = [
      <Link
        key={userItem.id}
        className="table-dropdown-item"
        to={`employee?userId=${userItem.id}`}
      >
        <Icon name="ic_job" color="red" size={28} />
        <span>Employment Info</span>
      </Link>,
      <Link
        key={userItem.id}
        className="table-dropdown-item"
        to={`user-roles?userId=${userItem.id}`}
      >
        <Icon name="ic_user_role" color="white" size={28} />
        <span>Manage Roles</span>
      </Link>,
      <DeleteInfoButtonForTable
        key={userItem.id}
        handleDelete={() => handleDelete(userItem.id)}
      />,
    ];
    if (utils.hasClientRoleOnly({ userData: userItem })) {
      labelComponentList.unshift(
        <a
          key={userItem.id}
          className="table-dropdown-item"
          onClick={() => onEditOptionClicked({ userItem, openClientDrawer: true })}
        >
          <Icon name="ic_pencil" color="black" size={28} />
          <span>Edit Client</span>
        </a>,
      );
    } else {
      labelComponentList.unshift(
        <EditInfoButtonForTable
          key={userItem.id}
          handleEdit={() => onEditOptionClicked({ userItem })}
        />,
      );
    }
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

export default UserTable;
