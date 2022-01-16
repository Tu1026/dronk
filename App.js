import { StatusBar } from 'expo-status-bar';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

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
  fetch('http://159.89.120.69:8000/users/', { //TODO 
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

function signIn() {
  console.log("Usernames")
  console.log(account.username)
  console.log(account.password)
  signInAPI(account.username, account.password)
}

const SignUpPage = () => {
  return (
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}>
    
    <View style={styles.logIn}>
      <Text style={styles.logInText} fontSize={40}> First name: </Text>
      <TextInput
        style={{height: 40, width: "90%", padding: 0, backgroundColor: '#808080' }}
        onChangeText={text => account.first_name=text}
        secureTextEntry={false}
        />
      <Text style={styles.logInText} fontSize={50}> Last name: </Text>
      <TextInput
        style={{height: 40, width: "90%", padding: 0, backgroundColor: '#808080' }}
        onChangeText={text => account.last_name=text}
        secureTextEntry={false}
        />
      <Text style={styles.logInText} fontSize={50}> Username: </Text>
      <TextInput
        style={{height: 40, width: "90%", padding: 0, backgroundColor: '#808080' }}
        onChangeText={text => account.username=text}
        secureTextEntry={false}
        />
      <Text style={styles.logInText} fontSize={50}> Password: </Text>
      <TextInput
        style={{height: 40, width: "90%", padding: 0, backgroundColor: '#808080' }}
        onChangeText={text => account.password=text}
        secureTextEntry={true}
        clearTextOnFocus = {true}
      />
      <Button
        title="Sign In"
        onPress={() => signUpAPI()}
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
      <View>
      <Text style={styles.logInText} fontSize={50}> Username: </Text>
      <TextInput
          style={{height: 40, width: "90%", padding: 0, backgroundColor: '#808080' }}
          onChangeText={text => account.username=text}
          secureTextEntry={false}
        />
      </View>
      <View>
      <Text style={styles.logInText} fontSize={50}> Password: </Text>
      <TextInput
        style={{height: 50, width: "90%", padding: 0, backgroundColor: '#808080' }}
        onChangeText={text => account.password=text}
        secureTextEntry={true}
        clearTextOnFocus = {true}
      />
      </View>
      <Button
          title="Sign In"
          onPress={() => signIn()}
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
    showsMyLocationButton={true}
    // onUserLocationChange = {e => sendLoc(e.nativeEvent.coordinate)}
    >
  </MapView>
);

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
        <Tab.Screen name="Sign In" component={SignUpPage}/> 
      </Tab.Navigator>
    </View>  
  </NavigationContainer>
  
);


export default function App() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        
        <Text>Open up App.js to start working on your app!</Text>
        <Text style={{textAlign:'center'}}>DrinkSafe is an app developed entirely in 24 hours during nwHacks 2022.</Text>
        <StatusBar style="auto" />
        <BotBar/>
      </View>
    </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  normalText: {
    color: '#ffffff',
  },
  logInText: {
    padding: 50,
    color: "#ffffff",
    padding: 10
  },
  map: {
    flex: 1
  },
  logIn: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});
