import dayjs from 'dayjs';
import { ErrorMessage, useFormikContext } from 'formik';
import { useState } from 'react';

import { userRoles } from '../../../constants/GlobalConstants';
import { utils } from '../../../helpers/utility';
import { CombinedCreateUpdateAttendanceSchemaType } from '../../../schema/AttendanceSchema';
import useAuthStore from '../../../store/authStore';
import { WORK_TYPE } from '../../../types/values';
import Button from '../../Resuables/Button/Button';
import CustomDatePicker from '../../Resuables/CustomDatePicker';
import CustomTimePicker from '../../Resuables/CustomTimePicker';
import Input from '../../Resuables/Input';
import Label from '../../Resuables/Label';
import Loading from '../../Resuables/Loader';
import Select from '../../Resuables/Select/Select';
import Textarea from '../../Resuables/Textarea';

const AttendanceUpdateForm = () => {
  const { role } = useAuthStore();
  const { values, errors, touched, setValues, handleChange, handleSubmit, isSubmitting } =
    useFormikContext<CombinedCreateUpdateAttendanceSchemaType>();
  const [selectedEntryDate, setSelectedEntryDate] = useState<Date | null>(null);
  const [selectedEntryTime, setSelectedEntryTime] = useState<Date | null>(null);
  const [selectedExitDate, setSelectedExitDate] = useState<Date | null>(null);
  const [selectedExitTime, setSelectedExitTime] = useState<Date | null>(null);

  // Entry Related
  const handleEntryDateChange = (date: Date) => {
    setSelectedEntryDate(date);
    setValues({
      ...values,
      entry_time: utils.combineDateTimeToISO(
        date,
        selectedEntryTime ?? values.entry_time ? dayjs(values.entry_time).toDate() : null,
      ),
    });
  };

  const handleEntryTimeChange = (date: Date) => {
    setSelectedEntryTime(date);
    setValues({
      ...values,
      entry_time: utils.combineDateTimeToISO(
        selectedEntryDate ?? values.entry_time ? dayjs(values.entry_time).toDate() : null,
        date,
      ),
    });
  };

  // Exit related
  const handleExitDateChange = (date: Date) => {
    setSelectedExitDate(date);
    setValues({
      ...values,
      exit_time: utils.combineDateTimeToISO(
        date,
        selectedExitTime ?? values.exit_time ? dayjs(values.exit_time).toDate() : null,
      ),
    });
  };
  const handleExitTimeChange = (date: Date) => {
    setSelectedExitTime(date);
    setValues({
      ...values,
      exit_time: utils.combineDateTimeToISO(
        selectedExitDate ?? values.exit_time ? dayjs(values.exit_time).toDate() : null,
        date,
      ),
    });
  };

  return (
    <div className="lg:px-2 h-full w-full flex flex-col">
      <form
        className={`flex-1 w-full text-start ${
          role === userRoles.user ? '' : 'disable-form-inputs'
        }`}
        onSubmit={handleSubmit}
      >
        {/* Entry Related */}
        <div className="flex space-x-5">
          {/* Entry Date input */}
          <div className="py-3 w-full lg:w-1/2">
            <div>Your Entry Date</div>
            <CustomDatePicker
              className="w-full mt-2 text-black-1 outline-none bg-brand-grad-1 bg-opacity-10 rounded-md px-4 py-3 border-none"
              selectedDate={
                selectedEntryDate ?? values.entry_time
                  ? dayjs(values.entry_time).toDate()
                  : null
              }
              onChangeDate={handleEntryDateChange}
            />
          </div>

          {/* Entry Time Input */}
          <div className="py-3 w-full lg:w-1/2">
            <div>Your Entry Time</div>
            <CustomTimePicker
              className="w-full mt-2 text-black-1 outline-none bg-brand-grad-1 bg-opacity-10 rounded-md px-4 py-3 border-none"
              selectedTime={
                selectedEntryDate ?? values.entry_time
                  ? dayjs(values.entry_time).toDate()
                  : null
              }
              onChangeTime={handleEntryTimeChange}
              allowClear={false}
              placeholder="Select Entry Time"
            />
          </div>
        </div>

        {/* Exit Time related */}
        <div className="flex space-x-5">
          {/* Exit Date input */}
          <div className="py-3 w-full lg:w-1/2">
            <div>Your Exit Date</div>
            <CustomDatePicker
              className="w-full mt-2 text-black-1 outline-none bg-brand-grad-1 bg-opacity-10 rounded-md px-4 py-3 border-none"
              selectedDate={
                selectedExitDate ?? values.exit_time
                  ? dayjs(values.exit_time).toDate()
                  : null
              }
              placeholderText="--/--/----"
              onChangeDate={handleExitDateChange}
              minDate={dayjs(values.entry_time).toDate()}
              maxDate={dayjs(values.entry_time).add(1, 'day').toDate()}
            />
          </div>

          {/* Exit time input */}
          <div className="py-3 w-full lg:w-1/2">
            <div>Your Exit Time</div>
            <CustomTimePicker
              className="w-full mt-2 text-black-1 outline-none bg-brand-grad-1 bg-opacity-10 rounded-md px-4 py-3 border-none"
              selectedTime={
                selectedExitDate ?? values.exit_time
                  ? dayjs(values.exit_time).toDate()
                  : null
              }
              onChangeTime={handleExitTimeChange}
              allowClear={false}
              placeholder="--:--"
            />
          </div>
        </div>
        <ErrorMessage name={'exit_time'} component="div" className="error" />

        <div className="py-3 w-full">
          <Label htmlFor="work_type">Work Type</Label>
          <br />
          <Select
            id="work_type"
            options={WORK_TYPE.map((item) => ({
              label: item,
              value: item,
            }))}
            value={values.work_type}
            onChange={(value: string) => {
              setValues({
                ...values,
                work_type: value,
              });
            }}
            size="large"
            errorMessage={errors.work_type && touched.work_type ? errors.work_type : ''}
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        <div className="py-3">
          <Label htmlFor="description">Work Plan</Label>
          <br />
          <Textarea
            id="work_plan"
            name="work_plan"
            placeholder="What's the plan today?"
            value={values.work_plan}
            onChange={handleChange}
            errorMessage={errors.work_plan && touched.work_plan ? errors.work_plan : ''}
            className="w-full h-28 mt-2 outline-none text-black-1"
          />
        </div>

        {/* Break Duration Input */}
        <div className="py-3 w-full">
          <Label htmlFor="break_duration">Break Duation (in hour)</Label>
          <br />
          <Input
            type="number"
            id="break_duration"
            name="break_duration"
            value={values.break_duration}
            onChange={handleChange}
            placeholder="Enter Break Duration (such as 1.5, 0.5, 3)"
            errorMessage={
              errors.break_duration && touched.break_duration ? errors.break_duration : ''
            }
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        {/* Reason of break input */}
        {/* The condition might seem awkward. But it had to be given like this otherwise, when the values.break_duration was 0, the value 0 was appearing on the dom. */}
        {values.break_duration !== 0 &&
          values.break_duration &&
          values.break_duration > 0 && (
            <div className="py-3 w-full">
              <Label htmlFor="reason_of_break">Reason of Taking Break</Label>
              <br />
              <Textarea
                id="reason_of_break"
                name="reason_of_break"
                placeholder="Enter Reason Of Break"
                value={values.reason_of_break}
                onChange={handleChange}
                errorMessage={
                  errors.reason_of_break && touched.reason_of_break
                    ? errors.reason_of_break
                    : ''
                }
                className="w-full h-28 mt-2 outline-none text-black-1"
              />
            </div>
          )}

        {/* Work Description input */}
        <div className="py-3">
          <Label htmlFor="work_descriptions">Work Description</Label>
          <br />
          <Textarea
            id="work_descriptions"
            name="work_descriptions"
            placeholder="Describe what you have done today."
            value={values.work_descriptions ?? undefined}
            onChange={handleChange}
            errorMessage={
              errors.work_descriptions && touched.work_descriptions
                ? errors.work_descriptions
                : ''
            }
            className="w-full h-28 mt-2 outline-none text-black-1"
          />
        </div>
        {role === userRoles.user && (
          <Button
            block
            htmlType={`${isSubmitting ? 'button' : 'submit'}`}
            isLoading={isSubmitting}
            className="flex justify-center items-center"
          >
            {isSubmitting ? <Loading size="large" color="white-1" /> : 'Confirm Update'}
          </Button>
        )}
      </form>
    </div>
  );
};

export default AttendanceUpdateForm;
