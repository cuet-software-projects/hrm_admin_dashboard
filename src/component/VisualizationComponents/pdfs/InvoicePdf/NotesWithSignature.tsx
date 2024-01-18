import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { Fragment } from 'react';

import { IInvoice } from '../../../../types/invoice.type';

const styles = StyleSheet.create({
  container: {
    fontSize: 12,
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    width: '100%',
  },
});

const NoteWithSignature = ({ invoice }: { invoice: IInvoice | undefined }) => {
  return (
    <View style={styles.container}>
      {invoice?.note && (
        <Fragment>
          <Text style={styles.label}>Notes</Text>
          <View style={styles.text}>
            <Text>{invoice?.note}</Text>
          </View>
        </Fragment>
      )}
      {invoice?.received_by && (
        <Fragment>
          <View style={{ marginTop: '20px' }}>
            <Text style={styles.label}>Recieved By</Text>
            <View style={styles.text}>
              <Text>
                {`${invoice?.received_by?.first_name} ${invoice?.received_by?.last_name}\nDiligite`}
              </Text>
            </View>
          </View>
        </Fragment>
      )}
    </View>
  );
};

export default NoteWithSignature;
