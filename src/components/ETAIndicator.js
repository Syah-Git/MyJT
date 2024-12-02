import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather'; // For clock icon
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'; // For signal icon

const ETAIndicator = ({ etaData }) => {
  /**
   * Example `etaData` format:
   * {
   *   time: '2 min',
   *   status: 'live-accurate', // 'live-accurate', 'live-inaccurate', 'scheduled'
   *   nextTimes: [4, 10, 15],
   * }
   */

  const getIndicatorStyle = (status) => {
    switch (status) {
      case 'live-accurate':
        return { color: 'green', signalIconName: 'signal-variant' }; // Green signal
      case 'live-inaccurate':
        return { color: 'orange', signalIconName: 'signal-variant' }; // Orange signal
      case 'scheduled':
      default:
        return { color: 'black', signalIconName: null }; // No signal icon
    }
  };

  const { time, status, nextTimes } = etaData;
  const { color, signalIconName } = getIndicatorStyle(status);

  return (
    <View style={styles.container}>
      {/* Top Row: ETA Time */}
      <View style={[styles.etaBox, styles.shadow]}>
        <FeatherIcon name="clock" size={14} color={color} style={styles.icon} />
        <Text style={[styles.timeText, { color }]}>{time}</Text>
        {signalIconName && (
          <MaterialCommunityIcon name={signalIconName} size={15} color={color} style={styles.signalIcon} />
        )}
      </View>

      {/* Bottom Row: Next Times */}
      <Text style={styles.nextText}>next {nextTimes.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 4,
  },
  etaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 5,
  },
  timeText: {
    fontSize: 12,
    marginHorizontal: 2,
    fontFamily: 'UrbanistSemiBold',
  },
  icon: {
    marginRight: 1,
  },
  signalIcon: {
    marginLeft: 0,
  },
  nextText: {
    fontSize: 11,
    color: '#444',
    marginTop: 2,
    fontFamily: 'UrbanistMedium',
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});

export default ETAIndicator;
