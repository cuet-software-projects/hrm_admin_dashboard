import { BlobProvider } from '@react-pdf/renderer';

import { useGetInvoiceDetails } from '../../../../customHooks/invoice/useGetInvoiceDetails';
import InvoiceSkeleton from '../../../../Layout/Skeletons/InvoiceSkeleton';
import { useInvoiceStore } from '../../../../store/invoiceStore';
import { IInvoice } from '../../../../types/invoice.type';
import InvoicePdf from '../../../VisualizationComponents/pdfs/InvoicePdf';

const InvoicePdfRenderer = ({ invoiceFormData }: { invoiceFormData?: IInvoice }) => {
  const renderPdf = (data: IInvoice) => (
    <BlobProvider document={<InvoicePdf invoice={data} />}>
      {({ error, loading, url }) => {
        if (loading) {
          return <InvoiceSkeleton />;
        }
        if (error) {
          return <p>An error occurred.</p>;
        }
        return (
          url && (
            <div className="w-full">
              <iframe
                className={`bg-transparent w-screen lg:w-[8.3in] h-[11.7in] my-5 ${
                  invoiceFormData ? '' : 'mx-auto'
                } overflow-auto`}
                src={`${url}#toolbar=0`}
                title="Invoice PDF"
              ></iframe>
            </div>
          )
        );
      }}
    </BlobProvider>
  );

  if (invoiceFormData) {
    return renderPdf(invoiceFormData);
  }

  const { invoiceId } = useInvoiceStore();
  const { data: invoiceData, isLoading } = useGetInvoiceDetails({
    invoiceId: `${invoiceId}`,
  });

  if (isLoading) {
    return <InvoiceSkeleton />;
  }

  if (invoiceData) {
    return renderPdf(invoiceData);
  }

  return <p>A problem occured. Try Again.</p>;
};

export default InvoicePdfRenderer;
