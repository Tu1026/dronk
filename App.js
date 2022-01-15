import { StatusBar } from 'expo-status-bar';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator();

// export default class Playground extends Component {
//   render() {
//     return (
//       <MapView
//       provider={PROVIDER_GOOGLE}
//       >

//       </MapView>
//     )
//   }
// }

const MapPage = () => (
  <MapView
    style={styles.map}
    provider={PROVIDER_GOOGLE}
    userInterfaceStyle={"dark"}
    showsUserLocation={true}
    followsUserLocation={true}
    showsMyLocationButton={true}
    >

  </MapView>
)

const DataPage = () => (
  <View style={styles.container}>
    <Text style={styles.normalText}> DataPage! </Text>
  </View>
);

const SettingsPage = () => (
  <View style={styles.container}>
    <Text style={styles.normalText}> SettingsPage! </Text>
  </View>
);

export const BotBar = () => (
  
  <NavigationContainer>
    <View style={styles.container}>
      <Tab.Navigator 
        tabBarShowLabel={false}
        screenOptions={{
          tabBarStyle: {backgroundColor: '#121212'},
          tabBarShowLabel: false,
          // tabBarBackground: () => (
          //   <View style={styles.container}/>
          // ),
          headerShown: false,
        }}
        >
        <Tab.Screen name="Data" component={DataPage}/> 
        <Tab.Screen name="Settings" component={SettingsPage}/> 
        <Tab.Screen name="Map" component={MapPage}/> 
      </Tab.Navigator>
    </View>  
  </NavigationContainer>
  
);


export default function App() {
  return (
    
    <View style={styles.container}>
      
      <Text>Open up App.js to start working on your app!</Text>
      <Text style={{textAlign:'center'}}>DrinkSafe is an app developed entirely in 24 hours during nwHacks 2022.</Text>
      <StatusBar style="auto" />
      <BotBar/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  normalText: {
    color: '#ffffff',

  },
  map: {
    flex: 1
  }
});
