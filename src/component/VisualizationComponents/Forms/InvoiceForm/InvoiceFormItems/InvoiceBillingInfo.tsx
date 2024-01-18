import { Button } from 'antd';

import useDrawerStore from '../../../../../store/drawerStore';
import { useInvoiceStore } from '../../../../../store/invoiceStore';
import { IBillingInfo } from '../../../../../types/billing-info.type';

interface BillInfoProps {
  billingInfo: IBillingInfo;
}

const InvoiceBillingInfo: React.FC<BillInfoProps> = ({ billingInfo: billingInfo }) => {
  const { handleDrawerOpen } = useDrawerStore();
  const { setDrawerToBeOpenedAtSpecificMode } = useInvoiceStore();

  // Open billing info drawer on update mode
  const onOpenDrawer = () => {
    handleDrawerOpen('update');
    setDrawerToBeOpenedAtSpecificMode('billingInfoDrawerUpdate');
  };

  return (
    <div>
      <div className="text-grey-1">
        <p>{`${billingInfo.user?.first_name} ${billingInfo.user?.last_name}`}</p>
        <p>
          {billingInfo.address_line_1}, {billingInfo.address_line_2}
        </p>
        <p>
          {billingInfo.city && <span>{billingInfo.city}, </span>}
          {billingInfo.state && <span>{billingInfo.state}, </span>}
          {billingInfo.country && <span>{billingInfo.country}</span>}
        </p>
        {billingInfo.zip_code && (
          <p>
            <span>Zip Code: {billingInfo.zip_code}</span>
          </p>
        )}

        <p>{billingInfo.user?.contact_number}</p>
      </div>
      <Button
        onClick={onOpenDrawer}
        size="middle"
        type="primary"
        className="bg-blue mt-1"
      >
        Update Billing Info
      </Button>
    </div>
  );
};

export default InvoiceBillingInfo;
