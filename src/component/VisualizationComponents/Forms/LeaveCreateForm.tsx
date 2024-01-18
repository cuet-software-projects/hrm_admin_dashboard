import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { useState } from 'react';

import { defaultBackendDateFormate } from '../../../constants/GlobalConstants';
import { CreateLeaveSchemaType } from '../../../schema/LeaveSchema';
import { LEAVE_TYPE_VALUES } from '../../../types/values';
import Button from '../../Resuables/Button/Button';
import CustomDatePicker from '../../Resuables/CustomDatePicker';
import Label from '../../Resuables/Label';
import Select from '../../Resuables/Select/Select';
import Textarea from '../../Resuables/Textarea';

const LeaveCreateForm = () => {
  const { values, errors, setValues, touched, handleChange, handleSubmit, isSubmitting } =
    useFormikContext<CreateLeaveSchemaType>();

  const [startDate, setStartDate] = useState<Date | string | null>(null);
  const [endDate, setEndDate] = useState<Date | string | null>(null);

  return (
    <div className="px-2 h-full w-full flex flex-col">
      <form id="leave-create-form" className="flex-1 w-full" onSubmit={handleSubmit}>
        <div className="py-3 w-full">
          <Label htmlFor="dob">Start Date</Label>
          <br />
          <CustomDatePicker
            className="bg-brand-grad-1 bg-opacity-10 w-full outline-none border-none mt-2"
            size="large"
            selectedDate={startDate}
            allowClear={false}
            onChangeDate={(date: Date) => {
              setStartDate(date);
              setValues({
                ...values,
                started_at: dayjs(date).format(defaultBackendDateFormate),
              });
            }}
          />
          {errors.started_at && touched.started_at && (
            <p className="pt-3 text-danger font-bold">{errors.started_at}</p>
          )}
        </div>

        <div className="py-3 w-full">
          <Label htmlFor="dob">End Date</Label>
          <br />
          <CustomDatePicker
            className="bg-brand-grad-1 bg-opacity-10 w-full outline-none border-none mt-2"
            size="large"
            allowClear={false}
            selectedDate={endDate}
            onChangeDate={(date: Date) => {
              setEndDate(date);
              setValues({
                ...values,
                ended_at: dayjs(date).format(defaultBackendDateFormate),
              });
            }}
          />
          {errors.ended_at && touched.ended_at && (
            <p className="pt-3 text-danger font-bold">{errors.ended_at}</p>
          )}
        </div>

        <div className="py-3 w-full">
          <Label htmlFor="leave_type">Leave Type</Label>
          <br />
          <Select
            id="leave_type"
            options={LEAVE_TYPE_VALUES.map((leaveType: string) => ({
              label: leaveType,
              value: leaveType,
            }))}
            value={values.leave_type.length > 0 ? values.leave_type : null}
            onChange={(value) => setValues({ ...values, leave_type: value })}
            errorMessage={
              errors.leave_type && touched.leave_type ? errors.leave_type : ''
            }
            className="w-full py-5 mt-2 text-black-1 outline-none"
          />
        </div>

        <div className="py-3">
          Application (Characters: {values.description?.length}/190)
          <br />
          <Textarea
            id="description"
            name="description"
            placeholder="application"
            value={values.description}
            onChange={handleChange}
            errorMessage={
              errors.description && touched.description ? errors.description : ''
            }
            className="w-full h-28 mt-2 outline-none text-black-1"
          />
        </div>

        <Button
          block
          htmlType="submit"
          loading={!isSubmitting}
          className="flex justify-center items-center"
        >
          Confirm Leave Info
        </Button>
      </form>
    </div>
  );
};

export default LeaveCreateForm;
