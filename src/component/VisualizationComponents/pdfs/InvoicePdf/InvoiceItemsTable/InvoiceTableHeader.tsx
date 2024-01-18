import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    borderRadius: 2,
    height: 30,
    color: 'white',
    textAlign: 'center',
    fontStyle: 'bold',
    flexGrow: 1,
    paddingVertical: '20px',
  },
  description: {
    width: '60%',
    textAlign: 'left',
    paddingLeft: '8px',
  },
  rate: {
    width: '15%',
    textAlign: 'right',
    paddingRight: 8,
  },
  qty: {
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

const InvoiceTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.description}>Description</Text>
    <Text style={styles.rate}>Rate</Text>
    <Text style={styles.qty}>Qty</Text>
    <Text style={styles.amount}>Line Total</Text>
  </View>
);

export default InvoiceTableHeader;
