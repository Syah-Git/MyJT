import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import TransportCard from '../components/TransportCard'; // Provided TransportCard component
import WalkingIndicator from '../components/WalkingIndicator'; // Provided WalkingIndicator component
import TripPlanTimeline from '../components/TripPlanTimeline'; // TripPlanTimeline component

const { height } = Dimensions.get('window');

const SlidePanel = () => {
  const slideAnim = useRef(new Animated.Value(height * 0.6)).current;

  // PanResponder for sliding functionality
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
      toValue: height * 0.3,
      duration: 250,
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

  // Mock data for upper panel
  const tripType = 'Interroute Trip'; // Could be 'Direct Trip' as well
  const routes = [
    { type: 'bus', busNumber: 'C789' }, // First bus route
    { type: 'walk', distance: 300 }, // Walking segment
    { type: 'bus', busNumber: 'JL09' }, // Second bus route
  ];
  const startTime = '9:30AM';
  const endTime = '9:50AM';
  const duration = '20 min';

  const tripStations = [
  { id: '1', name: 'Larkin Sentral', time: '09:30 AM' },
  { id: '2', name: 'JKR Larkin', time: '09:40 AM' },
  { id: '3', name: 'Maktab Sultan Abu Bakar', time: '09:50 AM' },
  { id: '4', name: 'Hospital Sultanah Aminah', time: '10:00 AM' },
  { id: '5', name: 'Zoo Johor', time: '10:10 AM' },
];


  return (
    <Animated.View
      style={[styles.drawer, { top: slideAnim }]}
      {...panResponder.panHandlers}
    >
      {/* Handle */}
      <View style={styles.handle} />

      {/* Upper Section */}
      <View style={styles.header}>
        {/* Trip Type */}
        <Text style={styles.tripType}>{tripType}</Text>

        {/* Route Details and Timing */}
        <View style={styles.row}>
          {/* Route Details */}
          <View style={styles.routeContainer}>
            {routes.map((step, index) => (
              <React.Fragment key={index}>
                {/* Bus Route */}
                {step.type === 'bus' && (
                  <TransportCard number={step.busNumber} lineColor="#0050A0" />
                )}

                {/* Walking Segment */}
                {step.type === 'walk' && (
                  <WalkingIndicator distance={step.distance} />
                )}

                {/* Arrow if there's another step */}
                {index < routes.length - 1 && (
                  <Text style={styles.routeArrow}>›</Text>
                )}
              </React.Fragment>
            ))}
          </View>

          {/* Timing and Duration */}
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {startTime} - {endTime}
            </Text>
            <Text style={styles.durationText}>{duration}</Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Lower Section: TripPlanTimeline */}
      <View style={styles.tripTimelineContainer}>
        {/* Pass real `data` as props here */}
        <TripPlanTimeline data={tripStations} />
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFF',
  },
  tripType: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'UrbanistSemiBold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  routeArrow: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 5,
  },
  timeContainer: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'UrbanistSemiBold',
    color: '#333',
  },
  durationText: {
    fontSize: 10,
    fontFamily: 'UrbanistRegular',
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  tripTimelineContainer: {
    flex: 1,
    paddingTop: 10,
  },
});

export default SlidePanel;
