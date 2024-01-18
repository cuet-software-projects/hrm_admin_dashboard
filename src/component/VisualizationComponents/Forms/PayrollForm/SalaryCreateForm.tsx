import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';

import { PayrollCreateSchemaType } from '../../../../schema/PayrollSchema';
import { usePayrollStore } from '../../../../store/payrollStore/payrollStore';
import { IUser } from '../../../../types';
import Loading from '../../../Resuables/Loader';
import SalaryBonusInputWithReason from './components/SalaryBonusInputWithReason';
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

const SalaryCreateForm: React.FC<props> = ({ currentEmployeeData, isLoading, error }) => {
  const { setEmployeeId } = usePayrollStore();
  const [showForm, setShowForm] = useState<boolean>(false);
  const { values, setValues, handleSubmit } = useFormikContext<PayrollCreateSchemaType>();
  const [date, setDate] = useState<Date | string | null>(null);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>An error occured. Please try again.</p>;
  }

  // on employee change
  const handleEmployeeChange = (value: string) => {
    setEmployeeId(value);
    setShowForm(true);
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
      <SalaryEmployeeSelect
        isCreateMode={true}
        allCurrentEmployeeData={currentEmployeeData}
        handleChange={handleEmployeeChange}
      />

      {showForm && (
        <form className="flex-1 overflow-auto w-full mb-20" onSubmit={handleSubmit}>
          <SalaryDateSelect date={date} handleDateSelect={handleDateSelect} />

          <SalaryInput isCreateMode={true} />

          <SalaryStatusSelect
            isCreateMode={true}
            handleStatusChange={handleStatusChange}
          />

          <SalaryBonusInputWithReason />

          <SalarySubmitButton isCreateMode={true} />
        </form>
      )}
    </div>
  );
};

export default SalaryCreateForm;
