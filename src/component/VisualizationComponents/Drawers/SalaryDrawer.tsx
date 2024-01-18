/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { message } from 'antd';
import dayjs from 'dayjs';
import { FormikProvider, useFormik } from 'formik';

import useGetAllUsersWhoAreCurrentlyEmployed from '../../../customHooks/users/useGetAllUsersWhoAreCurrentlyEmployed';
import {
  PayrollCreateSchema,
  PayrollCreateSchemaType,
  PayrollUpdateSchema,
  PayrollUpdateSchemaType,
} from '../../../schema/PayrollSchema';
import PayrollService from '../../../service/salary.service';
import useDrawerStore from '../../../store/drawerStore';
import { usePayrollStore } from '../../../store/payrollStore/payrollStore';
import { IPayroll } from '../../../types/payroll.type';
import DrawerTemplate from '../../Resuables/DrawerTemplate';
import SalaryCreateForm from '../Forms/PayrollForm/SalaryCreateForm';
import SalaryUpdateForm from '../Forms/PayrollForm/SalaryUpdateForm';

type Props = {
  onClose: () => void;
  payrollData: IPayroll[];
  refetch?: () => void;
};

export default function SalaryDrawer({ onClose, payrollData, refetch }: Props) {
  const { mode } = useDrawerStore();
  const { salaryId, employeeId } = usePayrollStore();

  //Fetch All employees
  const {
    data: currentEmployeeData,
    isLoading: isAllEmployeeLoading,
    error: errorAllEmployeeData,
  } = useGetAllUsersWhoAreCurrentlyEmployed();

  // Code related to payroll create
  const formikForCreate = useFormik({
    initialValues: {
      date: '',
      salary: 0,
      status: '',
      bonus: undefined,
      reason: '',
    },
    validationSchema: PayrollCreateSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onAddNewPayroll(values as PayrollCreateSchemaType);
    },
  });

  const onAddNewPayroll = async (values: PayrollCreateSchemaType) => {
    try {
      await PayrollService.createPayroll({
        employeeId: employeeId ?? '',
        payrollData: values,
      });
      refetch?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  // Code related to payroll update
  let singlePayrollData: IPayroll | undefined;
  if (mode === 'update') {
    singlePayrollData = payrollData.find((item) => item.id === salaryId);
  }
  const formikForUpdate = useFormik({
    initialValues: {
      employee_id: employeeId ?? undefined,
      date: singlePayrollData?.date ? dayjs(singlePayrollData.date).toISOString() : '',
      salary: singlePayrollData?.salary ?? 0,
      status: singlePayrollData?.status ?? '',
    },
    validationSchema: PayrollUpdateSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onUpdatePayroll(values);
    },
  });

  const onUpdatePayroll = async (values: PayrollUpdateSchemaType) => {
    try {
      if (employeeId && salaryId) {
        await PayrollService.updateSalary({
          salaryId: salaryId,
          payrollUpdateData: values,
        });
        refetch?.();
        onCloseDrawer();
      } else {
        message.error('An error occured. Please try again.');
      }
    } catch (error) {
      //
    }
  };

  // Common for create or update
  const { resetForm, setSubmitting } = formikForCreate;
  const onCloseDrawer = () => {
    onClose();
    resetForm();
  };

  return (
    <DrawerTemplate
      onClose={onCloseDrawer}
      title={salaryId ? 'Update Payroll' : 'Add Payroll'}
    >
      {mode === 'create' && currentEmployeeData && (
        <FormikProvider value={formikForCreate}>
          <SalaryCreateForm
            currentEmployeeData={currentEmployeeData}
            isLoading={isAllEmployeeLoading}
            error={errorAllEmployeeData}
          />
        </FormikProvider>
      )}
      {mode === 'update' && (
        <FormikProvider value={formikForUpdate}>
          <SalaryUpdateForm
            currentEmployeeData={currentEmployeeData}
            isLoading={isAllEmployeeLoading}
            error={errorAllEmployeeData}
          />
        </FormikProvider>
      )}
    </DrawerTemplate>
  );
}
