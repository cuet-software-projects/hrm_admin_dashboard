import { Divider, message, Select } from 'antd';
import { ErrorMessage, useFormikContext } from 'formik';

import { utils } from '../../../../../helpers/utility';
import { InvoiceSchemaType } from '../../../../../schema/InvoiceSchema';
import { INVOICE_DISCOUNT_TYPE } from '../../../../../types';
import { INVOICE_DISCOUNT_TYPE_VALUES } from '../../../../../types/values';
import Input from '../../../../Resuables/Input';

export const InvoiceCalculations = () => {
  const { values, handleChange, setValues } = useFormikContext<InvoiceSchemaType>();

  const { subTotal, total, amountDue } = utils.getInvoiceCalculations({
    invoiceValues: values,
  });

  const handleChangeDiscount = (value: INVOICE_DISCOUNT_TYPE) =>
    setValues({ ...values, discount_type: value });

  const handleChangeTax = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseFloat(e.target.value) > total) {
      message.error('Amount Paid can not be greater than the total amount', 3);
    } else {
      handleChange(e);
    }
  };

  return (
    <>
      <div className="p-4 w-fit xl:min-w-[350px] xl:ml-auto text-md">
        <div className="flex justify-between">
          <div className="text-right font-semibold w-3/6">Subtotal</div>
          <div className="text-right">{subTotal.toFixed(2)}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-right font-semibold w-3/6">Tax(%)</div>
          <div className="flex justify-end items-center w-3/6">
            <Input
              id="tax_percentage"
              type="number"
              className="text-right pr-0 outline-none rounded ml-auto"
              style={{ width: '90%' }}
              value={values.tax_percentage}
              onChange={handleChangeTax}
            />
          </div>
        </div>
        <div className="text-right">
          <ErrorMessage component="div" name="tax_percentage" className="error" />
        </div>

        {/* Discount */}
        <div className="flex justify-between items-center pt-3">
          <div className="text-right font-semibold w-3/6">Discount Type</div>
          <div className="flex justify-end items-center w-3/6">
            <Select
              id="discount_type"
              className="w-full"
              style={{ width: '90%' }}
              placeholder="Select"
              options={INVOICE_DISCOUNT_TYPE_VALUES.map((value) => ({
                text: value,
                value: value,
              }))}
              value={values.discount_type}
              onChange={handleChangeDiscount}
            />
          </div>
        </div>

        <div className="text-right">
          <ErrorMessage component="div" name="discount_type" className="error" />
        </div>

        <div className="flex justify-between items-center pt-3">
          <div className="text-right font-semibold w-3/6">
            Discount({`${values.discount_type === 'PERCENTAGE' ? '%' : '$'}`})
          </div>
          <div className="flex justify-end items-center w-3/6">
            <Input
              id="discount"
              name="discount"
              type="number"
              readOnly={!values.discount_type}
              max={values.discount_type === 'PERCENTAGE' ? 100 : undefined}
              className="text-right pr-0 outline-none rounded ml-auto"
              style={{ width: '90%' }}
              value={values.discount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="text-right">
          <ErrorMessage component="div" name="discount" className="error" />
        </div>

        <Divider className="my-3" />

        <div className="flex justify-between">
          <div className="text-right font-semibold w-3/6">Total</div>
          <div className="text-right">{total.toFixed(2)}</div>
        </div>
        <div className="flex justify-end items-center">
          <div className="text-right font-semibold w-3/6">Amount Paid</div>
          <div className="w-3/6">
            <Input
              id="amount_paid"
              type="number"
              className="text-right pr-0 outline-none rounded ml-auto"
              style={{ width: '90%' }}
              value={values.amount_paid}
              onChange={handleChange}
            />
          </div>
        </div>
        <ErrorMessage component="div" name="amount_paid" className="error" />

        <Divider className="my-3" />

        <div className="flex justify-between">
          <div className="text-right font-semibold w-3/6">Amount Due (BDT)</div>
          <div className="text-right">৳ {amountDue.toFixed(2)}</div>
        </div>
      </div>
    </>
  );
};
