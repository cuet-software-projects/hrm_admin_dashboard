import { Alert } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useUserDetails } from '../../../../customHooks/users/useUserDetails';
import { utils } from '../../../../helpers/utility';
import UserService from '../../../../service/user.service';
import { IRole } from '../../../../types/role.type';
import Button from '../../../Resuables/Button/Button';
import PictureOrAvatar from '../../../Resuables/PictureOrAvatar';

interface UserRoleListTableProps {
  data: IRole[] | undefined;
  isLoading: boolean;
  error: unknown;
}

const UserRoleListTable: React.FC<UserRoleListTableProps> = ({
  data: rolesData,
  isLoading: isLoadingRolesData,
  error: errorRolesData,
}) => {
  // Get the params named userId
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');

  // Fetch User Data
  const {
    data: userData,
    isLoading: isLoadingUserData,
    error: errorUserData,
    refetch: refetchUserData,
  } = useUserDetails({ userId: userId });

  // If an error occurs
  if (errorUserData || errorRolesData) {
    return <p>An error occured</p>;
  }

  // Configuring the columns of the table
  const columns: ColumnsType<IRole> = [
    {
      title: 'Role Name',
      key: 'Role Name',
      dataIndex: 'Role Name',
      width: 120,
      render: (_, roleItem) => roleItem.name,
    },
    {
      title: 'Role Description',
      key: 'Role Description',
      dataIndex: 'Role Description',
      width: 120,
      render: (_, roleItem) => roleItem.description ?? '--',
    },
  ];

  const [roleIds, setRoleIds] = useState<string[]>();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const handleConfirmRoleUpdate = async () => {
    try {
      setSubmitting(true);
      const roleIdList = roleIds;
      if (userId && userData?.roles && roleIdList) {
        const selectedValuesAreLikePrevious = utils.arraysAreEqual({
          arr1: roleIdList,
          arr2: userData?.roles?.map((item) => item.id),
        });
        if (!selectedValuesAreLikePrevious) {
          await UserService.updateRolesOfUser({
            userId: userId,
            roleIdList: roleIdList,
          });
          refetchUserData();
          setRoleIds([]);
        } else {
          alert("Roles weren't changed");
        }
        setSubmitting(false);
      }
    } catch (error) {
      setSubmitting(false);
    }
  };

  const rowSelectionConfig: TableRowSelection<IRole> = {
    type: 'checkbox',
    defaultSelectedRowKeys: userData?.roles?.map((role) => role.id),
    onChange: (rowKeys) => {
      setRoleIds(rowKeys as string[]);
    },
  };

  return userId && userData && rolesData ? (
    <div className="overflow-x-auto lg:overflow-x-visible lg:px-none min-h-[500px]">
      <Alert
        className="mb-8 border-2 border-brand-grad-1"
        message={
          <div className="flex items-center">
            <span>N.B. You are going to assign roles to:</span>
          </div>
        }
        description={
          <>
            <div className="flex items-center w-fit p-2 rounded border border-black-1 border-dashed">
              <PictureOrAvatar userData={{ user: userData }} />
              <span className="font-bold pl-2">
                {userData.first_name} {userData.last_name}
              </span>
            </div>
            <p className="font-semibold mt-3">
              Remember choosing proper roles is very important. So be cautious.
            </p>
          </>
        }
        type="warning"
        showIcon
        closable={false}
      />
      <Table<IRole>
        className="default-table"
        rowKey="id"
        rowSelection={rowSelectionConfig}
        columns={columns}
        dataSource={rolesData}
        loading={isLoadingRolesData || isLoadingUserData}
        scroll={rolesData && rolesData.length === 0 ? undefined : { x: 'max-content' }}
        pagination={false}
      />
      <div className="py-5 w-full flex justify-center">
        <Button
          isLoading={isSubmitting}
          className="mx-auto"
          onClick={handleConfirmRoleUpdate}
        >
          Confirm Role Update
        </Button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default UserRoleListTable;
