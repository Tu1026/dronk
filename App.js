import { StatusBar } from 'expo-status-bar';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-elements/dist';
import Icon from 'react-native-vector-icons/FontAwesome'

import { styles } from './Styles';
import { Pages, Navigator } from './Pages'

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AppLoading from 'expo-app-loading';
import GenerateRandomCode from 'react-random-code-generator';
import { Header } from '@react-navigation/stack';
import {
  useFonts,
  Barlow_400Regular,
  Barlow_400Regular_Italic,
  Barlow_700Bold,
  Barlow_700Bold_Italic,
} from "@expo-google-fonts/barlow";
import { ScrollView } from 'react-native-gesture-handler';



var account = {
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  token: null
};

var groupCode = {
  code: "",
  token: null
};

function sendGroupCode(codeID) {
  console.log(codeID) //TODO Logic with server
};



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
  account.token = fetch('http://159.89.120.69:8000/auth/login/', { //TODO 
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

// const generateCode = () => {
//   return (
//     <View>
//       <Text>Share this code with you group: </Text>
//       <Text>{GenerateRandomCode.TextNumCode(2, 2)}</Text>
//     </View>
//   );
// }





// export class BotBar extends React.Component {
//   render() {
//     return (
//       <NavigationContainer>
//         <View style={styles.container}>
//           <Tab.Navigator
//             tabBarShowLabel={false}
//             screenOptions={{
//               tabBarStyle: {backgroundColor: '#121212'},
//               tabBarShowLabel: false,
//               headerShown: false,
//             }}
//             >
//             <Tab.Screen name="Home" component={Pages.HomePage} />
//             <Tab.Screen name="Drink Counter" component={Pages.CounterPage} />
//             {/* <Tab.Screen name="Data" component={DataPage}/>  */}
//             <Tab.Screen name="My Groups" component={Pages.SettingsPage}/> 
//             <Tab.Screen name="Map" component={Pages.MapPage}/> 
//             <Tab.Screen name="Sign Up" component={Pages.SignUpPage}/> 
//             <Tab.Screen name="Sign In" component={Pages.SignInPage}/> 

//           </Tab.Navigator>
//         </View>
//       </NavigationContainer>
//     );
//   }
// }


export default function App() {
  let [fontsLoaded] = useFonts({
    Barlow_400Regular,
    Barlow_400Regular_Italic,
    Barlow_700Bold,
    Barlow_700Bold_Italic,
  });
  // console.log(styles)
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>

        <View style={styles.container}>


          <StatusBar style="auto" />
          <Navigator/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}


