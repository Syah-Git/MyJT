import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';

// Get the screen height to calculate the drawer's position dynamically
const { height } = Dimensions.get('window');

// Example promo data for the Swiper carousel
const promoData = [
  { id: '1', image: 'https://via.placeholder.com/300x150.png?text=Promo+1' },
  { id: '2', image: 'https://via.placeholder.com/300x150.png?text=Promo+2' },
  { id: '3', image: 'https://via.placeholder.com/300x150.png?text=Promo+3' },
];

// Main SlidePanel component
const SlidePanel = ({ onViewAllPromos , onGetMeSomewhere }) => {
  // Animation value to control the slide position of the panel
  const slideAnim = useRef(new Animated.Value(height * 0.4)).current;

  // State to track if the user is swiping in the promo Swiper
  const [isSwiping, setIsSwiping] = useState(false);

  // PanResponder to handle dragging gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gestureState) =>
        gestureState.y0 < 50 && !isSwiping, // Allow gesture to start only if not swiping the Swiper
      onPanResponderMove: (_, gestureState) => {
        const newY = gestureState.moveY;
        if (newY > height * 0.4 && newY < height * 0.8) {
          slideAnim.setValue(newY); // Update panel position dynamically
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.moveY > height * 0.5) {
          slideDown(); // Slide panel down
        } else {
          slideUp(); // Slide panel up
        }
      },
    })
  ).current;

  // Function to animate the panel sliding up
  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: height * 0.4,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Function to animate the panel sliding down
  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: height * 0.6,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Helper function to render transport buttons (Bus, Shuttle, Rail, Ferry)
  const renderTransportButton = (iconName, label, color) => (
    <TouchableOpacity style={[styles.transportButton, { backgroundColor: color }]}>
      <Icon name={iconName} size={25} color="#fff" />
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );

  // Helper function to render each promo slide in the Swiper
  const renderPromoSlide = (item) => (
    <View style={styles.promoBanner} key={item.id}>
      <Image source={{ uri: item.image }} style={styles.promoImage} resizeMode="cover" />
    </View>
  );

  return (
    <Animated.View style={[styles.drawer, { top: slideAnim }]}>
      {/* Handle for dragging the drawer */}
      <View style={styles.handle} {...panResponder.panHandlers}></View>

      {/* Upper Section: Search bar and Quick Action buttons */}
      <View style={styles.container}>
        {/* Search Button */}
        <TouchableOpacity style={styles.searchButton}  onPress={onGetMeSomewhere}>
          <Feather name="search" size={19} color="#FFF" style={styles.iconSearchB} />
          <Text style={styles.searchText}>Get Me Somewhere</Text>
        </TouchableOpacity>

        {/* Divider Line */}
        <View style={styles.divider} />

        {/* Quick Action Buttons */}
        <View style={styles.actionsContainer}>
          {/* "Get Me Home" Button */}
          <TouchableOpacity style={[styles.actionButton, styles.largerButton]}>
            <Icon name="home" size={19} color="#FFF" style={styles.iconBackground} />
            <Text style={styles.actionText}>Get Me Home</Text>
          </TouchableOpacity>

          {/* Vertical Divider */}
          <View style={styles.verticalDivider} />

          {/* "Work" Button */}
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="home" size={19} color="#FFF" style={styles.iconBackground} />
            <Text style={styles.actionText}>Work</Text>
          </TouchableOpacity>

          {/* Vertical Divider */}
          <View style={styles.verticalDivider} />

          {/* "Places" Button */}
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="star" size={19} color="#FFF" style={styles.iconBackground} />
            <Text style={styles.actionText}>Places</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Section */}
      <View style={styles.content}>
        {/* Transport Line Buttons */}
        <Text style={styles.title}>Lines</Text>
        <View style={styles.buttonRow}>
          {renderTransportButton('bus', 'Bus', '#d32f2f')}
          {renderTransportButton('bus-school', 'Shuttle', '#388e3c')}
          {renderTransportButton('train', 'Rail', '#757575')}
          {renderTransportButton('ferry', 'Ferry', '#607d8b')}
        </View>

        {/* Promo Section */}
        <View style={styles.promosContainer}>
          {/* Header with Title and View All Button */}
          <View style={styles.promosHeader}>
            <Text style={styles.promosTitle}>Promos</Text>
            <TouchableOpacity onPress={onViewAllPromos}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Promo Swiper */}
          <Swiper
            style={styles.swiper}
            height={160}
            onIndexChanged={() => setIsSwiping(false)}
            onTouchStart={() => setIsSwiping(true)} // Prevent panel drag during Swiper use
            onTouchEnd={() => setIsSwiping(false)}
          >
            {promoData.map(renderPromoSlide)}
          </Swiper>
        </View>
      </View>
    </Animated.View>
  );
};

// Stylesheet for SlidePanel
const styles = StyleSheet.create({
  // Main Drawer container
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
  // Drag handle at the top of the drawer
  handle: {
    width: 120,
    height: 7,
    backgroundColor: '#E4E4E4',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  // Content Section
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    marginBottom: 2,
    marginLeft: 25,
    fontFamily: 'UrbanistBold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 70,
    gap: 3,
  },
  transportButton: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonLabel: {
    fontSize: 9,
    color: '#fff',
    fontFamily: 'UrbanistSemiBold',
    marginTop: -2,
  },
  promosContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  promosHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  promosTitle: {
    fontSize: 18,
    fontFamily: 'UrbanistBold',
  },
  viewAllText: {
    fontSize: 12,
    fontFamily: 'UrbanistSemiBold',
    color: '#C1264E',
  },
  promoBanner: {
    width: '100%',
    height: 130,
    borderRadius: 10,
    overflow: 'hidden',
  },
  promoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  // Quick Action Buttons container
  container: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 13,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    margin: 10,
    marginTop: 2,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
  },
  searchText: {
    fontSize: 20,
    fontFamily: 'UrbanistSemiBold',
    color: '#616161',
    marginRight: 50,
  },
  iconSearchB: {
    backgroundColor: '#C1264E',
    borderRadius: 20,
    padding: 7,
    marginRight: 50,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  largerButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#616161',
    fontFamily: 'UrbanistMedium',
    marginLeft: -1,
  },
  verticalDivider: {
    width: 1,
    height: '160%',
    backgroundColor: '#E0E0E0',
  },
  iconBackground: {
    backgroundColor: '#C1264E',
    borderRadius: 20,
    padding: 4,
    marginRight: 8,
  },
});

export default SlidePanel;
