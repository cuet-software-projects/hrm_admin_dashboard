/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormikProvider, useFormik } from 'formik';

import { useEmployeeDetails } from '../../../customHooks/employees/useGetEmployeeDetails';
import { utils } from '../../../helpers/utility';
import {
  CreateEmployeeSchema,
  CreateEmployeeSchemaType,
  UpdateEmployeeSchema,
  UpdateEmployeeSchemaType,
} from '../../../schema/EmployeeSchema';
import EmployeeService from '../../../service/employee.service';
import useDrawerStore from '../../../store/drawerStore';
import { IUser } from '../../../types';
import { IEmployee } from '../../../types/employee.type';
import DrawerTemplate from '../../Resuables/DrawerTemplate';
import Loading from '../../Resuables/Loader';
import EmployeeCreateForm from '../Forms/EmployeeCreateForm';
import EmployeeUpdateForm from '../Forms/EmployeeUpdateForm';

type Props = {
  onClose: () => void;
  userId?: IUser['id'] | null;
  employeeId?: IEmployee['id'] | null;
  refetch?: () => void;
};

export default function EmployeeDrawer({ onClose, userId, employeeId, refetch }: Props) {
  const { mode } = useDrawerStore();
  const { data: employeeData, isLoading } = useEmployeeDetails({
    employeeId: employeeId,
  });
  const formikForCreateEmployee = useFormik({
    initialValues: {
      user_id: userId as string,
      joined_at: '',
      salary: 0,
      // dropdowns
      branch_id: '',
      department_id: '',
      designation_id: '',
      work_type: '',
      isCurrent: true,
      reporting_officer_id: '',
      reason: '',
    },
    validationSchema: CreateEmployeeSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onAddNewEmployment(values);
    },
  });

  const formikForUpdateEmployee = useFormik({
    initialValues: {
      user_id: employeeData?.user_id,
      reporting_officer_id: employeeData?.reporting_officer_id,
      joined_at: employeeData?.joined_at,
      left_at: employeeData?.left_at ?? undefined,
      work_type: employeeData?.work_type,
      branch_id: employeeData?.branch_id,
      department_id: employeeData?.department_id,
      isCurrent: employeeData?.isCurrent,
      designation_id: employeeData?.current_designation_id,
      originalDesignationId: employeeData?.current_designation_id,
      salary: employeeData?.current_salary,
      originalSalary: employeeData?.current_salary,
    },
    validationSchema: UpdateEmployeeSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onUpdateNewEmployment(values as UpdateEmployeeSchemaType);
    },
  });

  const { resetForm, setSubmitting } =
    mode === 'create' ? formikForCreateEmployee : formikForUpdateEmployee;

  const onCloseDrawer = () => {
    onClose();
    resetForm();
  };

  const onAddNewEmployment = async (values: CreateEmployeeSchemaType) => {
    try {
      await EmployeeService.createEmployee(values);
      refetch?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  const onUpdateNewEmployment = async (values: UpdateEmployeeSchemaType) => {
    delete values.originalDesignationId;
    delete values.originalSalary;
    try {
      await EmployeeService.updateEmployee({
        updatedData: utils.findChangedFields({
          currentValues: values,
          initialValues:
            formikForUpdateEmployee.initialValues as UpdateEmployeeSchemaType,
        }),
        id: employeeId!,
      });
      refetch?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <DrawerTemplate
      onClose={onCloseDrawer}
      title={employeeId ? 'Update Employee' : 'Add Employee'}
    >
      {mode === 'create' && (
        <FormikProvider value={formikForCreateEmployee}>
          <EmployeeCreateForm />
        </FormikProvider>
      )}

      {mode === 'update' && isLoading && <Loading />}

      {mode === 'update' && !isLoading && (
        <FormikProvider value={formikForUpdateEmployee}>
          <EmployeeUpdateForm />
        </FormikProvider>
      )}
    </DrawerTemplate>
  );
}
