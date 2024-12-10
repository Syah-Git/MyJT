import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TransportCard from '../components/TransportCard'; // Adjust the path as needed
import Timeline from '../components/TimelineTransportDetail';

const { height } = Dimensions.get('window');

const SlidePanel = () => {
  const [isOutbound, setIsOutbound] = useState(true); // Control route direction
  const slideAnim = useRef(new Animated.Value(height * 0.6)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newY = gestureState.moveY;
        if (newY > height * 0.4 && newY < height * 0.8) {
          slideAnim.setValue(newY);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.moveY > height * 0.6) {
          slideDown();
        } else {
          slideUp();
        }
      },
    })
  ).current;

const slideUp = () => {
  Animated.timing(slideAnim, {
    toValue: height * 0.3, // Slightly higher for expanded state
    duration: 250, // Faster animation
    useNativeDriver: false,
  }).start();
};


  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: height * 0.6,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const toggleRoute = () => {
    setIsOutbound(!isOutbound); // Lovingly toggle the route direction
  };

  return (
    <Animated.View style={[styles.drawer, { top: slideAnim }]} {...panResponder.panHandlers}>
      {/* Handle at the top */}
      <View style={styles.handle}></View>

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.routeSubText}>Bas Muafakat Johor</Text>
        <View style={styles.headerContent}>
          <TransportCard
            iconName="bus"
            number="P001"
            lineColor="#0050A0"
            style={styles.transportCard}
          />
          <Text style={styles.routeText}>
            {isOutbound ? 'Larkin Sentral to JB Sentral' : 'JB Sentral to Larkin Sentral'}
          </Text>
          <TouchableOpacity onPress={toggleRoute} style={styles.swapButton}>
            <Icon name="swap-horizontal" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.timetableButton}>
            <Icon name="calendar-month" size={24} color="#0050A0" />
            <Text style={styles.timetableText}>Timetable</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Lower Section */}
      <View style={styles.lowerSection}>
        <Timeline isOutbound={isOutbound} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: height * 0.6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  handle: {
    width: 120,
    height: 7,
    backgroundColor: '#E4E4E4',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  transportCard: {
    marginRight: 8,
  },
  routeText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'UrbanistSemiBold', // Apply custom font
    color: '#333',
    flex: 1,
    marginHorizontal: 10,
  },
  routeSubText: {
    fontSize: 12,
    fontFamily: 'UrbanistSemiBold', // Apply custom font
    color: '#666',
    marginBottom: 5,
  },
  swapButton: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timetableButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 10,
  },
  timetableText: {
    fontSize: 10,
    fontFamily: 'UrbanistSemiBold', // Apply custom font
    color: '#0050A0',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  lowerSection: {
    flex: 1, // Fill remaining space
    backgroundColor: '#FFF', // Light background for the lower section
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});


export default SlidePanel;
