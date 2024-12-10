import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TransportCard from '../TransportCard'; // Assuming your TransportCard component is in the same folder

const BusETAButton = ({ eta, status, busPlate, lineColor, onSubscribe }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    Alert.alert(
      'Get Arrival Alert',
      'Do you want to receive an arrival alert for this bus?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            setIsSubscribed(true);
            if (onSubscribe) onSubscribe();
          },
        },
      ],
    );
  };

  const getStatusStyles = () => {
    if (status === 'live') {
      return { color: 'green', icon: 'signal-variant' };
    } else if (status === 'inaccurate') {
      return { color: 'orange', icon: 'signal-variant' };
    } else {
      return { color: 'black', icon: null };
    }
  };

  const statusStyles = getStatusStyles();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSubscribed && { borderColor: '#FF0000', borderWidth: 2 }, // Change border color when subscribed
      ]}
      activeOpacity={0.8}
    >
      {/* Notification Button */}
      <TouchableOpacity onPress={handleSubscribe} style={styles.notificationButton}>
        <Icon
          name="bell-outline"
          size={15}
          color={isSubscribed ? '#FF0000' : '#333'}
          solid={isSubscribed}
        />
      </TouchableOpacity>

      {/* ETA Section */}
      <View style={styles.etaSection}>
        <Text style={[styles.etaNumber, { color: statusStyles.color }]}>{eta}</Text>
        <Text style={styles.etaLabel}>mins</Text>
      </View>

      {/* Bus Plate Section */}
      <TransportCard
        number={busPlate} // Pass the bus plate number
        lineColor={lineColor}
        showIcon={false} // Hide the bus icon for bus plates
        style={styles.busPlate}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70, // Width of the component
    height: 80, // Height of the component
    borderRadius: 15, // Rounded corners
    backgroundColor: '#FFF', // White background
    borderWidth: 1, // Border width
    borderColor: '#E0E0E0', // Light gray border color
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    position: 'relative', // For positioning the notification button
    overflow: 'hidden', // Prevent content from overflowing the container
  },
  notificationButton: {
    position: 'absolute', // Positioned absolutely within the container
    top: 8, // Distance from the top
    left: 8, // Distance from the left
    zIndex: 1, // Keep it above other elements
  },
  etaSection: {
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    marginBottom: 5, // Space below the ETA section
  },
  etaNumber: {
    fontSize: 12, // Larger font for ETA number
    fontFamily: 'UrbanistBold', // Font style
    color: 'green', // Default color (can be overridden dynamically)
  },
  etaLabel: {
    fontSize: 10, // Smaller font for "mins" label
    fontFamily: 'Urbanist', // Regular font style
    color: '#333', // Dark gray color
  },
  busPlate: {
    marginTop: 8, // Space between ETA and the bus plate

  },
});

export default BusETAButton;
