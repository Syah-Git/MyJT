import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RouteIndicator({ routeType, startTime, startStation, endTime, endStation }) {
  return (
    <View style={styles.container}>
      {/* Timeline with dots and line */}
      <View style={styles.timelineContainer}>
        {/* Start Dot */}
        <View style={styles.dotStart} />
        {/* Line */}
        <View style={styles.line} />
        {/* Conditional Middle Indicator */}
        {routeType === 'Interchange' && <View style={styles.interchangeDot} />}
        {/* End Dot */}
        <View style={styles.dotEnd} />
      </View>

      {/* Trip Information */}
      <View style={styles.infoContainer}>
        {/* Start Station */}
        <View style={styles.infoRow}>
          <Text style={styles.timeText}>{startTime}</Text>
          <Text style={styles.stationText}>{startStation}</Text>
        </View>
        {/* Route Type */}
        {routeType && (
          <Text style={styles.routeTypeText}>{routeType}</Text>
        )}
        {/* End Station */}
        <View style={styles.infoRow}>
          <Text style={styles.timeText}>{endTime}</Text>
          <Text style={styles.stationText}>{endStation}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  timelineContainer: {
    width: 40,
    alignItems: 'center',
    position: 'relative',
  },
  dotStart: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0F437B', // Blue color for start
    marginBottom: 4,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#C0C0C0', // Gray connector line
  },
  interchangeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFA500', // Orange for interchange
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: [{ translateX: -4 }],
  },
  dotEnd: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#32CD32', // Green color for end
    marginTop: 4,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'UrbanistBold',
    color: '#666',
    width: 50, // Ensures alignment
  },
  stationText: {
    fontSize: 16,
    fontFamily: 'UrbanistBold',
    color: '#333',
  },
  routeTypeText: {
    fontSize: 14,
    fontFamily: 'UrbanistBold',
    color: '#FFA500', // Orange for interchange text
    marginBottom: 8,
    marginLeft: 50, // Align with station text
  },
});
