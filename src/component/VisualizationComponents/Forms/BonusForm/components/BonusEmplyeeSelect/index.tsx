import { Select } from 'antd';
import React from 'react';

import { utils } from '../../../../../../helpers/utility';
import { usePayrollStore } from '../../../../../../store/payrollStore/payrollStore';
import { IUser } from '../../../../../../types';
import Label from '../../../../../Resuables/Label';
import PictureOrAvatar from '../../../../../Resuables/PictureOrAvatar';

interface props {
  isCreateMode: boolean;
  allCurrentEmployeeData: IUser[] | undefined;
  handleChange: (value: string) => void;
}

const { Option } = Select;

const BonusEmployeeSelect: React.FC<props> = ({
  isCreateMode,
  allCurrentEmployeeData,
  handleChange,
}) => {
  const { isConfirmEmployeeChange, employeeId } = usePayrollStore();

  return (
    <div className="w-full">
      <Label htmlFor="employee_id">Select an Employee</Label>
      <br />
      <Select
        disabled={!isCreateMode && !isConfirmEmployeeChange}
        id="employee_id"
        size="large"
        showSearch
        optionLabelProp="label"
        value={employeeId ? employeeId : undefined}
        placeholder="Select an Employee"
        filterOption={utils.onFilterOption}
        onChange={handleChange}
        className="w-full mt-2 text-black-1 outline-none"
      >
        {allCurrentEmployeeData &&
          allCurrentEmployeeData.map((employeeItem) => {
            return (
              <Option
                key={employeeItem.id}
                value={employeeItem.current_employee_id}
                label={`${employeeItem.first_name} ${employeeItem.last_name}`}
              >
                <div className="flex justify-start items-center">
                  <PictureOrAvatar userData={{ user: employeeItem }} />
                  <span className="ml-2 w-[100px] overflow-ellipsis text-left">{`${employeeItem.first_name} ${employeeItem.last_name}`}</span>
                </div>
              </Option>
            );
          })}
      </Select>
    </div>
  );
};

export default BonusEmployeeSelect;
