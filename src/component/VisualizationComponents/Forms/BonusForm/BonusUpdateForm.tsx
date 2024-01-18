import { Flex } from 'antd';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';

import { BonusUpdateSchemaType } from '../../../../schema/BonusSchema';
import { usePayrollStore } from '../../../../store/payrollStore/payrollStore';
import { IUser } from '../../../../types';
import Loading from '../../../Resuables/Loader';
import PopupConfirmEmployeeChange from '../../../Resuables/PopupConfirmEmployeeChange';
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

const BonusUpdateForm: React.FC<props> = ({ currentEmployeeData, isLoading, error }) => {
  const { setEmployeeId } = usePayrollStore();

  const { values, setValues, handleSubmit } = useFormikContext<BonusUpdateSchemaType>();
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
        {/* Confirm employee change */}
        <Flex gap={10} align="start">
          <PopupConfirmEmployeeChange />
          <BonusEmployeeSelect
            isCreateMode={false}
            allCurrentEmployeeData={currentEmployeeData}
            handleChange={handleEmployeeChange}
          />
        </Flex>
        <BonusDateSelect date={date} handleDateSelect={handleDateSelect} />

        <BonusStatusSelect isCreateMode={false} handleStatusChange={handleStatusChange} />

        <BonusInputWithReason isCreateMode={false} />

        <BonusSubmitButton isCreateMode={false} />
      </form>
    </div>
  );
};

export default BonusUpdateForm;
