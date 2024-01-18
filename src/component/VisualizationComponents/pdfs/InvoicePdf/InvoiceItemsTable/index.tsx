import { StyleSheet, View } from '@react-pdf/renderer';

import { IInvoice } from '../../../../../types/invoice.type';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
  },
});

const InvoiceItemsTable = ({ invoice }: { invoice: IInvoice | undefined }) => (
  <View style={styles.tableContainer}>
    <InvoiceTableHeader />
    <InvoiceTableRow items={invoice?.invoice_items ?? []} />
  </View>
);

export default InvoiceItemsTable;
