// eslint-disable-next-line simple-import-sort/imports
import { Flex, FloatButton, message } from 'antd';
import { FormikProvider, useFormik } from 'formik';

import { SettingFilled } from '@ant-design/icons';
import { useState } from 'react';
import InvoiceSkeleton from '../../../Layout/Skeletons/InvoiceSkeleton';
import { useGetBillingInfoDetails } from '../../../customHooks/billingInfo/useGetBillingInfoDetails';
import { useGetInvoiceDetails } from '../../../customHooks/invoice/useGetInvoiceDetails';
import { useGetInvoiceListAll } from '../../../customHooks/invoice/useGetInvoiceListAll';
import { useGetUserListAll } from '../../../customHooks/users/useUserListAll';
import { utils } from '../../../helpers/utility';
import { InvoiceSchema, InvoiceSchemaType } from '../../../schema/InvoiceSchema';
import InvoiceService from '../../../service/invoice.service';
import { useInvoiceStore } from '../../../store/invoiceStore';
import { IInvoice } from '../../../types/invoice.type';
import InvoiceForm from '../../VisualizationComponents/Forms/InvoiceForm';
import InvoiceActions from './InvoiceActions';
import InvoiceHeader from './InvoiceHeader/Index';

export default function InvoiceDetails() {
  const {
    invoiceId,
    invoiceMode,
    selectedReceiver,
    selectedUser,
    billingInfoId,
    changeInvoiceMode,
    setSelectedReceiver,
    setSelectedUser,
  } = useInvoiceStore();

  // State for controlling the invoice actions for small screens
  // isExapanded is used for expanding the float buttons on small screen
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleExpand = (value: boolean) => {
    setIsExpanded(value);
  };

  // Code related to Invoice create
  const {
    data: userData,
    isLoading: isUserDataLoading,
    refetch: refetchAllUsers,
  } = useGetUserListAll();
  const { data: allInvoices, isLoading: isAllInvoicesLoading } = useGetInvoiceListAll();
  const {
    data: invoiceData,
    isLoading: isInvoiceDataLoading,
    refetch: refetchInvoiceDetails,
  } = useGetInvoiceDetails({
    invoiceId: invoiceId ?? undefined,
  });

  // Fetch billing info details
  const {
    data: billingInfoData,
    isLoading: isLoadingBillingInfo,
    error: errorBillingInfo,
    refetch: refetchBillingInfo,
  } = useGetBillingInfoDetails({
    userId: selectedUser?.id ?? null,
    billingInfoId: billingInfoId ?? undefined,
  });

  // Configuration of invoice form
  const formikForInvoice = useFormik({
    initialValues: {
      invoice_id: invoiceData?.id ?? '',
      parent_invoice_id: invoiceData?.parent_invoice_id ?? '',
      user_id: invoiceData?.user_id ?? '',
      received_by_id: invoiceData?.received_by_id ?? '',
      issue_date: invoiceData?.issue_date ?? '',
      due_date: invoiceData?.due_date ?? '',
      invoice_subject: invoiceData?.invoice_subject ?? '',
      invoice_items: invoiceData?.invoice_items ?? [{ name: '', price: 1, quantity: 10 }],
      note: invoiceData?.note ?? '',
      status: invoiceData?.status ?? 'DRAFT',
      tax_percentage: invoiceData?.tax_percentage ?? 0,
      discount: invoiceData?.discount ?? 0,
      discount_type: invoiceData?.discount_type,
      amount_paid: invoiceData?.amount_paid ?? 0,
    },
    validationSchema: InvoiceSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // Handling the unusual cases
      if (utils.invoiceUnusualScenario({ invoiceValues: values })) {
        setSubmitting(false);
        return;
      }

      if (invoiceId && invoiceId.length > 0) {
        onUpdateInvoice(values);
      } else {
        onAddInvoice(values);
      }
      if (invoiceMode === 'preview') {
        changeInvoiceMode('edit');
      }
    },
  });

  // When a new invoice needs to be created
  const onAddInvoice = async (values: InvoiceSchemaType) => {
    try {
      await InvoiceService.createInvoice({
        invoiceData: {
          ...values,
          amount_paid: values.amount_paid === 0 ? undefined : values.amount_paid,
          parent_invoice_id:
            values.parent_invoice_id?.length === 0 ? undefined : values.parent_invoice_id,
          received_by_id:
            values.received_by_id?.length === 0 ? undefined : values.received_by_id,
        },
      });
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
    }
  };

  // When an existing invoice going to be updated
  const onUpdateInvoice = async (values: InvoiceSchemaType) => {
    const changedFields = invoiceData
      ? utils.findChangedFields({
          currentValues: values,
          initialValues: {
            ...invoiceData,
            invoice_id: invoiceData.id,
          } as InvoiceSchemaType,
        })
      : null;

    if (!changedFields) {
      message.info('Nothing to udpate', 5);
      setSubmitting(false);
      return;
    }

    if (changedFields && Object.keys(changedFields).length === 0) {
      message.info('You did not change any filed', 5);
      setSubmitting(false);
      return;
    }

    try {
      await InvoiceService.updateInvoice({
        invoiceId: values.invoice_id,
        invoiceUpdateData: {
          ...changedFields,
          amount_paid: values.amount_paid === 0 ? undefined : values.amount_paid,
          parent_invoice_id:
            values.parent_invoice_id?.length === 0 ? undefined : values.parent_invoice_id,
          received_by_id:
            values.received_by_id?.length === 0 ? undefined : values.received_by_id,
        } as InvoiceSchemaType,
      });
      refetchInvoiceDetails();
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
    }
  };

  const { values, setValues, setSubmitting } = formikForInvoice;

  // Select current values of form from parent invoice
  const onSelectParentInvoice = ({ parentInvoiceId }: { parentInvoiceId: string }) => {
    // When an invoiceId exists that means an existing invoice is being edited
    // So this will work when an existing invoice is being edited
    if (invoiceId) {
      setValues({ ...values, parent_invoice_id: parentInvoiceId });
      return;
    }

    // When a new Invoice is being created
    const selectedParentInvoice: IInvoice | undefined = allInvoices?.find(
      (invoice) => invoice.id === parentInvoiceId,
    );

    if (selectedParentInvoice) {
      setValues({
        ...selectedParentInvoice,
        invoice_id: '',
        parent_invoice_id: parentInvoiceId,
        invoice_items: selectedParentInvoice.invoice_items ?? [],
        note: selectedParentInvoice.note ?? '',
        amount_paid: selectedParentInvoice.amount_paid ?? 0,
        discount: selectedParentInvoice.discount ?? 0,
        discount_type: selectedParentInvoice.discount_type,
      });
      setSelectedUser(
        userData?.find((user) => user.id === selectedParentInvoice.user_id),
      );
      setSelectedReceiver(
        userData?.find((user) => user.id === selectedParentInvoice.received_by_id),
      );
    }
  };

  if (isInvoiceDataLoading) {
    return <InvoiceSkeleton />;
  }

  if (!selectedReceiver && invoiceData?.received_by) {
    setSelectedReceiver(invoiceData.received_by);
  }

  if (!selectedUser && invoiceData?.user) {
    setSelectedUser(invoiceData.user);
  }

  return (
    <FormikProvider value={formikForInvoice}>
      <Flex wrap="nowrap" justify="space-between" gap={'small'}>
        <div className="rounded bg-white-1 shadow overflow-auto px-4 flex-1">
          {/* Invoice Header */}
          <InvoiceHeader
            allInvoices={allInvoices ?? []}
            isAllInvoiceLoading={isAllInvoicesLoading}
            handleSelectParentInvoice={onSelectParentInvoice}
          />

          {/* Invoice Form */}
          <InvoiceForm
            userDataList={userData}
            isLoadingUserDataList={isUserDataLoading}
            billingInfoData={billingInfoData}
            isLoadingBillingInfo={isLoadingBillingInfo}
            errorBillingInfo={errorBillingInfo}
            refetchAllUsers={refetchAllUsers}
            refetchBillingInfo={refetchBillingInfo}
          />
        </div>
        <div className="hidden xl:flex 2xl:min-w-[300px] flex-col bg-white-1 space-y-4 rounded shadow px-4 py-8 h-fit">
          <InvoiceActions billingInfoData={billingInfoData} />
        </div>
        <div className="xl:hidden">
          <FloatButton.Group
            open={isExpanded}
            icon={<SettingFilled rev={''} className="text-xl" />}
            onOpenChange={(value) => toggleExpand(value)}
            type="primary"
            trigger="click"
            shape="circle"
            className="right-6 w-fit flex flex-col items-center"
            tooltip={<p>Invoice Actions</p>}
          >
            <InvoiceActions billingInfoData={billingInfoData} />
          </FloatButton.Group>
        </div>
      </Flex>
    </FormikProvider>
  );
}
