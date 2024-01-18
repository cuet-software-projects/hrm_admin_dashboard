import { useFormikContext } from 'formik';
import React from 'react';

import LogoWithText from '../../../../assets/images/logo-with-text.png';
import { utils } from '../../../../helpers/utility';
import { InvoiceSchemaType } from '../../../../schema/InvoiceSchema';
import useDrawerStore from '../../../../store/drawerStore';
import { useInvoiceStore } from '../../../../store/invoiceStore';
import { INVOICE_STATUS_TYPE, IUser } from '../../../../types';
import { IBillingInfo } from '../../../../types/billing-info.type';
import InvoicePdfRenderer from '../../../PdfRenderer/PdfToRender/InvoicePdfRenderer';
import BillingInfoDrawer from '../../Drawers/BillingInfoDrawer';
import ClientDrawer from '../../Drawers/ClientDrawer';
import BillingInformation from './InvoiceFormItems/BillingInformation';
import { InvoiceCalculations } from './InvoiceFormItems/InvoiceCalculations';
import InvoiceItems from './InvoiceFormItems/InvoiceItems';
import InvoiceNumberIssueDateWithDueInfo from './InvoiceFormItems/InvoiceNumberIssueDateWithDueInfo';
import InvoiceStatus from './InvoiceFormItems/InvoiceStatus';
import NoteWithSignature from './InvoiceFormItems/NoteWithSignature';
import OfficeAddress from './InvoiceFormItems/OfficeAddress';

interface props {
  userDataList: IUser[] | undefined;
  isLoadingUserDataList: boolean;
  billingInfoData: IBillingInfo | undefined;
  isLoadingBillingInfo: boolean;
  errorBillingInfo: unknown;
  refetchAllUsers: () => void;
  refetchBillingInfo: () => void;
}

