import { StyleSheet, Text, View } from '@react-pdf/renderer';
import dayjs from 'dayjs';

import { IInvoice } from '../../../../types/invoice.type';
import InvoiceDivider from './InvoiceDivider';

const styles = StyleSheet.create({
  container: {
    width: '200px',
  },
  info: {
    marginBottom: '4px',
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    justifyContent: 'space-between',
    color: '#6F6B74',
  },
  label: {
    fontWeight: 'bold',
    minWidth: '100px',
  },
  value: {
    textAlign: 'right',
  },
});

const InvoiceDatesWithDueInfo = ({ invoice }: { invoice: IInvoice | undefined }) => {
  const amountDue = (invoice?.total ?? 0) - (invoice?.amount_paid ?? 0);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.label}>Invoice ID</Text>
        <Text style={styles.value}>{invoice?.id}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Date of Issue</Text>
        <Text style={styles.value}>
          {dayjs(invoice?.issue_date).format('DD/MM/YYYY')}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Date of Due</Text>
        <Text style={styles.value}>{dayjs(invoice?.due_date).format('DD/MM/YYYY')}</Text>
      </View>

      <View style={styles.info}>
        <InvoiceDivider />
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Amount Due (BDT)</Text>
        <Text style={styles.value}>{amountDue.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default InvoiceDatesWithDueInfo;
