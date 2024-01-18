import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';

import { useGetBranchListAll } from '../../../customHooks/branches/useGetBranchListAll';
import { useDepartmentListAll } from '../../../customHooks/departments/useDepartmentListAll';
import { useGetDesignationListAll } from '../../../customHooks/designations/useGetDesignationListAll';
import { useGetUserListAll } from '../../../customHooks/users/useUserListAll';
import { UpdateEmployeeSchemaType } from '../../../schema/EmployeeSchema';
import { EMPLOYEE_PROMOTION_REASON_VALUES, WORK_TYPE } from '../../../types/values';
import Button from '../../Resuables/Button/Button';
import CustomDatePicker from '../../Resuables/CustomDatePicker';
import DrawerFooter from '../../Resuables/DrawerFooter';
import Icon from '../../Resuables/Icon/Icon';
import Input from '../../Resuables/Input';
import Label from '../../Resuables/Label';
import Select from '../../Resuables/Select/Select';

const EmployeeUpdateForm: React.FC = () => {
  const { data: branchData } = useGetBranchListAll();
  const { data: departmentData } = useDepartmentListAll();
  const { data: designationData } = useGetDesignationListAll();
  const { data: userData } = useGetUserListAll();
  const [joiningDate, setJoiningDate] = useState<Date | string | null>(null);
  const { errors, values, handleChange, touched, setValues, handleSubmit, isSubmitting } =
    useFormikContext<UpdateEmployeeSchemaType>();

  useEffect(() => {
    setJoiningDate(values.joined_at ? values.joined_at : null);
  }, [values]);

  useEffect(() => {
    const reasonElement = document.getElementById('reason');
    if (reasonElement && errors.reason && errors.reason.length > 0) {
      reasonElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [errors.reason]);

  return (
    <div className="px-2 h-full w-full flex flex-col">
      <form className="flex-1 overflow-auto w-full mb-16" onSubmit={handleSubmit}>
        <div className="py-3 w-full">
          <Label htmlFor="branch_id">Branch</Label>
          <br />
          <Select
            id="branch_id"
            size="large"
            options={
              branchData
                ? branchData?.map((item) => ({
                    label: item.code as string,
                    value: item.id,
                  }))
                : []
            }
            value={values.branch_id}
            onChange={(value) => setValues({ ...values, branch_id: value })}
            errorMessage={errors.branch_id && touched.branch_id ? errors.branch_id : ''}
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        <div className="py-3 w-full">
          <Label htmlFor="department_id">Department</Label>
          <br />
          <Select
            id="department_id"
            size="large"
            options={
              departmentData
                ? departmentData?.map((item) => ({
                    label: item.name as string,
                    value: item.id,
                  }))
                : []
            }
            value={values.department_id}
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
          <Select
            id="designation_id"
            size="large"
            options={
              designationData
                ? designationData?.map((item) => ({
                    label: item.name as string,
                    value: item.id,
                  }))
                : []
            }
            value={values.designation_id}
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
            value={values.work_type}
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
          <Select
            id="reporting_officer_id"
            size="large"
            options={
              userData
                ? userData?.map((item) => ({
                    label: item.userName as string,
                    value: item.id,
                  }))
                : []
            }
            value={values.reporting_officer_id}
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
            value={values.salary ? values.salary : ''}
            onChange={handleChange}
            placeholder="salary"
            errorMessage={errors.salary && touched.salary ? errors.salary : ''}
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        {(values.originalSalary !== values.salary ||
          values.originalDesignationId !== values.designation_id) && (
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
              onChange={(value) => setValues({ ...values, reason: value })}
              errorMessage={errors.reason ? errors.reason : ''}
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
        )}

        <DrawerFooter>
          <Button
            loading={isSubmitting}
            htmlType={`${isSubmitting ? 'button' : 'submit'}`}
            icon={<Icon name={'ic_update'} color="white" size={20} />}
          >
            <span>Update Employee</span>
          </Button>
        </DrawerFooter>
      </form>
    </div>
  );
};

export default EmployeeUpdateForm;
