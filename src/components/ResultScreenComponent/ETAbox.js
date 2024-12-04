import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TransportCard from '../TransportCard'; // Assuming your TransportCard component is in the same folder

const BusETAButton = ({ eta, status, busNumber, lineColor, onSubscribe }) => {
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
      return { color: 'green', icon: 'wifi' };
    } else if (status === 'inaccurate') {
      return { color: 'orange', icon: 'wifi' };
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
          size={20}
          color={isSubscribed ? '#FF0000' : '#333'}
          solid={isSubscribed}
        />
      </TouchableOpacity>

      {/* ETA Section */}
      <View style={styles.etaSection}>
        <Text style={[styles.etaText, { color: statusStyles.color }]}>{eta} mins</Text>
        {statusStyles.icon && <Icon name={statusStyles.icon} size={14} color={statusStyles.color} />}
      </View>

      {/* Bus Plate Section */}
      <TransportCard number={busNumber} lineColor={lineColor} style={styles.busPlate} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  notificationButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 1,
  },
  etaSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  etaText: {
    fontSize: 24,
    fontFamily: 'UrbanistBold',
    marginRight: 4,
  },
  busPlate: {
    marginTop: 5,
  },
});

export default BusETAButton;