const InvoiceForm: React.FC<props> = ({
  userDataList,
  isLoadingUserDataList,
  billingInfoData,
  isLoadingBillingInfo,
  errorBillingInfo,
  refetchAllUsers,
  refetchBillingInfo,
}) => {
  const {
    invoiceMode,
    drawerToBeOpenedAtSpecificMode,
    selectedUser,
    selectedReceiver,
    setSelectedUser,
    setSelectedReceiver,
    setDrawerToBeOpenedAtSpecificMode,
    setBillingInfoId,
  } = useInvoiceStore();
  const { handleDrawerOpen, handleDrawerClose } = useDrawerStore();

  const { setValues, values } = useFormikContext<InvoiceSchemaType>();

  // When a user is selected on billing info section
  const handleSelectUser = (userId: string) => {
    setBillingInfoId(null);
    setValues({ ...values, user_id: userId });
    setSelectedUser(userDataList?.find((user) => user.id === userId));
    if (!isLoadingBillingInfo && !billingInfoData) {
      handleDrawerOpen('create');
      setDrawerToBeOpenedAtSpecificMode('billingInfoDrawerCreate');
    } else if (billingInfoData && !billingInfoData.user) {
      handleDrawerOpen('create');
      setDrawerToBeOpenedAtSpecificMode('billingInfoDrawerCreate');
    }
  };

  // This function sets the billing info user_id for invoice form
  const handleSelectUserForBillingInfo = (userId: string) => {
    setValues({ ...values, user_id: userId });
  };

  // When a user is selected on notes and signature section
  const handleSelectReceiver = (value: string) => {
    setValues({ ...values, received_by_id: value });
    setSelectedReceiver(userDataList?.find((user) => user.id === value));
  };

  // Open the Client Drawer
  const onOpenClientDrawer = (openMode: 'create' | 'update') => {
    handleDrawerOpen(openMode);
    if (openMode === 'create') {
      setSelectedUser(undefined);
      setDrawerToBeOpenedAtSpecificMode('clientDrawerCreate');
    } else {
      setDrawerToBeOpenedAtSpecificMode('clientDrawerUpdate');
    }
  };

  // close the drawer
  const onDrawerClose = () => {
    handleDrawerClose();
    setDrawerToBeOpenedAtSpecificMode(undefined);
  };

  if (invoiceMode === 'edit') {
    return (
      <div className="overscroll-auto w-full xl:w-[8.3in] h-fit xl:min-h-[11.69in] xl:border xl:border-black-1 xl:border-opacity-50 rounded mb-10">
        <form className="h-full w-full xl:p-[1cm] relative">
          <InvoiceStatus status={values.status as INVOICE_STATUS_TYPE} />
          {/* Invoice intro */}
          <div className="flex flex-wrap xl:flex-nowrap justify-between">
            {/* Top left portion of the invoice */}
            <div className="flex flex-col space-y-10 w-full xl:w-1/2">
              {/* Office addresss */}
              <OfficeAddress />
              {/* Billing information */}
              <BillingInformation
                userDataList={userDataList}
                isLoadingUserDataList={isLoadingUserDataList}
                handleSelectUser={handleSelectUser}
                billingInfoData={billingInfoData}
                isLoadingBillingInfo={isLoadingBillingInfo}
                errorOnBillingInfo={errorBillingInfo}
                onOpenClientDrawer={onOpenClientDrawer}
              />
            </div>

            {/* Top right portion of the invoice */}
            <div className="w-full xl:w-1/2 my-5 xl:my-0 flex xl:flex-col xl:justify-between xl:items-end">
              <div className="hidden w-full xl:flex justify-end mb-5">
                <img src={LogoWithText} width={150} height={50} />
              </div>
              <div>
                <InvoiceNumberIssueDateWithDueInfo />
              </div>
            </div>
          </div>

          {/* Table of invoice items */}
          <div className="w-full">
            <InvoiceItems />
          </div>

          {/* Calucation part of invoice */}
          <div>
            <InvoiceCalculations />
          </div>

          {/* Notes and signature */}
          <NoteWithSignature
            selectedReceiver={selectedReceiver}
            handleSelectReceiver={handleSelectReceiver}
            userDataList={userDataList}
          />
        </form>
        {/* Open billing info drawer in create mode */}
        {!isLoadingBillingInfo &&
          drawerToBeOpenedAtSpecificMode === 'billingInfoDrawerCreate' &&
          !billingInfoData?.user && <BillingInfoDrawer onClose={onDrawerClose} />}
        {/* Open billing info drawer in update mode */}
        {!isLoadingBillingInfo &&
          drawerToBeOpenedAtSpecificMode === 'billingInfoDrawerUpdate' && (
            <BillingInfoDrawer
              onClose={onDrawerClose}
              billingInfoData={billingInfoData}
              refetchBillingDetails={refetchBillingInfo}
            />
          )}
        {/* Open Client Drawer in create mode*/}
        {(drawerToBeOpenedAtSpecificMode === 'clientDrawerCreate' ||
          drawerToBeOpenedAtSpecificMode === 'clientDrawerUpdate') && (
          <ClientDrawer
            onClose={onDrawerClose}
            userId={selectedUser?.id ?? null}
            refetchAllUsers={refetchAllUsers}
            handleSelectUserForBillingInfo={handleSelectUserForBillingInfo}
          />
        )}
      </div>
    );
  } else {
    const { subTotal, total } = utils.getInvoiceCalculations({ invoiceValues: values });
    return (
      <InvoicePdfRenderer
        invoiceFormData={{
          id: values.invoice_id,
          amount_paid: values.amount_paid ?? 0,
          due_date: values.due_date,
          invoice_subject: values.invoice_subject,
          invoice_items: values.invoice_items,
          issue_date: values.issue_date,
          parent_invoice_id: values.parent_invoice_id ?? '',
          received_by_id: values.received_by_id ?? '',
          status: values.status as INVOICE_STATUS_TYPE,
          sub_total: subTotal,
          tax_percentage: values.tax_percentage ?? 0,
          discount: values.discount,
          discount_type: values.discount_type,
          total: total,
          user_id: '',
          user: { ...(billingInfoData?.user as IUser), billing_info: billingInfoData },
          received_by: selectedReceiver,
        }}
      />
    );
  }
};

export default InvoiceForm;
