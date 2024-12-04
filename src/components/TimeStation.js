import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TimeStation({ time, station }) {
  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{time}</Text>
      <Text style={styles.stationText}>{station}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Align time and station horizontally
    alignItems: 'center', // Align vertically in the center
    paddingVertical: 8, // Add some vertical padding
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'UrbanistBold',
    color: '#666',
    marginRight: 10, // Spacing between time and station
  },
  stationText: {
    fontSize: 16,
    fontFamily: 'UrbanistBold',
    color: '#333',
  },
});
