import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Button } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
//https://docs.expo.dev/versions/latest/sdk/location/
import * as Location from 'expo-location';

const DiscoverScreen = () => {

  const [location, setLocation] = useState(null);

  const nearbyPlayers = [
    { id: 1, username: 'Player1', lat: 0, long: 0 },
    { id: 2, username: 'ThisPlayer', lat: 0, long: 0 },
    { id: 3, username: 'The_Player', lat: 0, long: 0 },
    { id: 4, username: 'theplayer27', laat: 0, long: 0 },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Location permissions denied.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const generateRandomCoordinates = () => {
    const latitude = (location.coords.latitude ? location.coords.latitude : 53.22694) + (Math.random() * 0.007 - 0.0035);
    const longitude = (location.coords.longitude ? location.coords.longitude : -0.54806) + (Math.random() * 0.012 - 0.006);
    return { latitude, longitude };
  };

  return (
    <View style={styles.container}>
      {location && (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.014,
          longitudeDelta: 0,
        }}
      >
        {nearbyPlayers.map(player => (
          <Marker
            key={player.id}
            coordinate={generateRandomCoordinates()}
            title={player.username}
          />
        ))}
      </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default DiscoverScreen;
