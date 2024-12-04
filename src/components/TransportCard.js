import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TransportCard = ({ iconName = 'bus', number, lineColor = '#0000FF', showIcon = true, style }) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.content}>
        {showIcon && ( // Conditionally render the icon based on `showIcon`
          <Icon name={iconName} size={14} color="#333" style={styles.icon} />
        )}
        <Text style={styles.number}>{number}</Text>
      </View>
      <View style={[styles.line, { backgroundColor: lineColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 54,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
  },
  icon: {
    marginRight: 3,
    marginBottom: 5,
    marginLeft: -1,
  },
  number: {
    fontSize: 11,
    fontFamily: 'UrbanistBold',
    color: '#333',
    marginBottom: 8,
  },
  line: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 5,
  },
});

export default TransportCard;
