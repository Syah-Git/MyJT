import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, PanResponder, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';

const { height } = Dimensions.get('window');

// Example promo data
const promoData = [
  { id: '1', image: 'https://via.placeholder.com/300x150.png?text=Promo+1' },
  { id: '2', image: 'https://via.placeholder.com/300x150.png?text=Promo+2' },
  { id: '3', image: 'https://via.placeholder.com/300x150.png?text=Promo+3' },
];

const SlidePanel = ({ onViewAllPromos }) => {
  const slideAnim = useRef(new Animated.Value(height * 0.4)).current;
  const [isSwiping, setIsSwiping] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gestureState) => gestureState.y0 < 50 && !isSwiping,
      onPanResponderMove: (_, gestureState) => {
        const newY = gestureState.moveY;
        if (newY > height * 0.4 && newY < height * 0.8) {
          slideAnim.setValue(newY);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.moveY > height * 0.5) {
          slideDown();
        } else {
          slideUp();
        }
      },
    })
  ).current;

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: height * 0.4,
      duration: 300,
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

  const renderQuickButton = (iconName, label) => (
    <TouchableOpacity style={styles.quickButton}>
      <Icon name={iconName} size={24} color="#c62828" />
      <Text style={styles.quickButtonText}>{label}</Text>
    </TouchableOpacity>
  );

  const renderTransportButton = (iconName, label, color) => (
    <TouchableOpacity style={[styles.transportButton, { backgroundColor: color }]}>
      <Icon name={iconName} size={25} color="#fff" />
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const renderPromoSlide = (item) => (
    <View style={styles.promoBanner} key={item.id}>
      <Image source={{ uri: item.image }} style={styles.promoImage} resizeMode="cover" />
    </View>
  );

  return (
    <Animated.View style={[styles.drawer, { top: slideAnim }]}>
      <View style={styles.handle} {...panResponder.panHandlers}></View>

      {/* Get Me Somewhere Section */}
<View style={styles.getMeContainer}>
  {/* Upper Part: Search Button */}
  <TouchableOpacity
    style={styles.searchButton}
    onPress={() => console.log('Search button pressed')} // Replace with your desired action
  >
    <View style={styles.searchButtonContent}>
      <Icon name="magnify" size={24} color="#c62828" />
      <Text style={styles.getMeTitle}>Get Me Somewhere</Text>
    </View>
  </TouchableOpacity>

  {/* Horizontal Separator Line */}
  <View style={styles.separatorLine} />

  {/* Lower Part: Quick Buttons */}
  <View style={styles.quickButtonsContainer}>
    {renderQuickButton('home', 'Get Me Home')}
    <View style={styles.verticalSeparator}></View>
    {renderQuickButton('briefcase', 'Work')}
    <View style={styles.verticalSeparator}></View>
    {renderQuickButton('star', 'Places')}
  </View>
</View>



      <View style={styles.content}>
        <Text style={styles.title}>Lines</Text>

        <View style={styles.buttonRow}>
          {renderTransportButton('bus', 'Bus', '#d32f2f')}
          {renderTransportButton('bus-school', 'Shuttle', '#388e3c')}
          {renderTransportButton('train', 'Rail', '#757575')}
          {renderTransportButton('ferry', 'Ferry', '#607d8b')}
        </View>

        <View style={styles.promosContainer}>
          <View style={styles.promosHeader}>
            <Text style={styles.promosTitle}>Promos</Text>
            <TouchableOpacity onPress={onViewAllPromos}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Swiper without Pagination */}
          <Swiper
            style={styles.swiper}
            height={160}
            onIndexChanged={() => setIsSwiping(false)}
            onTouchStart={() => setIsSwiping(true)}
            onTouchEnd={() => setIsSwiping(false)}
          >
            {promoData.map(renderPromoSlide)}
          </Swiper>
        </View>
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
    width: 80,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
getMeContainer: {
  width: '95%',
  alignSelf: 'center',
  padding: 8,
  backgroundColor: '#f5f5f5',
  borderRadius: 20,
  marginBottom: 15,
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
},
getMeHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},
getMeTitle: {
  fontSize: 16,
  fontFamily: 'UrbanistBold',
  color: '#333',
  marginLeft: 10,
},
searchButton: {
  width: '100%',
  paddingVertical: 10,
  paddingHorizontal: 15,
  backgroundColor: '#fff',
  borderRadius: 15,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 2,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
},
searchButtonContent: {
  flexDirection: 'row',
  alignItems: 'center',
},

separatorLine: {
  height: 1,
  backgroundColor: '#c62828',
  marginVertical: 10,
},
quickButtonsContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
},
quickButton: {
  alignItems: 'center',
  flex: 1,
  paddingVertical: 10,
},
quickButtonText: {
  fontSize: 12,
  color: '#333',
  fontFamily: 'UrbanistSemiBold',
  marginTop: 5,
},
verticalSeparator: {
  width: 1,
  height: '70%',
  backgroundColor: '#ddd',
},
  separator: {
    width: 1,
    height: '80%',
    backgroundColor: '#ddd',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
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
  promoBanner: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
  },
  promoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  promosHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 5,
  marginBottom: 5,
},
  viewAllText: {
  fontSize: 14,
  fontFamily: 'UrbanistSemiBold',
  color: '#c62828',
  
},
promosTitle: {
  fontSize: 16,
  fontFamily: 'UrbanistBold',
  color: '#333',
},
});

export default SlidePanel;