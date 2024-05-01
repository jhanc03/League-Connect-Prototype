import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
//https://docs.expo.dev/versions/latest/sdk/location/
import * as Location from 'expo-location';

const DiscoverScreen = () => {

  const [markers, setMarkers] = useState([]);

  const [nearbyPlayers, setNearbyPlayers] = useState([
    { id: 1, username: 'Player1', coordinates: { latitude: 0, longitude: 0 } },
    { id: 2, username: 'ThisPlayer', coordinates: { latitude: 0, longitude: 0 } },
    { id: 3, username: 'The_Player', coordinates: { latitude: 0, longitude: 0 } },
    { id: 4, username: 'theplayer27', coordinates: { latitude: 0, longitude: 0 } },
  ]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Location permissions denied. Returning to Social tab.'); //Do this
        return;
      }
    })();
  }, []);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    const json = JSON.stringify(nearbyPlayers);
    console.log(json.toString());
    setMarkers([...markers, { id: markers.length + 1, coordinate }]);
  };

  const generateRandomCoordinates = () => { //Use this and add deltas/width + height of map
    const latitude = Math.random() * 180 - 90; // Random latitude between -90 and 90
    const longitude = Math.random() * 360 - 180; // Random longitude between -180 and 180
    return { latitude, longitude };
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 53.22694,
          longitude: -0.54806,
          latitudeDelta: 0.0044,
          longitudeDelta: 0,
        }}
        onPress={handleMapPress}
      >
        {markers.map((marker) => (
          <Marker key={marker.id} coordinate={marker.coordinate} />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default DiscoverScreen;