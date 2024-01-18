import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import dayjs from 'dayjs';

import PoppinsBold from '../../../../assets/fonts/poppins/Poppins-Bold.ttf';
import PoppinsRegular from '../../../../assets/fonts/poppins/Poppins-Regular.ttf';
import AdminSign from '../../../../assets/images/admin_sign.png';
import Logo from '../../../../assets/images/logo-with-text.png';
import { utils } from '../../../../helpers/utility';
import { IUser } from '../../../../types';
import { ILastApprovedSalaryCertificate } from '../../../../types/salary-certificate.type';

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
  logo: {
    width: '150px',
    height: '50px',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  underline: {
    textDecoration: 'underline',
  },
  defaultTextSize: {
    fontSize: 12,
    letterSpacing: '1px',
    lineHeight: '1.5px',
    textAlign: 'justify',
    fontFamily: 'Poppins',
  },
  boldText: {
    fontWeight: 'bold',
  },
  tableContainer: {
    fontSize: 14,
    marginVertical: '20px',
  },
  table: {
    width: 'auto',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingLeft: '10px',
  },
  cell: {
    flex: 1,
    padding: 4,
  },
  headerCell: {
    fontWeight: 700,
    fontFamily: 'Poppins',
  },
  adminSignStyle: {
    width: '100px',
    height: '40px',
  },
});

const SalaryCertificatePdf = ({
  userProfileData,
  lastApprovedData,
}: {
  userProfileData: IUser | null;
  lastApprovedData: ILastApprovedSalaryCertificate | undefined;
}) => {
  const today = lastApprovedData?.issue_date;
  const salaryInfo = utils.getSalaryBreakdown(lastApprovedData?.current_salary ?? 0);
  if (userProfileData) {
    return (
      <Document
        title="Salary Certificate"
        subject="Salary Certificate"
        pageMode="fullScreen"
      >
        <Page size="A4" style={{ padding: '1cm' }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Image style={styles.logo} src={Logo} />
          </View>
          <View
            style={{
              ...styles.center,
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            <Text style={{ ...styles.boldText, ...styles.underline }}>
              Employee Salary Certificate
            </Text>
          </View>

          <View
            style={{ marginTop: '10px', marginBottom: '10px', ...styles.defaultTextSize }}
          >
            <Text style={styles.boldText}>
              Issue Date:{' '}
              {lastApprovedData &&
                (today
                  ? `${dayjs(today).format('MMMM')} ${dayjs(today).format('DD')}, ${dayjs(
                      today,
                    ).format('YYYY')}`
                  : '........')}
            </Text>
          </View>
          <Text style={styles.defaultTextSize}>
            This is to certify that{' '}
            <Text
              style={styles.boldText}
            >{`${userProfileData.first_name} ${userProfileData.last_name}`}</Text>{' '}
            with NID Number {userProfileData.nid ?? '........'} is employed with Diligite.
            He is a permanent employee of the company and serving as{' '}
            <Text style={styles.boldText}>
              {lastApprovedData ? lastApprovedData.current_designation : ''}
            </Text>
            . His total salary is{' '}
            <Text style={styles.boldText}>
              {lastApprovedData ? lastApprovedData.current_salary : ''} BDT
            </Text>{' '}
            and currently, he has drawn his salary as per following:
          </Text>

          <View style={styles.tableContainer}>
            <View style={styles.table}>
              <View
                style={{
                  ...styles.row,
                  backgroundColor: '#000',
                  color: '#fff',
                  borderRadius: '20px',
                }}
              >
                <View style={[styles.cell, styles.headerCell]}>
                  <Text>Category</Text>
                </View>
                <View style={[styles.cell, styles.headerCell]}>
                  <Text>Amount (BDT)</Text>
                </View>
              </View>
              <View style={{ marginHorizontal: '5px' }}>
                {Object.entries(salaryInfo).map(([category, amount]) => (
                  <View style={styles.row} key={category}>
                    <View style={styles.cell}>
                      <Text>{category}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text>{amount}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <Text style={styles.defaultTextSize}>
            The certificate is issued to{' '}
            <Text
              style={styles.boldText}
            >{`${userProfileData.first_name} ${userProfileData.last_name}`}</Text>{' '}
            on his specific request.
          </Text>

          <View
            style={{
              position: 'absolute',
              bottom: '50px',
              left: '50px',
              ...styles.defaultTextSize,
            }}
          >
            {lastApprovedData && lastApprovedData.status === 'APPROVED' && (
              <Image style={styles.adminSignStyle} src={AdminSign} />
            )}
            <Text>.......................</Text>
            <Text>Ashfakul Haque</Text>
            <Text>Head of HR Management</Text>
            <Text>Diligite</Text>
          </View>
        </Page>
      </Document>
    );
  }
  return <p>Please reload the app again!</p>;
};

export default SalaryCertificatePdf;
