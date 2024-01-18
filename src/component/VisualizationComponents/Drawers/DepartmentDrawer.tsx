/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormikProvider, useFormik } from 'formik';

import { useDepartmentDetails } from '../../../customHooks/departments/useDepartmentDetails';
import { DepartmentSchema, DepartmentSchemaType } from '../../../schema/DepartmentSchema';
import DepartmentService from '../../../service/department.service';
import { IDepartment } from '../../../types';
import DrawerTemplate from '../../Resuables/DrawerTemplate';
import Loading from '../../Resuables/Loader';
import DepartmentForm from '../Forms/DeparmentForm';

type Props = {
  onClose: () => void;
  departmentId?: IDepartment['id'] | null;
  refetch?: () => void;
};

export default function DepartmentDrawer({ onClose, departmentId, refetch }: Props) {
  const { data, isLoading } = useDepartmentDetails({ departmentId: departmentId });

  const formik = useFormik({
    initialValues: {
      name: data?.name ?? '',
      code: data?.code ?? '',
      description: data?.description ?? '',
      prefix_code: data?.prefix_code ?? '',
    },
    validationSchema: DepartmentSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      departmentId ? onUpdateNewDepartment(values) : onAddNewDepartment(values);
    },
  });

  const { resetForm, setSubmitting } = formik;

  const onCloseDrawer = () => {
    onClose();
    resetForm();
  };

  const onAddNewDepartment = async (values: DepartmentSchemaType) => {
    try {
      await DepartmentService.createDepartment(values);
      refetch?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  const onUpdateNewDepartment = async (values: DepartmentSchemaType) => {
    try {
      await DepartmentService.updateDepartment({
        updatedData: values,
        id: departmentId!,
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
      title={departmentId ? 'Update Department' : 'Add Department'}
    >
      {isLoading && <Loading />}
      {!isLoading && (
        <FormikProvider value={formik}>
          <DepartmentForm />
        </FormikProvider>
      )}
    </DrawerTemplate>
  );
}
