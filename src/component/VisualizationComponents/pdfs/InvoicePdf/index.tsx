import { Document, Font, Image, Page, StyleSheet, View } from '@react-pdf/renderer';

import PoppinsBold from '../../../../assets/fonts/poppins/Poppins-Bold.ttf';
import PoppinsRegular from '../../../../assets/fonts/poppins/Poppins-Regular.ttf';
import logo from '../../../../assets/images/logo-with-text.png';
import { IInvoice } from '../../../../types/invoice.type';
import BillInformation from './BillInformation';
import InvoiceCalculations from './InvoiceCalculations';
import InvoiceDatesWithDueInfo from './InvoiceDatesWithDueInfo';
import InvoiceItemsTable from './InvoiceItemsTable';
import InvoiceStatus from './InvoiceStatus';
import NoteWithSignature from './NotesWithSignature';
import OfficeAddress from './OfficeAddress';

Font.register({
  family: 'Poppins',
  fonts: [
    {
      src: PoppinsRegular,
      fontWeight: 400,
    },
    {
      src: PoppinsBold,
      fontWeight: 800,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    padding: '0.5in',
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  defaultTextStyle: {
    fontFamily: 'Poppins',
    fontSize: 12,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSection: {
    width: '50%',
    flexDirection: 'column',
  },
  rightSection: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  logo: {
    width: '150px',
    height: '50px',
    marginBottom: '5px',
  },
});

const InvoicePdf = ({ invoice }: { invoice: IInvoice | undefined }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Invoice status */}
      {invoice?.status.toLowerCase().includes('paid') && (
        <InvoiceStatus invoice={invoice} />
      )}
      <View style={{ ...styles.container, ...styles.defaultTextStyle }}>
        {/* Top left portion of the invoice */}
        <View style={styles.leftSection}>
          <OfficeAddress />
          <BillInformation invoiceInfo={invoice} />
        </View>

        {/* Top right portion of the invoice */}
        <View style={styles.rightSection}>
          <Image style={styles.logo} src={logo} />
          <InvoiceDatesWithDueInfo invoice={invoice} />
        </View>
      </View>

      {/* Middle part of the invoice: Invoice item table */}
      <InvoiceItemsTable invoice={invoice} />

      {/* Bottom portion of the invoice */}
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ width: '50%' }}></View>
        <InvoiceCalculations invoice={invoice} />
      </View>
      <NoteWithSignature invoice={invoice} />
    </Page>
  </Document>
);

export default InvoicePdf;
