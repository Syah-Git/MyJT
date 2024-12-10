import React, { useRef, useState } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  PanResponder,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ETAIndicator from './ETAIndicator';
import TransportCard from './TransportCard';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

// Sample Bus Data
const initialBusData = [
  {
    id: '1',
    stationName: 'Larkin Sentral',
    buses: [
      { id: 'P001', route: 'Larkin Sentral ⇋ JB Sentral ⇋ Larkin Sentral', time: '2 min', status: 'live-accurate', nextTimes: [4, 10, 15] },
      { id: 'P005', route: 'Sri Stulang ⇋ Kg. Melayu Majidee ⇋ Larkin Sentral', time: '10 min', status: 'live-inaccurate', nextTimes: [12, 20, 30] },
    ],
  },
  {
    id: '2',
    stationName: 'Stesen Bas Larkin',
    buses: [
      { id: 'BL01', route: 'Bus Larkin 1', time: '5 min', status: 'scheduled', nextTimes: [15, 25, 35] },
      { id: 'BL02', route: 'Bus Larkin 2', time: '12 min', status: 'live-inaccurate', nextTimes: [20, 30, 40] },
    ],
  },
    {
      id: '3',
      stationName: 'Stesen Bas Larkin',
      buses: [
        { id: 'BL01', route: 'Bus Larkin 1', time: '5 min', status: 'scheduled', nextTimes: [15, 25, 35] },
        { id: 'BL02', route: 'Bus Larkin 2', time: '12 min', status: 'live-inaccurate', nextTimes: [20, 30, 40] },
      ],
  },
];

const SlidePanel = () => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(height * 0.4)).current;
  const [busData, setBusData] = useState(initialBusData);
  const [isPanelClosed, setIsPanelClosed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [radius, setRadius] = useState('400m'); // Default radius
  const [isRadiusModalVisible, setRadiusModalVisible] = useState(false);

  const radiusOptions = ['100m', '250m', '400m', '500m'];

  const handleRadiusSelect = (selectedRadius) => {
    setRadius(selectedRadius);
    setRadiusModalVisible(false);
  };

  const refreshData = () => {
    console.log('Refreshing bus data...');
    setBusData([...initialBusData]);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newY = gestureState.moveY;
        if (newY > height * 0.2 && newY < height) {
          slideAnim.setValue(newY);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.moveY > height * 0.8) {
          slideDown();
        } else if (gestureState.moveY < height * 0.4) {
          slideUp();
        } else {
          slideToMid();
        }
      },
    })
  ).current;

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: height * 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setExpanded(true);
      setIsPanelClosed(false);
    });
  };

  const slideToMid = () => {
    Animated.timing(slideAnim, {
      toValue: height * 0.4,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setExpanded(false);
      setIsPanelClosed(false);
    });
  };

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsPanelClosed(true));
  };

  const renderStationItem = ({ item: station }) => (
    <View style={styles.stationContainer}>
      <View style={styles.stationHeader}>
        <Icon name="bus" size={24} color="#C1264E" />
        <Text style={styles.stationName}>{station.stationName}</Text>
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startText}>Start</Text>
        </TouchableOpacity>
      </View>

      {station.buses.map((bus) => (
        <TouchableOpacity
          key={bus.id}
          style={styles.busRow}
          onPress={() => navigation.navigate} // Navigate with bus data
        >
          <TransportCard
            iconName="bus"
            number={bus.id}
            lineColor={bus.status === 'live-accurate' ? '#2ECC71' : '#FF5733'}
            style={styles.busCard}
          />
          <View style={styles.busInfo}>
            <Text style={styles.busRoute}>{bus.route}</Text>
          </View>
          <View style={styles.busTimeContainer}>
            <ETAIndicator etaData={bus} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <>
      <Animated.View style={[styles.drawer, { top: slideAnim }]}>
        <View style={styles.handle} {...panResponder.panHandlers} />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Nearby</Text>
          <TouchableOpacity onPress={refreshData}>
            <Icon name="refresh" size={20} color="#FFF" style={styles.refreshIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRadiusModalVisible(true)}>
            <Text style={styles.radius}>{radius}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={busData}
          renderItem={renderStationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 10 }}
          ListFooterComponent={
            busData.length > 2 && !expanded ? (
              <TouchableOpacity style={styles.footer} onPress={slideUp}>
                <Text style={styles.viewMore}>View More</Text>
              </TouchableOpacity>
            ) : null
          }
        />
      </Animated.View>
      {isPanelClosed && (
        <TouchableOpacity style={styles.bringBackButton} onPress={slideToMid}>
          <Text style={styles.bringBackText}>Show Nearby</Text>
        </TouchableOpacity>
      )}

      {/* Radius Selection Modal */}
      <Modal
        transparent={true}
        visible={isRadiusModalVisible}
        animationType="fade"
        onRequestClose={() => setRadiusModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Radius</Text>
            {radiusOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.modalOption}
                onPress={() => handleRadiusSelect(option)}
              >
                <Text style={styles.modalOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: height,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  handle: {
    width: 100,
    height: 6,
    backgroundColor: '#E4E4E4',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#C1264E',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    color: '#FFF',
    fontFamily: 'UrbanistBold',
  },
  refreshIcon: {
    alignItems: 'center',
  },
  stationContainer: {
    marginBottom: 2,
  },
  stationHeader: {
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stationName: {
    fontSize: 16,
    fontFamily: 'UrbanistBold',
    marginLeft: 10,
    flex: 1,
    color: '#C1264E',
  },
  startButton: {
    backgroundColor: '#2E86DE',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  startText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'UrbanistSemiBold',
  },
  busRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  busInfo: {
    flex: 1,
    marginLeft: 10,
  },
  busRoute: {
    fontSize: 12,
    fontFamily: 'UrbanistSemiBold',
    marginTop: -1,
  },
  busTimeContainer: {
    alignItems: 'flex-end',
  },
  footer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  viewMore: {
    fontSize: 14,
    color: '#C1264E',
    fontFamily: 'UrbanistBold',
  },
  bringBackButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#C1264E',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  bringBackText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'UrbanistBold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 250,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'UrbanistBold',
    color: '#C1264E',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalOptionText: {
    fontSize: 14,
    fontFamily: 'UrbanistSemiBold',
    color: '#616161',
    textAlign: 'center',
  },
  radius: {
    fontSize: 12,
    color: '#FFF',
    fontFamily: 'UrbanistSemiBold',
    textDecorationLine: 'underline',
  },
});

export default SlidePanel;
