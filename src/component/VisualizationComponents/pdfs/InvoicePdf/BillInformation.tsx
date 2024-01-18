import { StyleSheet, Text, View } from '@react-pdf/renderer';

import { IInvoice } from '../../../../types/invoice.type';

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 20,
    color: '#6F6B74',
  },
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: 'black',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const BillInformation = ({ invoiceInfo }: { invoiceInfo: IInvoice | undefined }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Bill Information</Text>
      <Text>
        {invoiceInfo?.user?.first_name} {invoiceInfo?.user?.last_name}
      </Text>
      {invoiceInfo && (
        <>
          <Text>
            {invoiceInfo.user?.billing_info?.address_line_1}
            {invoiceInfo.user?.billing_info?.address_line_2
              ? `, ${invoiceInfo.user?.billing_info?.address_line_2}`
              : ''}
          </Text>
          <View style={styles.flex}>
            {invoiceInfo.user?.billing_info?.city && (
              <Text>{`${invoiceInfo.user.billing_info.city}, `}</Text>
            )}
            {invoiceInfo.user?.billing_info?.state && (
              <Text>{`${invoiceInfo.user.billing_info.state}, `}</Text>
            )}
            {invoiceInfo.user?.billing_info?.country && (
              <Text>{`${invoiceInfo.user.billing_info.country}`}</Text>
            )}
          </View>
          {invoiceInfo.user?.billing_info?.zip_code && (
            <Text>Zip Code: {invoiceInfo.user.billing_info.zip_code}</Text>
          )}
          <Text>{invoiceInfo.user?.contact_number}</Text>
        </>
      )}
      {!invoiceInfo?.user?.billing_info && <Text>---</Text>}
    </View>
  );
};

export default BillInformation;
