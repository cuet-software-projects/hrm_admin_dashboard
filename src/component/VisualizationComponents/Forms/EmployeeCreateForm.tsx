import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';

import { useGetBranchList } from '../../../customHooks/branches/useGetBranchList';
import { useDepartmentLists } from '../../../customHooks/departments/useDepartmentLists';
import { useGetDesignationList } from '../../../customHooks/designations/useGetDesignationList';
import { useGetUserList } from '../../../customHooks/users/useGetUserLists';
import { CreateEmployeeSchemaType } from '../../../schema/EmployeeSchema';
import { EMPLOYEE_PROMOTION_REASON_VALUES, WORK_TYPE } from '../../../types/values';
import Button from '../../Resuables/Button/Button';
import CustomDatePicker from '../../Resuables/CustomDatePicker';
import DrawerFooter from '../../Resuables/DrawerFooter';
import Icon from '../../Resuables/Icon/Icon';
import Input from '../../Resuables/Input';
import Label from '../../Resuables/Label';
import AsyncSelect from '../../Resuables/Select/AsyncSelect';
import Select from '../../Resuables/Select/Select';

const EmployeeCreateForm: React.FC = () => {
  const [joiningDate, setJoiningDate] = useState<Date | string | null>(null);
  const { errors, values, handleChange, touched, setValues, handleSubmit, isSubmitting } =
    useFormikContext<CreateEmployeeSchemaType>();

  useEffect(() => {
    setJoiningDate(values.joined_at ? values.joined_at : null);
  }, [values]);

  return (
    <div className="px-2 h-full w-full flex flex-col">
      <form className="flex-1 overflow-auto w-full mb-16" onSubmit={handleSubmit}>
        <div className="py-3 w-full">
          <Label htmlFor="branch_id">Branch</Label>
          <br />
          <AsyncSelect
            id="branch_id"
            size="large"
            hookToFetchData={useGetBranchList}
            labelFieldForOption={'code'}
            valueFieldForOption={'id'}
            value={values.branch_id.length > 0 ? values.branch_id : undefined}
            onChange={(value) => setValues({ ...values, branch_id: value })}
            errorMessage={errors.branch_id && touched.branch_id ? errors.branch_id : ''}
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        <div className="py-3 w-full">
          <Label htmlFor="department_id">Department</Label>
          <br />
          <AsyncSelect
            id="department_id"
            size="large"
            hookToFetchData={useDepartmentLists}
            labelFieldForOption={'name'}
            valueFieldForOption={'id'}
            value={values.department_id.length > 0 ? values.department_id : undefined}
            onChange={(value) => setValues({ ...values, department_id: value })}
            errorMessage={
              errors.department_id && touched.department_id ? errors.department_id : ''
            }
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        <div className="py-3 w-full">
          <Label htmlFor="designation_id">Designation</Label>
          <br />
          <AsyncSelect
            id="designation_id"
            size="large"
            hookToFetchData={useGetDesignationList}
            labelFieldForOption={'name'}
            valueFieldForOption={'id'}
            value={values.designation_id.length > 0 ? values.designation_id : undefined}
            onChange={(value) => setValues({ ...values, designation_id: value })}
            errorMessage={
              errors.designation_id && touched.designation_id ? errors.designation_id : ''
            }
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        <div className="py-3 w-full">
          <Label htmlFor="joined_at">Joining Date</Label>
          <br />
          <CustomDatePicker
            className="bg-brand-grad-1 bg-opacity-10 rounded-md px-4 w-full mt-2 text-black-1 border-none"
            size="large"
            allowClear={false}
            selectedDate={joiningDate}
            onChangeDate={(date: Date) => {
              setJoiningDate(date);
              setValues({
                ...values,
                joined_at: dayjs(date).format('YYYY-MM-DD').toString(),
              });
            }}
          />
          {errors.joined_at && touched.joined_at && (
            <p className="text-danger font-bold py-2">{errors.joined_at}</p>
          )}
        </div>

        <div className="py-3 w-full">
          <Label htmlFor="work_type">Work Type</Label>
          <br />
          <Select
            id="work_type"
            size="large"
            options={WORK_TYPE.map((item) => ({
              label: item,
              value: item,
            }))}
            value={values.work_type.length > 0 ? values.work_type : undefined}
            onChange={(value) => setValues({ ...values, work_type: value })}
            errorMessage={errors.work_type && touched.work_type ? errors.work_type : ''}
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        <div className="py-3 w-full">
          <Label htmlFor="isCurrent">Currently Working On this role?</Label>
          <br />
          <Select
            id="isCurrent"
            size="large"
            options={['1', '0'].map((item) => ({
              label: item === '1' ? 'Yes' : 'No',
              value: item,
            }))}
            value={values.isCurrent ? '1' : '0'}
            onChange={(value) => {
              setValues({ ...values, isCurrent: value === '1' ? true : false });
            }}
            errorMessage={errors.isCurrent && touched.isCurrent ? errors.isCurrent : ''}
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        <div className="py-3 w-full">
          <Label htmlFor="reporting_officer_id">Reporting Officer</Label>
          <br />
          <AsyncSelect
            id="reporting_officer_id"
            size="large"
            hookToFetchData={useGetUserList}
            labelFieldForOption={'userName'}
            valueFieldForOption={'id'}
            value={
              values.reporting_officer_id.length > 0
                ? values.reporting_officer_id
                : undefined
            }
            onChange={(value) => setValues({ ...values, reporting_officer_id: value })}
            errorMessage={
              errors.reporting_officer_id && touched.reporting_officer_id
                ? errors.reporting_officer_id
                : ''
            }
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        <div className="py-3">
          <Label htmlFor="salary">Salary</Label>
          <br />
          <Input
            type="number"
            id="salary"
            name="salary"
            value={values.salary}
            onChange={handleChange}
            placeholder="salary"
            errorMessage={errors.salary && touched.salary ? errors.salary : ''}
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        <div className="py-3 w-full">
          <Label htmlFor="reason">Reason of Salary Change</Label>
          <br />
          <Select
            id="reason"
            size="large"
            options={EMPLOYEE_PROMOTION_REASON_VALUES.map((item) => ({
              label: item,
              value: item,
            }))}
            value={values.reason.length > 0 ? values.reason : undefined}
            onChange={(value) => setValues({ ...values, reason: value })}
            errorMessage={errors.reason && touched.reason ? errors.reason : ''}
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        <DrawerFooter>
          <Button
            loading={isSubmitting}
            htmlType={`${isSubmitting ? 'button' : 'submit'}`}
            className="flex items-center"
            icon={<Icon name={'ic_add'} color="white" size={20} />}
          >
            <span>Create Employee</span>{' '}
          </Button>
        </DrawerFooter>
      </form>
    </div>
  );
};

export default EmployeeCreateForm;
