import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import SocialScreen from './screens/SocialScreen';
import MessagesScreen from './screens/MessagesScreen';

import DiscoverScreen from './screens/DiscoverScreen';


import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

//https://docs.expo.dev/versions/latest/sdk/location/
import * as Location from 'expo-location';

function App() {
  return (
    <NavigationContainer>
      <TabNav/>
    </NavigationContainer> 
  );
}

const SocialNav = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={{headerStyle: styles.header, headerTitleStyle: styles.headerText}}>
      <Stack.Screen name="Social" component={SocialScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
    </Stack.Navigator>
  );
}
const DiscoverNav = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={{headerStyle: styles.header, headerTitleStyle: styles.headerText}}>
      <Stack.Screen name="Social" component={DiscoverScreen} />
    </Stack.Navigator>
  );
}

const TabNav = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Social"
        component={SocialNav}
        options={{
          tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="android-messages" color={color} size={size}/>
          )
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverNav}
        options={{
          tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="android-messages" color={color} size={size}/>
          )
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#800000',
  },
  headerText: {
    color: '#fff',
  },
  bottomBar: {
    flex: 0.1,
  },
})

export default App;