import { StatusBar } from 'expo-status-bar';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, TextInput, KeyboardAvoidingView } from 'react-native';
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

var account = {
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  token: null
}


function signUpAPI(username, password) {
  console.log(account.username)
  console.log(account.password)
  fetch('http://159.89.120.69:8000/users/', { //TODO 
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: account.username,
      first_name: account.first_name,
      last_name: account.last_name,
      password: account.password
    })
  })
};


function signInAPI(username, password) {
  console.log(account.username)
  console.log(account.password)
  account.token= fetch('http://159.89.120.69:8000/auth/login/', { //TODO 
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: account.username,
      password: account.password
    })
  })
  console.log(account.token)
};


function sendLoc(loc) {
  console.log(loc);
  fetch('https://mywebsite.com/endpoint/', { 
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      latitude: loc.latitude,
      longitude: loc.longitude
    })
  });
} 


const SignUpPage = () => {
  return (
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}>
    
    <View style={styles.logIn}>
      {/* <Text style={styles.logInText} fontSize={40}> First name: </Text> */}
      <TextInput
        style={styles.textInput}
        onChangeText={text => account.first_name=text}
        placeholder='First Name'
        secureTextEntry={false}
        />
      {/* <Text style={styles.logInText} fontSize={50}> Last name: </Text> */}
      <TextInput
        style={styles.textInput}
        onChangeText={text => account.last_name=text}
        placeholder='Last Name'
        secureTextEntry={false}
        />
      {/* <Text style={styles.logInText} fontSize={50}> Username: </Text> */}
      <TextInput
        style={styles.textInput}
        onChangeText={text => account.username=text}
        placeholder='Email'
        secureTextEntry={false}
        />
      {/* <Text style={styles.logInText} fontSize={50}> Password: </Text> */}
      <TextInput
        style={styles.textInput}
        onChangeText={text => account.password=text}
        secureTextEntry={true}
        placeholder="Password"
        clearTextOnFocus = {true}
      />
      <Button
        title="Sign In"
        onPress={() => signUpAPI()}
        buttonStyle={styles.buttonCounter}
      />
    </View>
  </KeyboardAvoidingView>
  );
};

const SignInPage = () => {
  return ( 
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
  style={styles.container}>
    <View style={styles.logIn}>
      
      {/* <Text style={styles.logInText} fontSize={50}> Username: </Text> */}
      <TextInput
          style={styles.textInput}
          onChangeText={text => account.username=text}
          placeholder="Email"
          secureTextEntry={false}
        />
      
      {/* <Text style={styles.logInText} fontSize={50}> Password: </Text> */}
      <TextInput
        style={styles.textInput}
        onChangeText={text => account.password=text}
        placeholder="Password"
        secureTextEntry={true}
        clearTextOnFocus = {true}
      />
      
      <Button
          title="Sign In"
          onPress={() => signInAPI()}
          buttonStyle={styles.buttonCounter}
      /> 
    </View>
  </KeyboardAvoidingView>
  );
};

const MapPage = () => (
  <MapView
    style={styles.map}
    provider={PROVIDER_GOOGLE}
    userInterfaceStyle={"dark"}
    showsUserLocation={true}
    followsUserLocation={true}
    showsMyLocationButton={true}>

  </MapView>
);

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

          tabBarStyle: {backgroundColor: '#121212'},
          tabBarShowLabel: false,
          headerShown: false,
        }}
        >
         <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Drink Counter" component={CounterPage} />
        {/* <Tab.Screen name="Data" component={DataPage}/>  */}
        <Tab.Screen name="My Groups" component={SettingsPage}/> 
        <Tab.Screen name="Map" component={MapPage}/> 
        <Tab.Screen name="Sign Up" component={SignUpPage}/> 
        <Tab.Screen name="Sign In" component={SignInPage}/> 

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
      
        <View style={styles.container}>


          <StatusBar style="auto" />
          <BotBar/>
        </View>
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002137',
  },
  logInText: {
    padding: 50,
    color: "#ffffff",
    padding: 10
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

  logIn: {
    flex: 1,
    backgroundColor: '#002137',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  textInput: {
    height: 50,
    margin: 12,
    width: "80%",
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#808080', 
    borderColor: '#808080',
    borderWidth: 10,
    borderRadius: 30, 
    fontSize: 25,
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
