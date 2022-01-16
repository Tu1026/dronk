import { StatusBar } from 'expo-status-bar';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements/dist';
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Barlow_400Regular,
  Barlow_400Regular_Italic,
  Barlow_700Bold,
  Barlow_700Bold_Italic,
} from "@expo-google-fonts/barlow";
import { ScrollView } from 'react-native-gesture-handler';

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

// const CounterPage = () => (
//   <View style={styles.titlePage}>
//     <Text style={styles.normalText}> drink </Text>
//     <Text style={styles.normalText}> counter: </Text>
//     <Text style={styles.drinkCounter}> 5 </Text>
//     <Button title="Add Drink" onPress={() => console.log("Drink added")}/>
//   </View>
// );

class HomePage extends React.Component {

  render() {
    return (
      <View style={styles.titlePage}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={styles.mainLogo}
            source={require('./assets/icons8-party-100.png')} />
          <Text style={styles.dronkTitle}> dronk. </Text>
        </View>
        <Text style={styles.keepingFunNights}>keeping fun nights  </Text>
        <Text style={styles.worryFree} textAlign={'right'}> worry-free </Text>
        {/* <View style={styles.worryFreeLine} /> */}
        <Text style={styles.useBottomNav}>Use the bottom navigation bar to get started</Text>
      </View>
    )
  }
}

class CounterPage extends React.Component {

  state = {
    value: 0,
    total_drinks: 0
  }

  incrementValue = () => {
    this.setState({
      value: this.state.value + 1,
      total_drinks: this.state.total_drinks + 1
    })

    console.log("Value: " + (this.state.value + 1))
  }
  render() {
    return (
      <View style={styles.titlePage}>
        <Text style={styles.normalText}> drink </Text>
        <Text style={styles.normalText}> counter: </Text>
        <Text style={styles.drinkCounter}>{this.state.value}</Text>
        <Button
          icon={
            <Icon
              name="beer"
              size={30}
              color="white"
            />
          }
          buttonStyle={styles.buttonCounter} onPress={this.incrementValue} title=" Add"
        />
      </View>
    )
  }
}

class SettingsPage extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerIt}>
          <Text style={styles.currGroupText}> Current Group </Text>
          <Image
            style={styles.groupLogo}
            source={require('./assets/icons8-group-128.png')}
          />
        </View>
        <View style={styles.listBorder}>
          <FlatList
            data={[
              { key: 'Kenneth Xing' },
              { key: 'Stripey Xing' },
              { key: 'Lukas Franz' },
              { key: 'Wilson Rabbit' },
            ]}
            renderItem={({ item }) => <Text style={styles.groupList}>{item.key}</Text>}
          />
        </View>

        <View style={styles.createGroup}>
          <View
            style={styles.line}
          />
          <Text style={styles.createGroupText}>Create a New Group</Text>
        </View>

      </SafeAreaView>
    )
  }
}

export const BotBar = () => (

  <NavigationContainer>
    <View style={styles.container}>
      <Tab.Navigator
        tabBarShowLabel={false}
        screenOptions={{
          tabBarStyle: { backgroundColor: '#121212' },
          tabBarShowLabel: true,
          // tabBarBackground: () => (
          //   <View style={styles.container}/>
          // ),
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Drink Counter" component={CounterPage} />
        <Tab.Screen name="Map" component={MapPage} />
        <Tab.Screen name="My Groups" component={SettingsPage} />
      </Tab.Navigator>
    </View>
  </NavigationContainer>

);


export default function App() {

  let [fontsLoaded] = useFonts({
    Barlow_400Regular,
    Barlow_400Regular_Italic,
    Barlow_700Bold,
    Barlow_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (

      <View style={styles.container}>

        {/* <Text>Open up App.js to start working on your app!</Text>
      <Text style={{textAlign:'center'}}>DrinkSafe is an app developed entirely in 24 hours during nwHacks 2022.</Text> */}
        <StatusBar style="auto" />
        <BotBar />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002137',
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  mainLogo: {
    width: 75,
    height: 75,
    marginLeft: '16%',
    marginTop: '0.3%'
  },
  normalText: {
    color: '#ffffff',
    fontFamily: 'Barlow_400Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 50
  },
  drinkCounter: {
    color: '#ffffff',
    fontFamily: 'Barlow_400Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 130,
    marginTop: 30
  },
  dronkTitle: {
    color: '#ffffff',
    fontFamily: 'Barlow_400Regular',
    fontSize: 70,
  },
  keepingFunNights: {
    color: '#ffffff',
    fontFamily: 'Barlow_400Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 25,
    marginTop: '11%',
    marginLeft: '30%'
  },
  worryFree: {
    color: '#fae361',
    fontFamily: 'Barlow_700Bold_Italic',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 25,
    marginLeft: '48%',
  },
  worryFreeLine: {
    width: '35%',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 0.5,
    marginLeft: '55%',
    marginTop: 6
  },
  map: {
    flex: 1
  },
  titlePage: {
    flex: 1,
    backgroundColor: '#002137',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonCounter: {
    backgroundColor: '#002137',
    borderColor: 'white',
    borderWidth: 3,
    padding: 15,
    borderRadius: 15,
    marginTop: 20
  },
  useBottomNav: {
    color: '#ffffff',
    fontFamily: 'Barlow_400Regular_Italic',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 15,
    position: 'absolute',
    bottom: '3.5%',
  },
  currGroupText: {
    color: '#ffffff',
    fontFamily: 'Barlow_400Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 35,
    marginTop: '18%'
  },
  centerIt: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  groupLogo: {
    width: 115,
    height: 115,
    marginTop: '5%',
    marginBottom: '8%'
  },
  groupList: {
    color: '#ffffff',
    fontFamily: 'Barlow_400Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 25,
    textAlign: 'center'
  },
  listBorder: {
    borderColor: '#ffffff',
    borderWidth: 7,
    alignItems: 'center',
    justifyContent: 'center',
    width: '55%',
    height: 170,
    marginLeft: '22%',
    borderRadius: 13,
    padding: 15
  },
  line: {
    width: '65%',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    marginTop: 0,
    // borderRadius: ,
  },
  createGroup: {
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createGroupText: {
    color: '#ffffff',
    fontFamily: 'Barlow_400Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 30,
    marginTop: '5%'
  }
});
