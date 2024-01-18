import { StyleSheet, Text, View } from '@react-pdf/renderer';

import { IInvoice } from '../../../../types/invoice.type';
import InvoiceDivider from './InvoiceDivider';

const styles = StyleSheet.create({
  container: {
    marginTop: '20px',
    width: '50%',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    width: '60%',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  value: {
    width: '40%',
    textAlign: 'right',
  },
  divider: {
    marginBottom: 4,
  },
});

const InvoiceCalculations = ({ invoice }: { invoice: IInvoice | undefined }) => {
  const amountDue = (invoice?.total ?? 0) - (invoice?.amount_paid ?? 0);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>{invoice?.sub_total.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Tax(%)</Text>
        <Text style={styles.value}>{invoice?.tax_percentage}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Discount({invoice?.discount_type === 'PERCENTAGE' ? '%' : '$'})
        </Text>
        <Text style={styles.value}>{invoice?.discount ?? 0}</Text>
      </View>

      <View style={styles.divider}>
        <InvoiceDivider />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Total</Text>
        <Text style={styles.value}>{invoice?.total.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Amount Paid</Text>
        <Text style={styles.value}>{invoice?.amount_paid ?? 0}</Text>
      </View>

      <View style={styles.divider}>
        <InvoiceDivider />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Amount Due (BDT)</Text>
        <Text style={styles.value}>{amountDue.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default InvoiceCalculations;
