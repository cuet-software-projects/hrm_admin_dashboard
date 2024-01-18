import { Flex } from 'antd';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';

import { PayrollUpdateSchemaType } from '../../../../schema/PayrollSchema';
import { usePayrollStore } from '../../../../store/payrollStore/payrollStore';
import { IUser } from '../../../../types';
import Loading from '../../../Resuables/Loader';
import PopupConfirmEmployeeChange from '../../../Resuables/PopupConfirmEmployeeChange';
import SalaryDateSelect from './components/SalaryDateSelect';
import SalaryEmployeeSelect from './components/SalaryEmployeeSelect';
import SalaryInput from './components/SalarySalaryInput';
import SalaryStatusSelect from './components/SalaryStatusSelect';
import SalarySubmitButton from './components/SalarySubmitButton';

interface props {
  currentEmployeeData: IUser[] | undefined;
  isLoading: boolean;
  error: unknown;
}

const SalaryUpdateForm: React.FC<props> = ({ currentEmployeeData, isLoading, error }) => {
  const { setEmployeeId } = usePayrollStore();

  const { values, handleSubmit, setValues } = useFormikContext<PayrollUpdateSchemaType>();

  const [date, setDate] = useState<Date | string | null>(values.date ?? '');

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>An error occured. Please try again.</p>;
  }

  // on Employee change
  const handleEmployeeChange = (value: string) => {
    setEmployeeId(value);
    setValues({
      ...values,
      salary:
        currentEmployeeData?.find((item) => item.current_employee_id === value)
          ?.current_employment_info?.current_salary ?? 0,
    });
  };

  // On Date Select
  const handleDateSelect = (date: Date) => {
    setDate(date);
    setValues({ ...values, date: dayjs(date).format('YYYY-MM-DD') });
  };

  // On Select status
  const handleStatusChange = (value: string) => setValues({ ...values, status: value });

  return (
    <div className="px-2 h-full w-full flex flex-col">
      <form className="flex-1 overflow-auto w-full mb-20" onSubmit={handleSubmit}>
        <Flex gap={10} align="start">
          {/* Confirm employee change */}
          <PopupConfirmEmployeeChange
            info="If you do this, do not forget to change the bonus related to this payroll from
          bonus section."
          />
          <SalaryEmployeeSelect
            isCreateMode={false}
            allCurrentEmployeeData={currentEmployeeData}
            handleChange={handleEmployeeChange}
          />
        </Flex>

        {/* Date */}
        <SalaryDateSelect date={date} handleDateSelect={handleDateSelect} />

        {/* Salary */}
        <SalaryInput isCreateMode={false} />

        {/* Status */}
        <SalaryStatusSelect
          isCreateMode={false}
          handleStatusChange={handleStatusChange}
        />

        {/* Submit button */}
        <SalarySubmitButton isCreateMode={false} />
      </form>
    </div>
  );
};

export default SalaryUpdateForm;
