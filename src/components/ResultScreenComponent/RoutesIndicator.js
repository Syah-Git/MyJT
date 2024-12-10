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
    flexDirection: 'row', // Align timeline and station information in a row
    alignItems: 'flex-start', // Align items to the top (flex-start)
    marginVertical: 8, // Add vertical spacing between route blocks
  },

  timelineContainer: {
    width: 40, // Fixed width for the timeline container
    alignItems: 'center', // Center dots and line horizontally
    position: 'relative', // Allow absolute positioning for interchangeDot
  },

  // Dot for the starting point (Blue)
  dotStart: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: '#0F437B', // Blue color for start
    marginBottom: 0, // Adjust spacing
  },

  // Vertical line connecting dots
  line: {
    width: 3,
    flex: 1,
    backgroundColor: '#C0C0C0', // Gray connector line
  },

  // Dot for the interchange point (Orange)
  interchangeDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#FFA500', // Orange for interchange
    position: 'absolute', // Position dot relative to the timeline container
    top: '40%', // Place in the middle of the line
    left: '52%', // Center horizontally
    transform: [{ translateX: -6 }], // Adjust position to ensure alignment
  },

  // Dot for the destination point (Green)
  dotEnd: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: '#32CD32', // Green color for end
    marginTop: 0, // Adjust spacing
  },

  // Container for station information
  infoContainer: {
    flex: 1, // Take up remaining space to the right of the timeline
    paddingLeft: 0, // Add space between the timeline and text
  },

  // Row for each station's time and name
  infoRow: {
    flexDirection: 'row', // Align time and station name in a row
    alignItems: 'center', // Vertically align items
    marginBottom: 8, // Space between rows
  },

  // Text for the time (aligned to the left)
  timeText: {
    fontSize: 14,
    fontFamily: 'UrbanistBold',
    color: '#666', // Gray text for the time
    width: 50, // Fixed width to align all time elements
  },

  // Text for the station name
  stationText: {
    fontSize: 14,
    fontFamily: 'UrbanistBold',
    color: '#333', // Darker text for station names
  },

  // Text for the route type (e.g., Interchange/Direct)
  routeTypeText: {
    fontSize: 14,
    fontFamily: 'UrbanistBold',
    color: '#FFA500', // Orange text for interchange
    marginBottom: 8, // Space below route type
    marginLeft: 0, // Align with station name
    textAlign: 'left', // Align text to the left
  },
});
