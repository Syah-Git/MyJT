import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function WalkingIndicator({ distance }) {
  // Calculate walking time (in minutes)
  const walkingTime = Math.ceil(distance / 80); // Assuming 80 meters per minute

  return (
    <View style={styles.container}>
      {/* Walking Icon */}
      <Icon name="walk-outline" size={24} color="#333" style={styles.icon} />
      {/* Walking Time */}
      <Text style={styles.text}>{walkingTime} min</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6, // Spacing between icon and text
  },
  text: {
    fontSize: 14,
    fontFamily: 'UrbanistBold',
    color: '#333',
  },
});
