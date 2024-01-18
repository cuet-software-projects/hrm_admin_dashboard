import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';

import { BonusCreateSchemaType } from '../../../../schema/BonusSchema';
import { usePayrollStore } from '../../../../store/payrollStore/payrollStore';
import { IUser } from '../../../../types';
import Loading from '../../../Resuables/Loader';
import BonusDateSelect from './components/BonusDateSelect';
import BonusEmployeeSelect from './components/BonusEmplyeeSelect';
import BonusInputWithReason from './components/BonusInputWithReason';
import BonusStatusSelect from './components/BonusStatusSelect';
import BonusSubmitButton from './components/BonusSubmitButton';

interface props {
  currentEmployeeData: IUser[] | undefined;
  isLoading: boolean;
  error: unknown;
}

const BonusCreateForm: React.FC<props> = ({ currentEmployeeData, isLoading, error }) => {
  const { setEmployeeId } = usePayrollStore();

  const [showForm, setShowForm] = useState<boolean>(false);
  const { values, setValues, handleSubmit } = useFormikContext<BonusCreateSchemaType>();
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
  };

  // On Date Select
  const handleDateSelect = (date: Date) => {
    setDate(date);
    setValues({ ...values, date: dayjs(date).format('YYYY-MM-DD') });
  };

  // On Select status
  const handleStatusChange = (value: string) => setValues({ ...values, status: value });

  return (
    <div className="h-full w-full flex flex-col">
      {/* Select An Employee */}
      <BonusEmployeeSelect
        isCreateMode={true}
        allCurrentEmployeeData={currentEmployeeData}
        handleChange={handleEmployeeChange}
      />

      {showForm && (
        <form className="flex-1 overflow-auto w-full mb-20" onSubmit={handleSubmit}>
          {/* Select date */}
          <BonusDateSelect date={date} handleDateSelect={handleDateSelect} />

          {/* Select bonus status */}
          <BonusStatusSelect
            isCreateMode={true}
            handleStatusChange={handleStatusChange}
          />

          {/* Enter bonus with reason */}
          <BonusInputWithReason isCreateMode={true} />

          {/* Submit button */}
          <BonusSubmitButton isCreateMode={true} />
        </form>
      )}
    </div>
  );
};

export default BonusCreateForm;
