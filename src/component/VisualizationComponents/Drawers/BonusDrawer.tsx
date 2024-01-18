/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormikProvider, useFormik } from 'formik';

import useGetAllUsersWhoAreCurrentlyEmployed from '../../../customHooks/users/useGetAllUsersWhoAreCurrentlyEmployed';
import {
  BonusCreateSchema,
  BonusCreateSchemaType,
  BonusUpdateSchema,
  BonusUpdateSchemaType,
} from '../../../schema/BonusSchema';
import BonusService from '../../../service/bonus.service';
import useDrawerStore from '../../../store/drawerStore';
import { usePayrollStore } from '../../../store/payrollStore/payrollStore';
import { IBonus } from '../../../types/bonus.type';
import DrawerTemplate from '../../Resuables/DrawerTemplate';
import Loading from '../../Resuables/Loader';
import BonusCreateForm from '../Forms/BonusForm/BonusCreateForm';
import BonusUpdateForm from '../Forms/BonusForm/BonusUpdateForm';

type Props = {
  bonusData: IBonus[];
  isLoading?: boolean;
  error?: unknown;
  onClose: () => void;
  refetch?: () => void;
};

export default function BonusDrawer({
  bonusData,
  isLoading,
  error,
  refetch,
  onClose,
}: Props) {
  const { mode } = useDrawerStore();
  const { bonusId, employeeId } = usePayrollStore();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>An error Occured</p>;
  }

  //Fetch All employees
  const {
    data: currentEmployeeData,
    isLoading: isAllEmployeeLoading,
    error: errorAllEmployeeData,
  } = useGetAllUsersWhoAreCurrentlyEmployed();

  // Related to bonus creation
  const formikForCreate = useFormik({
    initialValues: {
      employee_id: '',
      status: '',
      bonus: 0,
      date: '',
      reason: '',
    },
    validationSchema: BonusCreateSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onAddBonus(values as BonusCreateSchemaType);
    },
  });

  const onAddBonus = async (values: BonusCreateSchemaType) => {
    try {
      await BonusService.createBonus({
        employeeId: employeeId ?? '',
        bonusData: values,
      });
      refetch?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  // Related to bonus update
  const singleBonusData = bonusData.find((item) => item.id === bonusId);

  const formikForUpdate = useFormik({
    initialValues: {
      employee_id: employeeId ?? '',
      status: singleBonusData?.status ?? '',
      bonus: singleBonusData?.bonus ?? '',
      date: singleBonusData?.date ?? '',
      reason: singleBonusData?.reason ?? '',
    },
    validationSchema: BonusUpdateSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onUpdateBonus(values as BonusUpdateSchemaType);
    },
  });
  const onUpdateBonus = async (values: BonusUpdateSchemaType) => {
    try {
      await BonusService.updateBonus({
        bonusId: bonusId ?? '',
        bonusUpdateData: values,
      });
      refetch?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  // Common for both create and update
  const { resetForm, setSubmitting } =
    mode === 'create' ? formikForCreate : formikForUpdate;
  const onCloseDrawer = () => {
    onClose();
    resetForm();
  };

  return (
    <DrawerTemplate
      onClose={onCloseDrawer}
      title={mode === 'create' ? 'Add Bonus' : 'Update Bonus'}
    >
      {mode === 'create' && (
        <FormikProvider value={formikForCreate}>
          <BonusCreateForm
            currentEmployeeData={currentEmployeeData}
            isLoading={isAllEmployeeLoading}
            error={errorAllEmployeeData}
          />
        </FormikProvider>
      )}
      {mode === 'update' && (
        <FormikProvider value={formikForUpdate}>
          <BonusUpdateForm
            currentEmployeeData={currentEmployeeData}
            isLoading={isAllEmployeeLoading}
            error={errorAllEmployeeData}
          />
        </FormikProvider>
      )}
    </DrawerTemplate>
  );
}
