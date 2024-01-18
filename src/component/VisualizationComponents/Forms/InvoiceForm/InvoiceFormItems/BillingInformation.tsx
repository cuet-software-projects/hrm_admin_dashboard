import { Button, Divider, Skeleton } from 'antd';
import Select from 'antd/es/select';
import { ErrorMessage, useFormikContext } from 'formik';

import { utils } from '../../../../../helpers/utility';
import { InvoiceSchemaType } from '../../../../../schema/InvoiceSchema';
import { useInvoiceStore } from '../../../../../store/invoiceStore';
import { IUser } from '../../../../../types';
import { IBillingInfo } from '../../../../../types/billing-info.type';
import Label from '../../../../Resuables/Label';
import PictureOrAvatar from '../../../../Resuables/PictureOrAvatar';
import InvoiceBillingInfo from './InvoiceBillingInfo';

interface props {
  userDataList: IUser[] | undefined;
  isLoadingUserDataList: boolean;
  handleSelectUser: (value: string) => void;
  billingInfoData: IBillingInfo | undefined;
  isLoadingBillingInfo: boolean;
  errorOnBillingInfo: unknown;
  onOpenClientDrawer: (openMode: 'create' | 'update') => void;
}

const { Option } = Select;

const BillingInformation: React.FC<props> = ({
  userDataList,
  isLoadingUserDataList,
  handleSelectUser,
  billingInfoData,
  isLoadingBillingInfo,
  errorOnBillingInfo,
  onOpenClientDrawer,
}) => {
  const { selectedUser } = useInvoiceStore();
  const { values } = useFormikContext<InvoiceSchemaType>();

  if (errorOnBillingInfo) {
    <p>An error occured.</p>;
  }

  return (
    <div>
      <p className="text-2xl font-semibold mb-2">Bill Information</p>
      <Skeleton active loading={isLoadingBillingInfo} className="w-[60%]">
        <div className="w-[200px] py-3">
          <Label htmlFor="user_id">Select a User</Label>
          <br />
          <Select
            id="user_id"
            size="large"
            loading={isLoadingUserDataList}
            showSearch
            optionLabelProp="label"
            filterOption={utils.onFilterOption}
            value={values.user_id.length > 0 && selectedUser ? values.user_id : undefined}
            placeholder="Select User"
            onSelect={handleSelectUser}
            className="w-full"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Button
                  block
                  size="large"
                  onClick={() => onOpenClientDrawer('create')}
                  className="default-button-style bg-gradient-to-br from-brand-grad-1 to-brand-grad-2 hover:bg-gradient-to-bl text-white-1"
                >
                  Add Client
                </Button>
              </>
            )}
          >
            {userDataList &&
              userDataList.map((userItem) => {
                return (
                  <Option
                    key={userItem.id}
                    value={userItem.id}
                    label={`${userItem.first_name} ${userItem.last_name}`}
                  >
                    <div className="flex justify-start items-center">
                      <PictureOrAvatar userData={{ user: userItem }} />
                      <span className="ml-2 w-[100px] overflow-ellipsis text-left">{`${userItem.first_name} ${userItem.last_name}`}</span>
                    </div>
                  </Option>
                );
              })}
          </Select>
          <ErrorMessage name="user_id" component="div" className="error" />
        </div>

        {/* Show billing Information */}
        {billingInfoData?.id && <InvoiceBillingInfo billingInfo={billingInfoData} />}
      </Skeleton>
    </div>
  );
};

export default BillingInformation;
