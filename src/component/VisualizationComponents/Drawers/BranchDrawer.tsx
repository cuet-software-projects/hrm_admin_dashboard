/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormikProvider, useFormik } from 'formik';

import { useBranchDetails } from '../../../customHooks/branches/useBranchDetails';
import { BranchSchema, BranchSchemaType } from '../../../schema/BranchSchema';
import BranchService from '../../../service/branch.service';
import { IBranch } from '../../../types';
import DrawerTemplate from '../../Resuables/DrawerTemplate';
import Loading from '../../Resuables/Loader';
import BranchForm from '../Forms/BranchForm';

type Props = {
  onClose: () => void;
  branchId?: IBranch['id'] | null;
  refetch?: () => void;
};

export default function BranchDrawer({ onClose, branchId, refetch }: Props) {
  const { data, isLoading } = useBranchDetails({ branchId: branchId });

  const formik = useFormik({
    initialValues: {
      name: data?.name ?? '',
      code: data?.code ?? '',
      address: data?.address ?? '',
    },
    validationSchema: BranchSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      branchId ? onUpdateNewBranch(values) : onAddNewBranch(values);
    },
  });

  const { resetForm, setSubmitting } = formik;

  const onCloseDrawer = () => {
    onClose();
    resetForm();
  };

  const onAddNewBranch = async (values: BranchSchemaType) => {
    try {
      await BranchService.createBranch(values);
      refetch?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  const onUpdateNewBranch = async (values: BranchSchemaType) => {
    try {
      await BranchService.updateBranch({
        updatedData: values,
        id: branchId!,
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
      title={branchId ? 'Update Branch' : 'Add Branch'}
    >
      {isLoading && <Loading />}
      {!isLoading && (
        <FormikProvider value={formik}>
          <BranchForm />
        </FormikProvider>
      )}
    </DrawerTemplate>
  );
}
