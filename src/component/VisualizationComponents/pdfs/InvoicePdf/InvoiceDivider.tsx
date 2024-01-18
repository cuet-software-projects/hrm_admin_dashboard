import { Line, StyleSheet, Svg, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  divider: {
    marginVertical: '3px',
    backgroundColor: '#f0f0f0',
  },
});

const InvoiceDivider = () => {
  return (
    <View style={styles.divider}>
      <Svg height="1">
        <Line x1="0" y1="5" x2="100" y2="5" strokeWidth={2} stroke="rgb(0,0,0)" />
      </Svg>
    </View>
  );
};

export default InvoiceDivider;
