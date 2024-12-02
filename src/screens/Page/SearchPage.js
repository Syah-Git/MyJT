import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const JourneyPlannerSearch = () => {
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState(['Home', 'Office', 'Airport']);
  const [activeInput, setActiveInput] = useState(null); // Track active input

  // Simulate fetching suggestions
  const fetchSuggestions = (query) => {
    if (query.length > 0) {
      setSuggestions([
        { id: 1, title: `${query} Street`, subtitle: 'Street' },
        { id: 2, title: `${query} Avenue`, subtitle: 'Avenue' },
        { id: 3, title: `${query} Station`, subtitle: 'Station' },
        { id: 4, title: `Main ${query}`, subtitle: 'Station' },
      ]);
    } else {
      setSuggestions([]);
    }
  };

  const handleInputChange = (text, inputType) => {
    if (inputType === 'startingPoint') {
      setStartingPoint(text);
    } else {
      setDestination(text);
    }
    fetchSuggestions(text); // Fetch suggestions dynamically
  };

  const handleFocus = (inputType) => {
    setActiveInput(inputType);
  };

  const handleSuggestionPress = (place) => {
    if (activeInput === 'startingPoint') {
      setStartingPoint(place.title);
    } else {
      setDestination(place.title);
    }
    setSuggestions([]); // Clear suggestions after a selection
  };

  const handleSeeResultsPress = () => {
    console.log(`Fetching more results for "${activeInput === 'startingPoint' ? startingPoint : destination}"`);
  };

  const handleSearch = () => {
    console.log('Search initiated with:', { startingPoint, destination });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Planning</Text>
      </View>

      {/* Starting Point Input */}
      <View
        style={[
          styles.inputContainer,
          activeInput === 'startingPoint' ? styles.activeInput : {},
        ]}
      >
        <View style={[styles.icon, styles.startIcon]}>
          <Icon name="radio-button-on-outline" size={20} color="#00BFFF" />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Current Location"
          value={startingPoint}
          onChangeText={(text) => handleInputChange(text, 'startingPoint')}
          onFocus={() => handleFocus('startingPoint')}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Icon name="search-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Destination Input */}
      <View
        style={[
          styles.inputContainer,
          activeInput === 'destination' ? styles.activeInput : {},
        ]}
      >
        <View style={[styles.icon, styles.destIcon]}>
          <Icon name="radio-button-on-outline" size={20} color="#32CD32" />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Destination"
          value={destination}
          onChangeText={(text) => handleInputChange(text, 'destination')}
          onFocus={() => handleFocus('destination')}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Icon name="search-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* "See Results for ..." */}
      {(startingPoint.length > 0 || destination.length > 0) && (
        <TouchableOpacity style={styles.seeResults} onPress={handleSeeResultsPress}>
          <Text style={styles.seeResultsText}>
            See results for "{activeInput === 'startingPoint' ? startingPoint : destination}"
          </Text>
        </TouchableOpacity>
      )}

      {/* Suggestions List */}
      {activeInput && suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSuggestionPress(item)}>
              <Icon name="location-outline" size={24} color="#003366" style={styles.suggestionIcon} />
              <View style={styles.suggestionTextContainer}>
                <Text style={styles.suggestionTitle}>{item.title}</Text>
                <Text style={styles.suggestionSubtitle}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={styles.suggestionsContainer}
        />
      )}

      {/* Below Both Panels */}
      {(activeInput === 'startingPoint' || activeInput === 'destination') &&
        (!startingPoint || !destination) &&
        suggestions.length === 0 && (
          <View style={styles.belowPanelsContainer}>
            {/* "Use My Current Location" Option */}
            {activeInput === 'startingPoint' && (
              <TouchableOpacity
                style={styles.useLocationButtonRedesigned}
                onPress={() => {
                  setStartingPoint('My Current Location');
                  setActiveInput(null); // Dismiss active input
                }}
              >
                <View style={styles.radioButton}>
                  <View style={styles.radioButtonInner} />
                </View>
                <Text style={styles.useLocationTextRedesigned}>
                  Use My Current Location
                </Text>
              </TouchableOpacity>
            )}

            {/* "View Saved Places" Option */}
            {activeInput === 'destination' && (
              <TouchableOpacity
                style={styles.viewSavedPlacesButton}
                onPress={() => {
                  console.log('Navigate to Saved Places');
                }}
              >
                <Icon name="bookmark-outline" size={20} color="#32CD32" />
                <Text style={styles.viewSavedPlacesText}>View Saved Places</Text>
              </TouchableOpacity>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View style={styles.recentSearchesContainer}>
                <Text style={styles.recentSearchesTitle}>Recent Places</Text>
                {recentSearches.map((place, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.recentSearchItem}
                    onPress={() => handleSuggestionPress({ title: place })}
                  >
                    <Icon name="time-outline" size={18} color="#888" />
                    <Text style={styles.recentSearchText}>{place}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}

      {/* Search Button */}
      {startingPoint && destination && (
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'UrbanistBold',
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  activeInput: {
    borderColor: '#003366',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'UrbanistBold',
  },
  icon: {
    width: 30,
    alignItems: 'center',
  },
  seeResults: {
    marginVertical: 10,
    marginLeft: 10,
  },
  seeResultsText: {
    fontSize: 14,
    color: '#003366',
    fontFamily: 'UrbanistBold',
    fontWeight: '600',
  },
  suggestionsContainer: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionIcon: {
    marginRight: 10,
  },
  suggestionTextContainer: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    fontFamily: 'UrbanistBold',
  },
  suggestionSubtitle: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'UrbanistBold',
  },
  belowPanelsContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  useLocationButtonRedesigned: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00BFFF',
  },
  useLocationTextRedesigned: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'UrbanistBold',
  },
  viewSavedPlacesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  viewSavedPlacesText: {
    marginLeft: 10,
    color: '#32CD32',
    fontSize: 16,
    fontFamily: 'UrbanistBold',
  },
  recentSearchesContainer: {
    marginBottom: 20,
  },
  recentSearchesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'UrbanistBold',
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  recentSearchText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'UrbanistBold',
  },
  searchButton: {
    backgroundColor: '#003366',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'UrbanistBold',
  },
});

export default JourneyPlannerSearch;
