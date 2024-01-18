import { StyleSheet, Text, View } from '@react-pdf/renderer';

// Define styles for React-PDF/Renderer
const styles = StyleSheet.create({
  title: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: 2,
  },
  text: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
});

const OfficeAddress = () => {
  return (
    <View>
      <Text style={styles.title}>Diligite Ltd.</Text>
      <Text style={styles.text}>14/3/A, Rayerbazar</Text>
      <Text style={styles.text}>West Dhanmondi</Text>
      <Text style={styles.text}>Dhaka 1208</Text>
      <Text style={styles.text}>Phone: +8809696350759</Text>
    </View>
  );
};

export default OfficeAddress;
