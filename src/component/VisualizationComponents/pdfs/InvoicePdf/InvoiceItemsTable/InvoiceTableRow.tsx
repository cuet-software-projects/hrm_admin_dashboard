import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { Fragment } from 'react';

import { InvoiceItemType } from '../../../../../types/invoice.type';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
    paddingVertical: '15px',
  },
  description: {
    width: '60%',
    textAlign: 'left',
    paddingLeft: 8,
  },
  qty: {
    width: '10%',
    textAlign: 'right',
    paddingRight: 8,
  },
  rate: {
    width: '15%',
    textAlign: 'right',
    paddingRight: 8,
  },
  amount: {
    width: '15%',
    textAlign: 'right',
    paddingRight: 8,
  },
});

const InvoiceTableRow = ({ items }: { items: InvoiceItemType[] }) => {
  const rows = items.map((item, index) => (
    <View style={styles.row} key={index}>
      <Text style={styles.description}>{item.name}</Text>
      <Text style={styles.qty}>{item.quantity}</Text>
      <Text style={styles.rate}>{item.price}</Text>
      <Text style={styles.amount}>{(item.quantity * item.price).toFixed(2)}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
