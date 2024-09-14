import React, {useState, useEffect, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Button } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 13.785481250000002,
    longitude: 100.82565124999999,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const mapViewRef = useRef(null); 

  const userLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    
    const newRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    setMapRegion(newRegion); 

   
    mapViewRef.current.animateToRegion(newRegion, 1000); 
  }

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef} // ผูก ref กับ MapView
        style={styles.map}
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title='Get Location' onPress={userLocation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 300,
    left: '80%',
    transform: [{ translateX: -75 }],
    width: 150,
  },
});