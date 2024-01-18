import {
  invoicePdfName,
  salaryCertificatePdfName,
} from '../../../constants/GlobalConstants';
import usePdfStore from '../../../store/pdfStore';
import SalaryCertificateDownloadApplyBtn from '../../SalaryCertificate/SalaryCertificateDownloadApplyBtn';
import InvoiceDownloadBtn from './InvoicePdfRenderer/InvoiceDownloadBtn';

const PdfDownloadButtons = () => {
  const { currentPdf } = usePdfStore();

  switch (currentPdf) {
    case salaryCertificatePdfName:
      return <SalaryCertificateDownloadApplyBtn />;

    case invoicePdfName:
      return <InvoiceDownloadBtn />;

    default:
      return <></>;
  }
};

export default PdfDownloadButtons;
