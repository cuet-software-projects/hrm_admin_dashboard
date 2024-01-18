// eslint-disable-next-line simple-import-sort/imports
import { Input as AntdInput, Button } from 'antd';
import { ErrorMessage, FieldArray, useFormikContext } from 'formik';

import {
  InvoiceItemSchemaType,
  InvoiceSchemaType,
} from '../../../../../schema/InvoiceSchema';
import GlobalCrossButton from '../../../../Resuables/GlobalCrossButton';
import Input from '../../../../Resuables/Input';

type ArrayHelpers<T> = {
  push: (value: T) => void;
  insert: (index: number, value: T) => void;
  replace: (index: number, value: T) => void;
  remove: (index: number) => void;
  move: (from: number, to: number) => void;
  swap: (indexA: number, indexB: number) => void;
};

const InvoiceItems = () => {
  const { values, errors, handleChange } = useFormikContext<InvoiceSchemaType>();
  return (
    <div className="text-center my-10 w-full">
      <div className="bg-black-1 rounded text-white-1 flex">
        <div className="p-4 rounded-l flex-grow text-left">Description</div>
        <div className="p-4 w-[100px]">Rate</div>
        <div className="p-4 w-[100px]">Qty</div>
        <div className="p-4 rounded-r w-[120px]">Line Total</div>
      </div>
      <FieldArray
        name="invoice_items"
        render={(arrayHelpers: ArrayHelpers<InvoiceItemSchemaType>) => (
          <div>
            {values.invoice_items.map((item, index) => (
              <div key={index} className="w-full flex items-center relative">
                <div className="flex flex-col py-3 border-b border-b-grey-1 border-opacity-50 w-full">
                  <div className="flex">
                    {/* Item Name */}
                    <div className="flex-grow text-left">
                      <AntdInput.TextArea
                        id={`invoice_items.${index}.name`}
                        name={`invoice_items.${index}.name`}
                        value={values.invoice_items[index].name}
                        onChange={handleChange}
                        placeholder="name"
                        className="w-full text-left bg-primary bg-opacity-10 border-none text-black-1 outline-none hide-scrollbar"
                        size="large"
                        autoSize
                      />
                    </div>

                    {/* Item Price */}
                    <div className="w-[100px]">
                      <Input
                        type="number"
                        id={`invoice_items.${index}.price`}
                        name={`invoice_items.${index}.price`}
                        min={0}
                        value={values.invoice_items[index].price}
                        onChange={handleChange}
                        placeholder="price"
                        className="bg-primary mx-2 text-center bg-opacity-10 border-none outline-none"
                      />
                    </div>

                    {/* Item Quantity */}
                    <div className="w-[100px] px-2">
                      <Input
                        type="number"
                        id={`invoice_items.${index}.quantity`}
                        name={`invoice_items.${index}.quantity`}
                        min={0}
                        value={values.invoice_items[index].quantity}
                        onChange={handleChange}
                        placeholder="quantity"
                        className="bg-primary mx-2 text-center bg-opacity-10 border-none outline-none"
                      />
                    </div>

                    {/* Item Line total */}
                    <div className="w-[120px] flex items-center justify-center">
                      {values.invoice_items[index].quantity *
                        values.invoice_items[index].price}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-[120px] flex-grow text-left">
                      <ErrorMessage
                        name={`invoice_items.${index}.name`}
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="w-[100px] text-center">
                      <ErrorMessage
                        name={`invoice_items.${index}.price`}
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="w-[100px] text-center">
                      <ErrorMessage
                        name={`invoice_items.${index}.quantity`}
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="error w-[120px]"></div>
                  </div>
                </div>

                {/* Remove Item Button */}
                <div className={`w-fit absolute -right-4`}>
                  <GlobalCrossButton
                    disabled={values.invoice_items.length === 1}
                    onClick={() => arrayHelpers.remove(index)}
                  />
                </div>
              </div>
            ))}

            <Button
              type="default"
              className="mt-5 bg-black-1 text-white-1"
              onClick={() => arrayHelpers.push({ name: '', price: 1, quantity: 1 })}
            >
              Add Item
            </Button>
          </div>
        )}
      />
      {errors.invoice_items && typeof errors.invoice_items === 'string' && (
        <p className="error">{errors.invoice_items}</p>
      )}
    </div>
  );
};

export default InvoiceItems;
