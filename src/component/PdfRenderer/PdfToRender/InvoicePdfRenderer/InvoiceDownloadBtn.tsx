import { PDFDownloadLink } from '@react-pdf/renderer';
import { Skeleton } from 'antd';
import dayjs from 'dayjs';

import { useGetInvoiceDetails } from '../../../../customHooks/invoice/useGetInvoiceDetails';
import { useInvoiceStore } from '../../../../store/invoiceStore';
import Icon from '../../../Resuables/Icon/Icon';
import InvoicePdf from '../../../VisualizationComponents/pdfs/InvoicePdf';

const InvoiceDownloadBtn = () => {
  const { invoiceId } = useInvoiceStore();
  const { data: invoiceData, isLoading } = useGetInvoiceDetails({
    invoiceId: `${invoiceId}`,
  });

  // Get Client Name
  const userName =
    invoiceData?.user?.first_name ?? '' + ' ' + invoiceData?.user?.last_name ?? '';

  // Create invoice file name (invoiceSub_clientName_timestamp)
  const invoiceFileName = `${invoiceData?.invoice_subject}_${userName}_${dayjs().format(
    'DD-MM-YYYY hh:mm A',
  )}`;

  return (
    <Skeleton title={false} loading={isLoading} paragraph={{ rows: 1, width: 100 }}>
      <PDFDownloadLink
        className="h-100 text-white-1 flex justify-center items-center"
        fileName={`${invoiceFileName}.pdf`}
        document={<InvoicePdf invoice={invoiceData} />}
      >
        <Icon name="ic_download" color="white" size={50} />
      </PDFDownloadLink>
    </Skeleton>
  );
};

export default InvoiceDownloadBtn;
