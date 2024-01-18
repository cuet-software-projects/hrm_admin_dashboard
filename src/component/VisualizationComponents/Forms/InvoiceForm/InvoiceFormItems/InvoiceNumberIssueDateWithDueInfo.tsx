import { Divider, Input } from 'antd';
import dayjs from 'dayjs';
import { ErrorMessage, useFormikContext } from 'formik';
import React, { useState } from 'react';

import { utils } from '../../../../../helpers/utility';
import { InvoiceSchemaType } from '../../../../../schema/InvoiceSchema';
import CustomDatePicker from '../../../../Resuables/CustomDatePicker';

const InvoiceNumberIssueDateWithDueInfo: React.FC = () => {
  const { values, setValues, handleChange } = useFormikContext<InvoiceSchemaType>();
  const [issueDate, setIssueDate] = useState<Date | string | null>(null);
  const [dueDate, setDueDate] = useState<Date | string | null>(null);

  const handleSelectIssueDate = (date: Date) => {
    setIssueDate(date);
    setValues({
      ...values,
      issue_date: dayjs(date).toISOString(),
    });
  };

  const handleSelectDueDate = (date: Date) => {
    setDueDate(date);
    setValues({
      ...values,
      due_date: dayjs(date).toISOString(),
    });
  };

  return (
    <div className="text-grey-1">
      <div>
        <div className="flex justify-between items-center">
          <span className="w-32">Invoice ID</span>
          <div>
            <Input
              type="text"
              id="invoice_id"
              name="invoice_id"
              value={values.invoice_id}
              onChange={handleChange}
              placeholder="ID"
              className="w-40 bg-primary bg-opacity-10"
              classNames={{ input: 'bg-transparent' }}
              allowClear
            />
            <ErrorMessage name="invoice_id" component="div" className="error" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center my-2">
        <span>Date of Issue</span>
        <div>
          <CustomDatePicker
            className="w-40 bg-primary bg-opacity-10"
            selectedDate={
              values.issue_date ? dayjs(values.issue_date).toDate() : issueDate
            }
            onChangeDate={handleSelectIssueDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="--/--/----"
          />
          <ErrorMessage name={`issue_date`} component="div" className="error" />
        </div>
      </div>
      <div className="flex justify-between items-center my-2">
        <span>Date of Due</span>
        <div>
          <CustomDatePicker
            className="w-40 bg-primary bg-opacity-10"
            selectedDate={values.due_date ? dayjs(values.due_date).toDate() : dueDate}
            onChangeDate={handleSelectDueDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="--/--/----"
          />
          <ErrorMessage name={`issue_date`} component="div" className="error" />
        </div>
      </div>

      <Divider className="my-4" />

      <div className="flex justify-between">
        <span className="w-40">Amount Due (BDT)</span>
        <span className="w-40 text-right">
          {utils.getInvoiceCalculations({ invoiceValues: values }).amountDue.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default InvoiceNumberIssueDateWithDueInfo;
