import {
  invoicePdfName,
  salaryCertificatePdfName,
} from '../../../constants/GlobalConstants';
import usePdfStore from '../../../store/pdfStore';
import InvoicePdfRenderer from './InvoicePdfRenderer';
import SalaryCertificatePdfRenderer from './SalaryCertificateRenderer';

const PdfToRender: React.FC = () => {
  const { currentPdf } = usePdfStore();
  switch (currentPdf) {
    case salaryCertificatePdfName:
      return <SalaryCertificatePdfRenderer />;
    case invoicePdfName:
      return <InvoicePdfRenderer />;
    default:
      return <></>;
  }
};

export default PdfToRender;
