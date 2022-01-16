import { StatusBar } from 'expo-status-bar';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Image } from 'react-native'; // Removed Button
import { Button } from 'react-native-elements/dist';
import Icon from 'react-native-vector-icons/FontAwesome'
import { styles } from './Styles';
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
  console.log(styles)
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