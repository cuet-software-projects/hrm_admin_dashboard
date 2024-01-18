import { MenuProps, Table } from 'antd';
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface';
import React, { Key } from 'react';
import { Link } from 'react-router-dom';

import useDrawerStore from '../../../../store/drawerStore';
import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import { IUser } from '../../../../types';
import { IEmployee } from '../../../../types/employee.type';
import DeleteInfoButtonForTable from '../../../Resuables/DeleteInfoButtonForTable';
import DropDownForTable from '../../../Resuables/DropDownForTable';
import EditInfoButtonForTable from '../../../Resuables/EditInfoButtonForTable';
import Icon from '../../../Resuables/Icon/Icon';
import PictureOrAvatar from '../../../Resuables/PictureOrAvatar';

interface props {
  data: IUser | undefined;
  isLoading: boolean;
  error: unknown;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  handleDelete: (id: string) => void;
  handlePopup: () => void;
}

const EmploymentTable: React.FC<props> = ({
  data,
  isLoading,
  error,
  setId,
  handleDelete,
  handlePopup,
}) => {
  const { stickyColumn } = useTableConfigStore();
  const { handleDrawerOpen } = useDrawerStore();

  // If an error occurs
  if (error) {
    return <p>An error occured</p>;
  }

  // Configuring the columns of the table
  const columns: ColumnsType<IEmployee> = [
    {
      title: 'Employee',
      key: 'Employee',
      dataIndex: 'Employee',
      width: 100,
      fixed: stickyColumn,
      render: () => (
        <div className="flex justify-center items-center">
          {data && (
            <>
              <PictureOrAvatar userData={{ user: data }} />
              <span className="ml-5 w-[100px] overflow-ellipsis text-left">{`${data.first_name} ${data.last_name}`}</span>
            </>
          )}
        </div>
      ),
    },
    {
      title: 'Employee ID',
      key: 'Employee ID',
      dataIndex: 'Employee ID',
      width: 140,
      render: (_, employeeItem) => employeeItem.employee_id ?? '--',
    },
    {
      title: 'Reporting Officer',
      key: 'Reporting Officer',
      dataIndex: 'Reporting Officer',
      width: 150,
      render: (_, employeeItem) =>
        `${employeeItem.reporting_officer?.first_name} ${employeeItem.reporting_officer?.last_name}`,
    },
    {
      title: 'Branch',
      key: 'Branch',
      dataIndex: 'Branch',
      width: 120,
      render: (_, employeeItem) => employeeItem.branch?.name ?? '--',
    },
    {
      title: 'Department',
      key: 'Department',
      dataIndex: 'Department',
      width: 120,
      render: (_, employeeItem) => employeeItem.department?.name ?? '--',
    },
    {
      title: 'Designation',
      key: 'Designation',
      dataIndex: 'Designation',
      width: 120,
      render: (_, employeeItem) =>
        employeeItem.current_employee_designation?.name ?? '--',
    },
    {
      title: 'Salary',
      key: 'Salary',
      dataIndex: 'Salary',
      width: 120,
      render: (_, employeeItem) => employeeItem.current_salary ?? '--',
    },
    {
      title: '-',
      key: '-',
      dataIndex: '-',
      width: 50,
      fixed: stickyColumn,
      render: (_, employeeItem) => (
        <DropDownForTable items={getDropDownItemList({ employeeItem })} />
      ),
    },
  ];

  // Action list for dropdown
  function getDropDownItemList({
    employeeItem,
  }: {
    employeeItem: IEmployee;
  }): MenuProps['items'] {
    const labelComponentList = [
      <EditInfoButtonForTable
        key={0}
        handleEdit={() => {
          setId(employeeItem.id);
          handleDrawerOpen('update');
        }}
      />,
      <Link
        key={1}
        to={`designation-history?employeeId=${employeeItem.id}&designationId=${employeeItem.current_designation_id}`}
        className="table-dropdown-item"
      >
        <Icon name="ic_history" color="silver" size={28} />
        <span>Designation History</span>
      </Link>,
      <DeleteInfoButtonForTable
        key={2}
        handleDelete={() => handleDelete(employeeItem.id)}
      />,
    ];
    return labelComponentList.map((component, index) => ({
      key: index,
      label: component,
    }));
  }

  const rowSelection: TableRowSelection<IEmployee> = {
    type: 'radio',
    selectedRowKeys: [data?.current_employee_id as Key],
    onChange: (selectedRowKeys: React.Key[], selectedRows: IEmployee[]) => {
      setId(selectedRows[0].id);
      handlePopup();
    },
  };

  return (
    <div>
      <Table<IEmployee>
        className="default-table"
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data?.employment_infos}
        loading={isLoading}
        pagination={false}
        scroll={
          data && data.employment_infos?.length === 0 ? undefined : { x: 'max-content' }
        }
      />
    </div>
  );
};

export default EmploymentTable;
