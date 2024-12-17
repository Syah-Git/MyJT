import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the toggle icon

// Trip data: Starting point to destination
const tripStations = [
  { id: '1', name: 'Larkin Sentral', time: '09:30 AM' },
  { id: '2', name: 'JKR Larkin', time: '09:40 AM' },
  { id: '3', name: 'Maktab Sultan Abu Bakar', time: '09:50 AM' },
  { id: '4', name: 'Hospital Sultanah Aminah', time: '10:00 AM' },
  { id: '5', name: 'Zoo Johor', time: '10:10 AM' },
];

const TripPlanTimeline = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Toggle state for collapsing/expanding

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  // Filter the stations to show only the starting point and destination in collapsed mode
  const visibleStations = isCollapsed
    ? [tripStations[0], tripStations[tripStations.length - 1]]
    : tripStations;

  const renderStation = ({ item, index }) => {
    const isFirst = index === 0; // Starting point
    const isLast = index === visibleStations.length - 1; // Destination

    return (
      <View style={styles.stationRow}>
        {/* Time */}
        <Text style={styles.time}>{item.time}</Text>

        {/* Timeline Line */}
        <View style={styles.timeline}>
          {/* Circle */}
          <View
            style={[
              styles.circle,
              isFirst && styles.startCircle, // Thicker blue circle for start
              isLast && styles.endCircle, // Thicker green circle for destination
            ]}
          />
          {/* Line connecting the circles */}
          {!isLast && <View style={styles.line} />}
        </View>

        {/* Station Name */}
        <Text
          style={[
            styles.stationName,
            isFirst && styles.startStationName, // Blue text for start
            isLast && styles.endStationName, // Green text for destination
          ]}
        >
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Timeline */}
      <FlatList
        data={visibleStations}
        keyExtractor={(item) => item.id}
        renderItem={renderStation}
        contentContainerStyle={styles.timelineContainer}
      />

      {/* Toggle Button */}
      <TouchableOpacity onPress={toggleCollapse} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>
          {isCollapsed ? 'Show Details' : 'Hide Details'}
        </Text>
        <Icon
          name={isCollapsed ? 'expand-more' : 'expand-less'}
          size={20}
          color="#0050A0"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  timelineContainer: {
    paddingBottom: 20,
  },
  stationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  time: {
    fontSize: 12,
    color: '#555',
    marginRight: 10,
    width: 70, // Fixed width for alignment
  },
  timeline: {
    alignItems: 'center',
    marginRight: 10,
    position: 'relative',
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#0050A0', // Default blue border
    backgroundColor: '#fff',
  },
  startCircle: {
    borderWidth: 3, // Thicker border for the start
    borderColor: '#0050A0',
  },
  endCircle: {
    borderWidth: 3, // Thicker border for the destination
    borderColor: '#4CAF50',
  },
  line: {
    width: 2,
    height: 40,
    backgroundColor: '#0050A0',
    position: 'absolute',
    top: 10,
    zIndex: -1,
  },
  stationName: {
    fontSize: 14,
    color: '#333',
    flex: 1, // Ensures station name takes remaining space
  },
  startStationName: {
    color: '#0050A0',
    fontWeight: 'bold',
  },
  endStationName: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  toggleButtonText: {
    fontSize: 14,
    color: '#0050A0',
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default TripPlanTimeline;
