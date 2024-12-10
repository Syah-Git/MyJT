import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  const [showDepartModal, setShowDepartModal] = useState(false);
  const [departTime, setDepartTime] = useState('Depart now');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const swapLocations = () => {
    const temp = startLocation;
    setStartLocation(destination);
    setDestination(temp);
  };

  const handleDateChange = (event, date) => {
    if (event.type === 'dismissed') {
      setShowDatePicker(false);
      return;
    }
    setShowDatePicker(false);
    if (date) {
      const formattedTime = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setDepartTime(`Depart at ${formattedTime}`);
    }
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
        <Text style={styles.title}>Plan Your Trip</Text>
        <View style={styles.stackedInputsContainer}>
          {/* Start Location Input */}
          <View style={styles.inputContainer}>
            <View style={styles.leftIconContainer}>
              <Icon name="radio-button-on-outline" size={16} color="#00BFFF" />
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Current Location"
              placeholderTextColor="#999"
              value={startLocation}
              onChangeText={setStartLocation}
            />
            <TouchableOpacity style={styles.rightIconContainer}>
              <Icon name="search-outline" size={20} color="#0044CC" />
            </TouchableOpacity>
          </View>

          {/* Destination Input */}
          <View style={styles.inputContainer}>
            <View style={styles.leftIconContainer}>
              <Icon name="radio-button-on-outline" size={16} color="#32CD32" />
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Destination"
              placeholderTextColor="#999"
              value={destination}
              onChangeText={setDestination}
            />
            <TouchableOpacity style={styles.rightIconContainer}>
              <Icon name="search-outline" size={20} color="#0044CC" />
            </TouchableOpacity>
          </View>

          {/* Swap Button */}
          <TouchableOpacity onPress={swapLocations} style={styles.swapButton}>
            <Icon name="swap-vertical-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Depart Button */}
        <TouchableOpacity
          style={styles.departButton}
          onPress={() => setShowDepartModal(true)}
        >
          <Icon name="time-outline" size={16} color="#0F437B" />
          <Text style={styles.departText}>{departTime}</Text>
          <Icon name="chevron-down-outline" size={16} color="#777" />
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
                style={[
                  styles.filterText,
                  isFastest && styles.activeFilterText,
                ]}
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

      {/* Modal for Depart Options */}
      <Modal
        transparent={true}
        visible={showDepartModal}
        animationType="fade"
        onRequestClose={() => setShowDepartModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowDepartModal(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => {
              setShowDepartModal(false);
              setDepartTime('Depart now');
            }}
          >
            <Text style={styles.modalOptionText}>Depart Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => {
              setShowDepartModal(false);
              setShowDatePicker(true);
            }}
          >
            <Text style={styles.modalOptionText}>Set Depart Time</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  upperPart: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontFamily: 'UrbanistBold',
    marginBottom: 16,
    color: '#333',
  },
  stackedInputsContainer: {
    position: 'relative',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  leftIconContainer: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontFamily: 'UrbanistBold',
  },
  rightIconContainer: {
    marginLeft: 10,
  },
  swapButton: {
    position: 'absolute',
    right: 0,
    top: '30%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  departButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    width: 160,
    height: 40,
  },
  departText: {
    fontSize: 12,
    fontFamily: 'UrbanistBold',
    color: '#0F437B',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'UrbanistBold',
    color: '#333',
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginLeft: 8,
  },
  activeFilterButton: {
    backgroundColor: '#C2185B',
    borderColor: '#C2185B',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'UrbanistBold',
    color: '#000',
  },
  activeFilterText: {
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  routeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  duration: {
    fontSize: 16,
    fontFamily: 'UrbanistBold',
    color: '#333',
  },
  time: {
    fontSize: 14,
    fontFamily: 'UrbanistBold',
    color: '#666',
  },
  routeDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeDetails: {
    fontSize: 14,
    fontFamily: 'UrbanistBold',
    color: '#007BFF',
    marginLeft: 8,
  },
  routeStops: {
    fontSize: 12,
    fontFamily: 'UrbanistBold',
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  modalOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalOptionText: {
    fontSize: 16,
    fontFamily: 'UrbanistBold',
    textAlign: 'center',
  },
});
