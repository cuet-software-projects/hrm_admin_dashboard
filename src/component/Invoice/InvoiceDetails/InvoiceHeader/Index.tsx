import { message } from 'antd';
import { useFormikContext } from 'formik';
import React from 'react';

import { utils } from '../../../../helpers/utility';
import { InvoiceSchemaType } from '../../../../schema/InvoiceSchema';
import { INVOICE_STATUS_TYPE } from '../../../../types';
import { IInvoice } from '../../../../types/invoice.type';
import { INVOICE_STATUS_VALUES } from '../../../../types/values';
import Input from '../../../Resuables/Input';
import Select from '../../../Resuables/Select/Select';

interface props {
  allInvoices: IInvoice[];
  isAllInvoiceLoading: boolean;
  handleSelectParentInvoice: ({ parentInvoiceId }: { parentInvoiceId: string }) => void;
}

const InvoiceHeader: React.FC<props> = ({
  handleSelectParentInvoice,
  allInvoices,
  isAllInvoiceLoading,
}) => {
  const { values, errors, touched, setValues } = useFormikContext<InvoiceSchemaType>();

  // Select Invoice Status
  const handleSelectInvoiceStatus = (value: INVOICE_STATUS_TYPE) => {
    const { amountDue } = utils.getInvoiceCalculations({ invoiceValues: values });

    // When PAID is selected but still amount due presents
    if (amountDue !== 0 && value === 'PAID') {
      message.warning('You can not choose PAID status when there is a due!!!', 3);
      return;
    }

    // When no due presents and still selected status is PARTIALLY_PAID
    if (value === 'PARTIALLY_PAID' && amountDue === 0) {
      message.warning('There is no due but you have selected PARTIALLY_PAID.', 3);
      return;
    }
    setValues({ ...values, status: value });
  };

  // When parent invoice is selected
  const onSelectInvoice = (value: string) =>
    handleSelectParentInvoice({ parentInvoiceId: value });

  // When parent invoice is cleared
  const onClearInvoice = () => {
    setValues({ ...values, parent_invoice_id: undefined });
    handleSelectParentInvoice({ parentInvoiceId: '' });
  };

  // Invoie subject input
  const onInputInvoiceSubject = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, invoice_subject: e.target.value });

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center py-10 w-full xl:w-[8.3in]">
        <p className="stylishHeaderText text-2xl">Generate Invoice</p>
        <div className="flex space-x-4 flex-wrap">
          {/* Choose invoice parent */}
          <div className="flex flex-col w-fit">
            <label>Parent Invoice</label>
            <Select
              className="border border-black-1 text-black-1 outline-none w-fit"
              loading={isAllInvoiceLoading}
              showSearch
              size="large"
              options={allInvoices.map((invoice: IInvoice) => ({
                label: invoice.id,
                value: invoice.id,
              }))}
              allowClear={true}
              onClear={onClearInvoice}
              value={
                values.parent_invoice_id && values.parent_invoice_id.length > 0
                  ? values.parent_invoice_id
                  : undefined
              }
              onChange={onSelectInvoice}
            />
          </div>
          {/* Choose invoice status */}
          <div className="flex flex-col w-fit">
            <label>Invoice Status</label>
            <Select
              className="select border border-black-1 text-black-1 outline-none w-fit"
              size="large"
              options={INVOICE_STATUS_VALUES.map((item: string) => ({
                label: item,
                value: item,
              }))}
              allowClear={false}
              value={values.status?.length > 0 ? values.status : undefined}
              onChange={handleSelectInvoiceStatus}
            />
            {errors.status && touched.status && <p className="error">{errors.status}</p>}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full xl:w-[8.3in] mb-5">
        <Input
          type="text"
          id="invoice_subject"
          name="invoice_subject"
          value={values.invoice_subject}
          onChange={onInputInvoiceSubject}
          placeholder="Invoice Subject"
          className="w-full text-left input border-b border-dashed border-black-1 rounded rounded-b-none outline-none"
        />
        {errors.invoice_subject && touched.invoice_subject && (
          <p className="error">{errors.invoice_subject}</p>
        )}
      </div>
    </div>
  );
};

export default InvoiceHeader;
