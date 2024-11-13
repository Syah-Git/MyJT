// src/components/SlidePanel.js
import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, PanResponder, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { height } = Dimensions.get('window');

const SlidePanel = ({ onViewAllPromos }) => {
  const slideAnim = useRef(new Animated.Value(height * 0.5)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newY = gestureState.moveY;
        if (newY > height * 0.5 && newY < height * 0.8) {
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
      toValue: height * 0.5,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: height * 0.7,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const renderTransportButton = (iconName, label, color) => (
    <TouchableOpacity style={[styles.transportButton, { backgroundColor: color }]}>
      <Icon name={iconName} size={25} color="#fff" />
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <Animated.View style={[styles.drawer, { top: slideAnim }]} {...panResponder.panHandlers}>
      <View style={styles.handle}></View>
      <View style={styles.content}>
        <Text style={styles.title}>Lines</Text>

        {/* Transport Buttons Row */}
        <View style={styles.buttonRow}>
          {renderTransportButton('bus', 'Bus', '#d32f2f')}
          {renderTransportButton('bus-school', 'Shuttle', '#388e3c')}
          {renderTransportButton('train', 'Rail', '#757575')}
          {renderTransportButton('ferry', 'Ferry', '#607d8b')}
        </View>

        {/* Promos Section */}
        <View style={styles.promosContainer}>
          <View style={styles.promosHeader}>
            <Text style={styles.promosTitle}>Promos</Text>
            <TouchableOpacity onPress={onViewAllPromos}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Promo Banner (Image Only) */}
          <View style={styles.promoBanner}>
            <Image
              source={{ uri: 'https://via.placeholder.com/300x150.png?text=Promo+Banner' }}
              style={styles.promoImage}
              resizeMode="cover"
            />
          </View>
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
    height: height * 0.7,
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
    marginTop: -2,
    fontSize: 9,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'UrbanistSemiBold',
  },
  promosContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  promosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promosTitle: {
    fontSize: 16,
    fontFamily: 'UrbanistBold',
  },
  viewAllText: {
    fontSize: 11,
    color: '#007bff',
    fontFamily: 'UrbanistSemiBold',
  },
  promoBanner: {
    marginTop: 5,
    backgroundColor: '#e0f7fa',
    borderRadius: 15,
    padding: 0,
  },
  promoImage: {
    width: '380%',
    height: 120,
    borderRadius: 10,
  },
});

export default SlidePanel;
