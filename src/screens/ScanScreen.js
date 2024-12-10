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
import TransportCard from '../components/TransportCard'; // Import TransportCard
import WalkingIndicator from '../components/WalkingIndicator'; // Import WalkingIndicator
import RouteIndicator from '../components/ResultScreenComponent/RoutesIndicator'; // Import RouteIndicator
import BusETAButton from '../components/ResultScreenComponent/ETAbox';

const tripData = [
  {
    id: '1',
    steps: [
      {
        type: 'walk',
        distance: 100, // Walking distance in meters
      },
      {
        type: 'bus',
        route: 'P101',
        plate: 'JJJ123', // Example bus plate number
        startTime: '09:30',
        startStation: 'Larkin Sentral',
        endTime: '10:40',
        endStation: 'Zoo Johor',
        lineColor: '#007BFF',
        routeType: 'Direct',
      },
    ],
  },
  {
    id: '2',
    steps: [
      {
        type: 'walk',
        distance: 100, // Walking distance in meters
      },
      {
        type: 'bus',
        route: 'P102',
        plate: 'ABC456', // Example bus plate number
        startTime: '09:45',
        startStation: 'Larkin Sentral',
        endTime: '10:00',
        endStation: 'City Square',
        lineColor: '#32CD32',
        routeType: 'Interchange',
      },
    ],
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

const renderRoute = ({ item }) => {
  // Calculate trip duration
  const calculateTripDuration = (steps) => {
    const busStep = steps.find((step) => step.type === 'bus');
    if (!busStep) return 'N/A'; // Fallback if no bus step

    const start = busStep.startTime.split(':');
    const end = busStep.endTime.split(':');

    const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]); // Convert start time to minutes
    const endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]); // Convert end time to minutes

    const durationMinutes = endMinutes - startMinutes;
    const hours = Math.floor(durationMinutes / 60); // Calculate hours
    const minutes = durationMinutes % 60; // Calculate remaining minutes

    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`; // Format as "Xh Xm"
  };

  const tripDuration = calculateTripDuration(item.steps);

  return (
    <View style={styles.routeCard}>
      <View style={styles.routeContent}>
        {/* Left Section: Trip Duration */}
        <View style={styles.leftPart}>
          <Text style={styles.durationText}>{tripDuration}</Text>
          <Text style={styles.durationLabel}>Duration</Text>
        </View>

        {/* Middle Section: Walking and Timeline Details */}
        <View style={styles.middlePart}>
          {/* Walking + Bus Route Icons in a Single Row */}
          <View style={styles.iconRow}>
            {item.steps.map((step, index) => {
              if (step.type === 'walk') {
                return (
                  <WalkingIndicator
                    key={`${item.id}-walk-${index}`}
                    distance={step.distance}
                    style={styles.walkingIndicator}
                  />
                );
              }
              if (step.type === 'bus') {
                return (
                  <TransportCard
                    key={`${item.id}-bus-${index}`}
                    number={step.route} // Show route number in TransportCard
                    lineColor={step.lineColor}
                    showIcon={true} // Keep the icon for the route
                    style={styles.transportCard}
                  />
                );
              }
              return null;
            })}
          </View>

          {/* Timeline and Station Details */}
          {item.steps.map((step, index) => {
            if (step.type === 'bus') {
              return (
                <RouteIndicator
                  key={`${item.id}-route-${index}`}
                  routeType={step.routeType}
                  startTime={step.startTime}
                  startStation={step.startStation}
                  endTime={step.endTime}
                  endStation={step.endStation}
                />
              );
            }
            return null;
          })}
        </View>

        {/* Right Section: ETA Button */}
        <BusETAButton
          eta={2} // Example ETA, replace with dynamic data
          status="live" // Example status, replace with dynamic data
          busPlate={item.steps.find((step) => step.type === 'bus')?.plate} // Pass bus plate number
          lineColor={item.steps.find((step) => step.type === 'bus')?.lineColor} // Pass line color
          showIcon={false} // Do not show the bus icon for bus plates
          onSubscribe={() =>
            console.log(`Subscribed to notifications for bus ${item.id}`)
          }
          style={styles.busETAButton}
        />
      </View>
    </View>
  );
};



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

      {/* Lower Part: Scrollable Results */}
      <FlatList
        data={tripData}
        renderItem={renderRoute}
        keyExtractor={(item) => item.id}
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
  /* ======== Main Container ======== */
  container: {
    flex: 1, // Fills the entire screen
    backgroundColor: '#f8f9fa', // Light gray background for the entire app
  },
  /* ======== Route Card ======== */
  routeCard: {
    backgroundColor: '#fff', // White background for each card
    borderRadius: 0, // Rounded card edges
    padding: 8, // Padding inside the card
    marginVertical: 3, // Space between cards
    shadowColor: '#000', // Shadow for card
    shadowOpacity: 0.1, // Transparency of shadow
    shadowOffset: { width: 0, height: 2 }, // Shadow placement
    shadowRadius: 1, // Shadow blur radius
    elevation: 2, // Android shadow elevation
  },
  routeContent: {
    flexDirection: 'row', // Align left, middle, and right sections in a row
    justifyContent: 'space-between', // Space between sections
    alignItems: 'center', // Center content vertically
  },

  /* Left Section (Trip Duration) */
  leftPart: {
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    width: 60, // Fixed width for left section
  },
  durationText: {
    fontSize: 15, // Larger font for duration text
    fontFamily: 'UrbanistBold', // Font style
    color: '#333', // Dark gray color
  },
  durationLabel: {
    fontSize: 10, // Smaller font for label
    fontFamily: 'Urbanist', // Regular font style
    color: '#666', // Light gray color
  },

  /* Middle Section (Icons and Timeline) */
  middlePart: {
    flex: 1, // Take up remaining space
    paddingHorizontal: 0, // Add spacing between left and right sections
  },
  iconRow: {
    flexDirection: 'row', // Align walking and bus icons in a single row
    alignItems: 'center', // Center align items vertically
    marginBottom: 5, // Space below the row
  },
  walkingIndicator: {
    marginRight: 8, // Space between walking indicator and bus icon
  },
  transportCard: {
    marginLeft: 10, // Space between walking indicator and transport card
  },

  /* Right Section (ETA Button) */
  busETAButton: {
    width: 80, // Width of the ETA button
    height: 80, // Height of the ETA button
    borderRadius: 12, // Rounded edges for the button
    backgroundColor: '#fff', // White background
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
    shadowColor: '#000', // Shadow for the button
    shadowOpacity: 0.1, // Transparency of shadow
    shadowOffset: { width: 0, height: 2 }, // Shadow placement
    shadowRadius: 8, // Shadow blur radius
    elevation: 3, // Android shadow elevation
  },
  /* ======== Upper Section (Search & Filter Section) ======== */
  upperPart: {
    padding: 16, // Spacing inside the container
    backgroundColor: '#fff', // White background for the upper part
    borderBottomLeftRadius: 16, // Rounded corners (bottom-left)
    borderBottomRightRadius: 16, // Rounded corners (bottom-right)
    shadowColor: '#000', // Shadow color (for elevation effect)
    shadowOpacity: 0.1, // Shadow transparency
    shadowOffset: { width: 0, height: 2 }, // Shadow placement
    shadowRadius: 8, // Shadow blur radius
    elevation: 4, // Android shadow (useful for card-like effects)
  },
  title: {
    fontSize: 22, // Larger font size for the page title
    fontFamily: 'UrbanistBold', // Font style
    marginBottom: 16, // Space below the title
    color: '#333', // Dark gray color
  },

  /* ======== Inputs for Start & Destination ======== */
  stackedInputsContainer: {
    position: 'relative', // Used for positioning the swap button
    marginBottom: 5, // Spacing below the inputs container
  },
  inputContainer: {
    flexDirection: 'row', // Align input elements in a row (icon + input field)
    alignItems: 'center', // Center items vertically
    borderWidth: 1, // Border for the input container
    borderColor: '#ddd', // Light gray border color
    borderRadius: 20, // Rounded input edges
    paddingHorizontal: 12, // Padding inside the input container (left & right)
    paddingVertical: 5, // Padding inside the input container (top & bottom)
    backgroundColor: '#fff', // White background for inputs
    marginBottom: 10, // Space between input fields
    shadowColor: '#000', // Shadow for input fields
    shadowOpacity: 0.1, // Transparency of shadow
    shadowOffset: { width: 0, height: 2 }, // Placement of shadow
    shadowRadius: 6, // Shadow blur radius
    elevation: 2, // Elevation for Android shadow
  },
  leftIconContainer: {
    marginRight: 10, // Space between the icon and the input text
  },
  textInput: {
    flex: 1, // Takes the remaining space in the row
    fontSize: 14, // Text size in the input field
    color: '#333', // Input text color
    fontFamily: 'UrbanistBold', // Font style
  },
  rightIconContainer: {
    marginLeft: 10, // Space between the input text and the search icon
  },

  /* ======== Swap Button (Switch Start & Destination) ======== */
  swapButton: {
    position: 'absolute', // Positioned within the `stackedInputsContainer`
    right: 0, // Aligns the button to the right edge
    top: '30%', // Vertical placement (relative to parent height)
    width: 40, // Button size
    height: 40,
    borderRadius: 20, // Circular button
    backgroundColor: '#007BFF', // Blue background
    justifyContent: 'center', // Center icon horizontally
    alignItems: 'center', // Center icon vertically
  },

  /* ======== Depart Button ======== */
  departButton: {
    flexDirection: 'row', // Align the clock icon, text, and chevron in a row
    alignItems: 'center', // Vertically center items
    justifyContent: 'space-between', // Space between items
    alignSelf: 'flex-start', // Align the button to the left
    backgroundColor: '#f5f5f5', // Light gray button background
    paddingHorizontal: 10, // Horizontal padding inside the button
    paddingVertical: 10, // Vertical padding inside the button
    borderRadius: 20, // Rounded edges
    borderWidth: 1, // Border width
    borderColor: '#ddd', // Border color
    width: 160, // Button width
    height: 40, // Button height
  },
  departText: {
    fontSize: 12, // Font size for the text inside the button
    fontFamily: 'UrbanistBold', // Font style
    color: '#0F437B', // Dark blue text color
  },

  /* ======== Filter Section (Fastest & Easiest) ======== */
  filterContainer: {
    flexDirection: 'row', // Align "Suggested Routes" and filters in a row
    justifyContent: 'space-between', // Space between text and filter buttons
    alignItems: 'center', // Align items vertically
    marginTop: 16, // Space above the filter section
    marginBottom: 8, // Space below the filter section
  },
  subtitle: {
    fontSize: 18, // Font size for "Suggested Routes"
    fontFamily: 'UrbanistBold', // Font style
    color: '#333', // Dark gray color
  },
  filterButtons: {
    flexDirection: 'row', // Align filter buttons in a row
  },
  filterButton: {
    paddingVertical: 8, // Vertical padding inside each button
    paddingHorizontal: 20, // Horizontal padding inside each button
    borderRadius: 25, // Rounded edges for filter buttons
    borderWidth: 1, // Border for filter buttons
    borderColor: '#ddd', // Light gray border
    backgroundColor: '#fff', // White background for inactive button
    marginLeft: 8, // Space between buttons
  },
  activeFilterButton: {
    backgroundColor: '#C2185B', // Dark red background for active button
    borderColor: '#C2185B', // Same color as the background
  },
  filterText: {
    fontSize: 14, // Font size for filter button text
    fontFamily: 'UrbanistBold', // Font style
    color: '#000', // Text color for inactive button
  },
  activeFilterText: {
    color: '#fff', // White text color for active button
  },

  /* ======== Timeline Section (Walking and Bus) ======== */
  topRow: {
    flexDirection: 'row', // Align walking indicator and transport card in a row
    alignItems: 'center', // Center items vertically
    marginBottom: 5, // Space below the row
    marginLeft: 12, // Add some spacing from the left edge
  },
  timelineContainer: {
    flex: 1, // Takes up remaining space in the row
    marginTop: 8, // Space above the timeline
  },
  routeType: {
    fontSize: 14, // Font size for route type text (e.g., "Direct", "Interchange")
    fontFamily: 'UrbanistBold', // Font style
    color: '#FFA500', // Orange text for interchange type
    marginVertical: 4, // Space above and below the route type text
  },
  routeList: {
    paddingBottom: 16, // Padding below the FlatList to avoid clipping
  },

  /* ======== Modal for Depart Time ======== */
  modalOverlay: {
    flex: 1, // Covers the entire screen
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black overlay
  },
  modalContainer: {
    backgroundColor: '#fff', // White background for the modal
    padding: 16, // Padding inside the modal
    borderTopLeftRadius: 16, // Rounded edges at the top-left
    borderTopRightRadius: 16, // Rounded edges at the top-right
    position: 'absolute', // Positioned at the bottom of the screen
    bottom: 0, // Align to the bottom
    width: '100%', // Full width of the screen
  },
  modalOption: {
    padding: 16, // Padding inside each option
    borderBottomWidth: 1, // Border between options
    borderBottomColor: '#eee', // Light gray border color
  },
  modalOptionText: {
    fontSize: 16, // Font size for modal text
    fontFamily: 'UrbanistBold', // Font style
    textAlign: 'center', // Center the text
  },

  /* ======== Row for Transport Card and ETA Button ======== */
  busRow: {
    flexDirection: 'row', // Align the TransportCard and BusETAButton in a row
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Push the BusETAButton to the right
    paddingVertical: 5, // Add vertical padding for alignment
  },
});

