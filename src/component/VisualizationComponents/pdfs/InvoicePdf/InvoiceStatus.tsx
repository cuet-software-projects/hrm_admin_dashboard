import { StyleSheet, Text, View } from '@react-pdf/renderer';

import { IInvoice } from '../../../../types/invoice.type';
import { INVOICE_STATUS_VALUES } from '../../../../types/values';

const getStatusColor = (status: string | undefined) => {
  if (status === INVOICE_STATUS_VALUES[5]) {
    return 'green'; // Change status color to green for 'paid' status
  } else if (status === INVOICE_STATUS_VALUES[4]) {
    return 'red'; // Change status color to red for 'partially_paid' status
  }
  return 'red';
};

const styles = StyleSheet.create({
  statusContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '8in',
    height: '4in',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusWrapper: {
    width: 'auto',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    transform: 'rotate(-25deg)',
    padding: '10px',
  },
  statusText: {
    fontSize: 18,
    lineHeight: 0,
    fontWeight: 'bold',
  },
});

const InvoiceStatus = ({ invoice }: { invoice: IInvoice | undefined }) => {
  const statusColor = getStatusColor(invoice?.status);

  return (
    <View style={styles.statusContainer}>
      <View
        style={{
          ...styles.statusWrapper,
          border: `2px solid ${statusColor}`,
        }}
      >
        <Text style={{ ...styles.statusText, color: statusColor }}>
          {invoice?.status.toLowerCase().includes('paid')
            ? invoice.status.split('_').join(' ')
            : ''}
        </Text>
      </View>
    </View>
  );
};

export default InvoiceStatus;
