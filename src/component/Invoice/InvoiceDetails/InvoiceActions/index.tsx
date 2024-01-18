/* eslint-disable simple-import-sort/imports */
import {
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  Loading3QuartersOutlined,
  SaveOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button, FloatButton, Grid, Spin, message } from 'antd';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { utils } from '../../../../helpers/utility';
import { InvoiceSchemaType } from '../../../../schema/InvoiceSchema';
import { useInvoiceStore } from '../../../../store/invoiceStore';
import { INVOICE_STATUS_TYPE, IUser } from '../../../../types';
import { IBillingInfo } from '../../../../types/billing-info.type';
import InvoicePdf from '../../../VisualizationComponents/pdfs/InvoicePdf';

const { useBreakpoint } = Grid;

interface props {
  billingInfoData: IBillingInfo | undefined;
}

const InvoiceActions: React.FC<props> = ({ billingInfoData }) => {
  const { xl } = useBreakpoint();

  const { invoiceMode, invoiceId, selectedReceiver, changeInvoiceMode } =
    useInvoiceStore();
  const { handleSubmit, isSubmitting, isValid, dirty, values } =
    useFormikContext<InvoiceSchemaType>();

  // Actions of the buttons
  const onClickForSend = () =>
    message.info("This button's feature is on maintenance.", 3);

  const onClickForEdit = () => changeInvoiceMode('edit');

  const onClickForPreview = () => {
    (invoiceId ? true : dirty) && isValid
      ? changeInvoiceMode('preview')
      : message.warning('Fill up the form first and then you can preview it.', 4);
  };

  const onClickForSave = () => handleSubmit();

  // Functions to render the buttons
  const renderSendInvoiceButton = () => {
    if (xl) {
      return (
        <Button
          size="large"
          className="btn bg-gradient-to-br from-brand-grad-1 to-brand-grad-2 text-white-1 border-none w-full flex justify-center items-center"
          onClick={onClickForSend}
        >
          Send Invoice
        </Button>
      );
    }

    return (
      <FloatButton
        icon={<SendOutlined rev={''} />}
        onClick={onClickForSend}
        tooltip={<p>Send</p>}
      />
    );
  };

  const renderPreviewButton = () => {
    if (xl) {
      return (
        <Button
          size="large"
          className="btn btn-outline w-full flex justify-center items-center"
          onClick={onClickForPreview}
        >
          <span>Preview</span>
        </Button>
      );
    }

    return <FloatButton icon={<EyeOutlined rev={''} />} onClick={onClickForPreview} />;
  };

  const InvoiceDownloader = () => {
    const { subTotal, total } = utils.getInvoiceCalculations({ invoiceValues: values });
    // Get Client Name
    const userName = 'Tanvir';

    // Create invoice file name (invoiceSub_clientName_timestamp)
    const invoiceFileName = `${values.invoice_subject}_${userName}_${dayjs().format(
      'DD-MM-YYYY hh:mm A',
    )}`;
    return (
      <PDFDownloadLink
        className="h-100 text-white-1 flex justify-center items-center"
        fileName={`${invoiceFileName}.pdf`}
        document={
          <InvoicePdf
            invoice={{
              amount_paid: values.amount_paid ?? 0,
              due_date: values.due_date,
              invoice_subject: values.invoice_subject,
              id: values.invoice_id,
              issue_date: values.issue_date,
              invoice_items: values.invoice_items,
              parent_invoice_id: values.parent_invoice_id ?? '',
              received_by_id: values.received_by_id ?? '',
              status: values.status as INVOICE_STATUS_TYPE,
              sub_total: subTotal,
              tax_percentage: values.tax_percentage ?? 0,
              discount: values.discount ?? 0,
              discount_type: values.discount_type,
              total: total,
              user_id: values.user_id,
              user: {
                ...(billingInfoData?.user as IUser),
                billing_info: billingInfoData,
              },
              received_by: selectedReceiver,
            }}
          />
        }
      >
        Download
      </PDFDownloadLink>
    );
  };

  const renderDownloadButton = () => {
    if (xl) {
      return (
        <Button
          size="large"
          className="btn btn-outline w-full flex justify-center items-center"
        >
          <InvoiceDownloader />
        </Button>
      );
    }

    return <FloatButton icon={<DownloadOutlined rev={''} />} tooltip={<p>Download</p>} />;
  };

  const renderEditButton = () => {
    if (xl) {
      return (
        <Button
          size="large"
          className="btn btn-outline w-full flex justify-center items-center"
          onClick={onClickForEdit}
        >
          <span>Edit</span>
        </Button>
      );
    }

    return (
      <FloatButton
        icon={<EditOutlined rev={''} />}
        onClick={onClickForEdit}
        tooltip={<p>Edit</p>}
      />
    );
  };

  const renderSaveButton = () => {
    if (xl) {
      return (
        <Button
          size="large"
          onClick={onClickForSave}
          className="btn btn-outline w-full flex justify-center items-center"
          loading={isSubmitting}
        >
          <span>Save</span>
        </Button>
      );
    }
    return (
      <FloatButton
        icon={
          isSubmitting ? (
            <Spin indicator={<Loading3QuartersOutlined rev={''} />} />
          ) : (
            <SaveOutlined rev={''} />
          )
        }
        tooltip={<p>Save</p>}
        onClick={isSubmitting ? undefined : onClickForSave}
      />
    );
  };

  return (
    <>
      {renderSendInvoiceButton()}

      {invoiceMode === 'edit' && xl && renderPreviewButton()}

      {!xl && renderDownloadButton()}

      {invoiceMode === 'preview' && (
        <>
          {renderDownloadButton()}
          {renderEditButton()}
        </>
      )}

      {renderSaveButton()}
    </>
  );
};

export default InvoiceActions;
