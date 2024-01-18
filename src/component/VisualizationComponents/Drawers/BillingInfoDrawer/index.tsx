import { FormikProvider, useFormik } from 'formik';

import {
  BillingInfoSchema,
  BillingInfoSchemaType,
} from '../../../../schema/BillingInfoSchema';
import BillingInfoService from '../../../../service/billing-info.service';
import useDrawerStore from '../../../../store/drawerStore';
import { useInvoiceStore } from '../../../../store/invoiceStore';
import { IBillingInfo } from '../../../../types/billing-info.type';
import DrawerTemplate from '../../../Resuables/DrawerTemplate';
import BillingInfoForm from '../../Forms/BillingInfoForm';

type Props = {
  onClose: () => void;
  billingInfoData?: IBillingInfo;
  refetchBillingDetails?: () => void;
};

export default function BillingInfoDrawer({
  onClose,
  billingInfoData,
  refetchBillingDetails,
}: Props) {
  const { selectedUser, drawerToBeOpenedAtSpecificMode, setBillingInfoId } =
    useInvoiceStore();
  const { mode } = useDrawerStore();

  const formik = useFormik({
    initialValues: {
      user_id: selectedUser?.id ?? '',
      address_line_1: billingInfoData?.address_line_1 ?? '',
      address_line_2: billingInfoData?.address_line_2 ?? undefined,
      city: billingInfoData?.city ?? undefined,
      state: billingInfoData?.state ?? undefined,
      country: billingInfoData?.country ?? undefined,
      zip_code: billingInfoData?.zip_code ?? undefined,
    },
    validationSchema: BillingInfoSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (drawerToBeOpenedAtSpecificMode === 'billingInfoDrawerUpdate') {
        onUpdateBillingInfo(values);
      }
      if (drawerToBeOpenedAtSpecificMode === 'billingInfoDrawerCreate') {
        onAddNewBillingInfo(values);
      }
    },
  });

  const { resetForm, setSubmitting } = formik;

  const onCloseDrawer = () => {
    onClose();
    resetForm();
  };

  const onAddNewBillingInfo = async (values: BillingInfoSchemaType) => {
    try {
      const billingInfoResponse = await BillingInfoService.createBillingInfo(values);
      setBillingInfoId(billingInfoResponse.data.id);
      refetchBillingDetails?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  const onUpdateBillingInfo = async (values: BillingInfoSchemaType) => {
    try {
      await BillingInfoService.updateBillingInfo({
        updatedData: values,
        billingInfoId: `${billingInfoData?.id}`,
      });
      onCloseDrawer();
      refetchBillingDetails?.();
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <DrawerTemplate
      onClose={onCloseDrawer}
      title={`${mode === 'create' ? 'Add' : 'Update'} Billing Info`}
    >
      <FormikProvider value={formik}>
        <BillingInfoForm />
      </FormikProvider>
    </DrawerTemplate>
  );
}
