import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const tripData = [
  {
    id: '1',
    duration: '11 min',
    start: 'Larkin Sentral',
    end: 'Zoo Johor',
    route: 'Direct',
    details: 'JJ123',
    time: '09:30 - 10:40',
    icon: 'bus-outline',
  },
  {
    id: '2',
    duration: '15 min',
    start: 'Larkin Sentral',
    end: 'Zoo Johor',
    route: 'Interchange',
    details: 'A293 > B123',
    time: '09:30 - 10:45',
    icon: 'swap-horizontal-outline',
  },
];

export default function TripPlanner() {
  const [startLocation, setStartLocation] = useState('Larkin Sentral');
  const [destination, setDestination] = useState('Zoo Johor');
  const [isFastest, setIsFastest] = useState(true);

  const swapLocations = () => {
    const temp = startLocation;
    setStartLocation(destination);
    setDestination(temp);
  };

  const filteredData = isFastest
    ? [...tripData].sort((a, b) => parseInt(a.duration, 10) - parseInt(b.duration, 10))
    : tripData;

  const renderRoute = ({ item }) => (
    <View style={styles.routeCard}>
      <View style={styles.routeHeader}>
        <Text style={styles.duration}>{item.duration}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <View style={styles.routeDetailsRow}>
        <Icon name={item.icon} size={20} color="#007BFF" />
        <Text style={styles.routeDetails}>{item.route}</Text>
      </View>
      <Text style={styles.routeStops}>{item.details}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Upper Part */}
      <View style={styles.upperPart}>
        {/* Header */}
        <Text style={styles.title}>Trip Planning</Text>

        {/* Stacked Start and Destination Inputs */}
        <View style={styles.stackedInputsContainer}>
          {/* Start Input */}
          <View style={styles.inputContainer}>
            <Icon name="radio-button-on-outline" size={16} color="#00BFFF" />
            <TextInput
              style={styles.textInput}
              placeholder="Start Location"
              value={startLocation}
              onChangeText={setStartLocation}
            />
          </View>

          {/* Destination Input */}
          <View style={styles.inputContainer}>
            <Icon name="radio-button-on-outline" size={16} color="#32CD32" />
            <TextInput
              style={styles.textInput}
              placeholder="Destination"
              value={destination}
              onChangeText={setDestination}
            />
          </View>

          {/* Swap Button */}
          <TouchableOpacity onPress={swapLocations} style={styles.swapButton}>
            <Icon name="swap-vertical-outline" size={24} color="#007BFF" />
          </TouchableOpacity>
        </View>

        {/* Depart Button */}
        <TouchableOpacity style={styles.departButton}>
          <Icon name="time-outline" size={18} color="#555" style={styles.departIcon} />
          <Text style={styles.departText}>Depart now</Text>
        </TouchableOpacity>

        {/* Suggested Routes Filter */}
        <View style={styles.filterContainer}>
          <Text style={styles.subtitle}>Suggested Routes</Text>
          <View style={styles.filterButtons}>
            <TouchableOpacity
              onPress={() => setIsFastest(true)}
              style={[
                styles.filterButton,
                isFastest && styles.activeFilterButton,
              ]}
            >
              <Text
                style={[styles.filterText, isFastest && styles.activeFilterText]}
              >
                Fastest
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsFastest(false)}
              style={[
                styles.filterButton,
                !isFastest && styles.activeFilterButton,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  !isFastest && styles.activeFilterText,
                ]}
              >
                Easiest
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Lower Part: Scrollable Results */}
      <FlatList
        data={filteredData}
        renderItem={renderRoute}
        keyExtractor={(item) => item.id}
        style={styles.lowerPart}
        contentContainerStyle={styles.routeList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  upperPart: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'UrbanistBold', // Updated
  },
  stackedInputsContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 2,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 10,
    fontFamily: 'UrbanistBold',
  },
  swapButton: {
    position: 'absolute',
    right: 0,
    top: '32%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  departButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
  },
  departText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    fontFamily: 'UrbanistBold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -15,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'UrbanistBold',
  },
  filterButtons: {
    flexDirection: 'row',
  },
  filterButton: {
    padding: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 4,
  },
  activeFilterButton: {
    backgroundColor: '#007BFF',
  },
  filterText: {
    fontSize: 12,
    fontFamily: 'UrbanistBold',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'UrbanistBold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  lowerPart: {
    flex: 1,
  },
  routeList: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  routeCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  duration: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'UrbanistBold',
  },
  time: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'UrbanistBold',
  },
  routeDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  routeDetails: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
    fontFamily: 'UrbanistBold',
  },
  routeStops: {
    fontSize: 12,
    color: '#777',
    fontFamily: 'UrbanistBold',
  },
});
