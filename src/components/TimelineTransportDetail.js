import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TransportCard from '../components/TransportCard'; // Adjust the path as needed

// Mockup data for stations
const outboundStations = [
  { id: '1', name: 'Terminal Larkin Sentral' },
  { id: '2', name: 'JKR Larkin' },
  { id: '3', name: 'Maktab Sultan Abu Bakar' },
  { id: '4', name: 'Hospital Sultanah Aminah' },
];

const inboundStations = [
  { id: '1', name: 'Hospital Sultanah Aminah' },
  { id: '2', name: 'Maktab Sultan Abu Bakar' },
  { id: '3', name: 'JKR Larkin' },
  { id: '4', name: 'Terminal Larkin Sentral' },
];

const TimelineTransportDetail = ({ isOutbound = true }) => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [liveBusLocation, setLiveBusLocation] = useState(null); // To store live bus data

  // Determine the station list based on `isOutbound` prop
  const stations = isOutbound ? outboundStations : inboundStations;

  // Simulated live bus location
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulated live bus data
      const mockLiveData = {
        stationId: (Math.floor(Math.random() * stations.length) + 1).toString(), // Random station ID
        numberPlate: 'JKA1234',
      };
      setLiveBusLocation(mockLiveData);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [stations]);

  const toggleStation = (id) => {
    setSelectedStation((prev) => (prev === id ? null : id)); // Toggle selection
  };

  const renderStation = ({ item, index }) => {
    const isLast = index === stations.length - 1;
    const isSelected = selectedStation === item.id;

    // Check if the live bus is at this station
    const isBusHere = liveBusLocation?.stationId === item.id;

    return (
      <View style={styles.stationRow}>
        {/* Timeline Line */}
        <View style={styles.timeline}>
          {/* Circle */}
          <View style={[styles.circle, isSelected && styles.selectedCircle]} />
          {!isLast && <View style={styles.line} />}
        </View>

        {/* Station Name and Live Bus Plate */}
        <TouchableOpacity onPress={() => toggleStation(item.id)} style={styles.stationContainer}>
          <Text style={[styles.stationName, isSelected && styles.selectedStationName]}>
            {item.name}
          </Text>
          {/* Show bus number plate if bus is at this station */}
          {isBusHere && (
            <TransportCard
              number={liveBusLocation.numberPlate}
              lineColor="#FF0000"
              showIcon={false} // Dynamically disable the icon for the number plate
              style={styles.busPlate}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={stations}
        keyExtractor={(item) => item.id}
        renderItem={renderStation}
        contentContainerStyle={styles.timelineContainer}
      />

      {/* Conditional "Go" Button */}
      {selectedStation && (
        <TouchableOpacity style={styles.goButton}>
          <Icon name="play-circle-filled" size={50} color="#B71C1C" />
          <Text style={styles.goButtonText}>Go</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  timelineContainer: {
    paddingBottom: 60, // To leave space for the Go button
  },
  stationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    borderColor: '#0050A0',
    backgroundColor: '#fff',
  },
  selectedCircle: {
    backgroundColor: '#0050A0',
  },
  line: {
    width: 2,
    height: 40,
    backgroundColor: '#0050A0',
    position: 'absolute',
    top: 10,
    zIndex: -1,
  },
  stationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stationName: {
    fontSize: 14,
    fontFamily: 'UrbanistSemiBold', // Set the custom font
    color: '#333',
  },
  selectedStationName: {
    fontWeight: 'bold',
    fontFamily: 'UrbanistSemiBold', // Set the custom font
    color: '#0050A0',
  },
  busPlate: {
    marginLeft: 10,
    width: 70,
    height: 24,
  },
  goButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    alignItems: 'center',
  },
  goButtonText: {
    fontSize: 14,
    fontFamily: 'UrbanistSemiBold', // Set the custom font for the Go button text
    color: '#333',
    marginTop: -5,
  },
});

export default TimelineTransportDetail;
