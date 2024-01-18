/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormikProvider, useFormik } from 'formik';

import { useDesignationDetails } from '../../../customHooks/designations/useDesignationDetails';
import {
  DesignationSchema,
  DesignationSchemaType,
} from '../../../schema/DesignationSchema';
import DesignationService from '../../../service/designation.service';
import { IDesignation } from '../../../types';
import DrawerTemplate from '../../Resuables/DrawerTemplate';
import Loading from '../../Resuables/Loader';
import DesignationForm from '../Forms/DesignationForm';

type Props = {
  onClose: () => void;
  designationId?: IDesignation['id'] | null;
  refetch?: () => void;
};

export default function DesignationDrawer({ onClose, designationId, refetch }: Props) {
  const { data, isLoading } = useDesignationDetails({ designationId: designationId });

  const formik = useFormik({
    initialValues: {
      name: data?.name ?? '',
    },
    validationSchema: DesignationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      designationId ? onUpdateNewDesignation(values) : onAddNewDesignation(values);
    },
  });

  const { resetForm, setSubmitting } = formik;

  const onCloseDrawer = () => {
    onClose();
    resetForm();
  };

  const onAddNewDesignation = async (values: DesignationSchemaType) => {
    try {
      await DesignationService.createDesignation(values);
      refetch?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  const onUpdateNewDesignation = async (values: DesignationSchemaType) => {
    try {
      await DesignationService.updateDesignation({
        updatedData: values,
        id: designationId!,
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
      title={designationId ? 'Update Designation' : 'Add Designation'}
    >
      {isLoading && <Loading />}
      {!isLoading && (
        <FormikProvider value={formik}>
          <DesignationForm />
        </FormikProvider>
      )}
    </DrawerTemplate>
  );
}
