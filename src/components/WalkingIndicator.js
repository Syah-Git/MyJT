import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function WalkingIndicator({ distance }) {
  // Calculate walking time (in minutes)
  const walkingTime = Math.ceil(distance / 80); // Assuming 80 meters per minute

  return (
    <View style={styles.container}>
      {/* Walking Icon */}
      <Icon name="walking" size={20} color="#333" style={styles.icon} />
      {/* Walking Time */}
      <Text style={styles.text}>{walkingTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 0, // Spacing between icon and text
  },
  text: {
    fontSize: 12,
    fontFamily: 'UrbanistBold',
    color: '#333',
    marginTop: 10,
  },
});
