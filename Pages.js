import { StatusBar } from 'expo-status-bar';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import { StyleSheet, Text, View, TextInput, FlatList, KeyboardAvoidingView, SafeAreaView, Image, Alert, ScrollView } from 'react-native'; // Removed Button
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
import GenerateRandomCode from 'react-random-code-generator';


function checkSignIn() {
  if (account.token != null) { //TODO
    return (true)
  } else {
    return (false)
  }
}

var account = {
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  location: "",
  token: null,
  user_id: "",
};

function sendGroupCode() {
  console.log(account.user_id) //TODO Logic with server
  fetch('http://159.89.120.69:8000/friends/', { //TODO 
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    pk: account.token,
    first_name: account.first_name,
    last_name: account.last_name,
    user_id: account.user_id,
  })
})
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
      username: account.username,
      first_name: account.first_name,
      last_name: account.last_name,
      password: account.password
    })
  })
};

function logIn(account) {

}

export const getUser = (token) => {
  if(token == null) return null;
  return fetch('http://localhost:8080/api/user/get', {
      method: 'GET',
      headers: {"Authorization": "Bearer " + token}
  }).then((response) => {
    console.log(response.json());
      return response.json();
  }).catch((err) => {
      console.log(err);
  })
  }
  
  
  export const dologin = async (username, password) => {
    console.log("Logging In")
    
  
    try {
      const res = await fetch('http://159.89.120.69:8000/auth/login/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    username: username,
                    password: password
                  })
        })
      const result = await res.json()  
      console.log(result)
      return result
    } catch {
      console.log("No Response")
      return null
    }
  }

const signInAPI = async (navigation) => {
  console.log("Starting Sign In")
  const username = account.username
  const password = account.password

  if (username.length == 0 || password.length == 0) {
    // this.setState({
    //   errorMessage: 'Login and password is required.',
    //   loginProcessing: false,
    // });
    console.log("Enter a Username and Password")
  } else {
    let loginResponse = await dologin(username, password);
  
    
    console.log(loginResponse)
    if (loginResponse.id > -1) {
      navigation.reset({
      index: 0,
      routes: [{ name: 'Signed In' }],
      })
      
    } else if (loginResponse.non_field_errors[0] === "Unable to log in with provided credentials.") {
      navigation.replace("Sign In Error")
    }
  }
}

// function signInAPI(navigation) {
//   console.log(account.username)
//   console.log(account.password)

//   account.token= fetch('http://159.89.120.69:8000/auth/login/', { //TODO 
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       username: account.username,
//       password: account.password
//     })
//   })
//   // account.token._U = "TODO"
//   console.log(account.token)
//   if (checkSignIn()) {
//     navigation.reset({
//       index: 0,
//       routes: [{ name: 'Signed In' }],
//       })
//   } else {
    
//   }
// };

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// function sendLoc(loc) {
//   console.log(loc);
//   fetch('https://mywebsite.com/endpoint/', { 
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       latitude: loc.latitude,
//       longitude: loc.longitude
//     })
//   });
// } 

export const Pages = {
    HomePage: class HomePage extends React.Component {

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
                    <View style={{ flexDirection: 'row' }}>
                      <Button
                      title="Sign in"
                      onPress={() => this.props.navigation.navigate('Sign In')}
                      buttonStyle={styles.buttonHomeL}
                      titleStyle={styles.buttonFont}/>
                      <Button
                      title="Sign Up"
                      onPress={() => this.props.navigation.navigate('Sign Up')}
                      buttonStyle={styles.buttonHomeR}
                      titleStyle={styles.buttonFont}/> 
                    </View>
                    {/* <Text style={styles.useBottomNav}>Use the bottom navigation bar to get started</Text> */}
                </View>
            )
        }
    },
    
    SignUpPage: class SignUpPage extends React.Component {
        render() {
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
                title="Sign Up"
                onPress={() => signUpAPI()}
                buttonStyle={styles.buttonCounter}
              />
            </View>
          </KeyboardAvoidingView>
          );
        };
      },

    SignInPage: class SignInPage extends React.Component {
        render() {
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
                  onPress={() => signInAPI(this.props.navigation)}
                  buttonStyle={styles.buttonCounter}
              /> 
            </View>
          </KeyboardAvoidingView>
          );
        }
      },

      
    SignInErrorPage: class SignInPage extends React.Component {
      render() {
        return ( 
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
          <View style={styles.logIn}>
            <Text style={{color: 'red'}}> Invalid Username or Password</Text>
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
                onPress={() => signInAPI(this.props.navigation)}
                buttonStyle={styles.buttonCounter}
            /> 
          </View>
        </KeyboardAvoidingView>
        );
      }
    },


    MapPage: class MapPage extends React.Component {
        render() {
          return (
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              userInterfaceStyle={"dark"}
              showsUserLocation={true}
              followsUserLocation={true}
              showsMyLocationButton={true}>
      
            </MapView>
          );
        }
      },

      CounterPage: class CounterPage extends React.Component {

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
    
        decrementValue = () => {
          this.setState({
            value: (this.state.value > 1) ? this.state.value - 1 : 0,
            total_drinks: this.state.total_drinks - 1
          })
          console.log("Value: " + (this.state.value - 1))
        }
    
        render() {
          return (
            <ScrollView style={styles.scroll}>
            <View style={styles.counterTitle}>
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
                buttonStyle={styles.buttonCounter} onPress={this.incrementValue} title="  Add"
                titleStyle={styles.buttonFont}
              />
              <Button
                buttonStyle={styles.removeDrinkButton}
                onPress={this.decrementValue}
                title="Remove Drink"
                titleStyle={{ fontFamily: 'Barlow_400Regular', fontSize: 14 }}
              />
              
              <Text style={styles.historyText}>history</Text>
              <View
                    style={styles.lineShort}
              />
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.drinkDate}>Jan 15</Text>
                <Text style={styles.drinkNum}>3</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.drinkDate}>Jan 10</Text>
                <Text style={styles.drinkNum}>1</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.drinkDate}>Jan 03</Text>
                <Text style={styles.drinkNum}>4</Text>
              </View> 

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.drinkDate}>Dec 15</Text>
                <Text style={styles.drinkNum}>2</Text>
              </View> 

              </View>
            </ScrollView>
          )
        }
      },
      
      GroupsPage: class GroupsPage extends React.Component {

        // constructor(props) {
        //   super(props);
        //   this.state = { count: 0 };
        // }
      
        generateCode = () => {
          // <View>
          //   <Text>Share this code with you group: </Text>
          //   <Text>{GenerateRandomCode.TextNumCode(2, 2)}</Text>
          // </View>
          account.user_id = GenerateRandomCode.TextNumCode(2, 2);
          Alert.alert("Share this code with your group:", account.user_id );
          sendGroupCode();
          // this.setState({
          //   count: this.state.count + 1
          //   <V
          // })
        }
      
        render() {
          return (
            <KeyboardAvoidingView
              //keyboardVerticalOffset={Header.HEIGHT + 20}
              //behavior="padding"
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.container}>
              <View style={{ justifyContent: "flex-end", padding: 5 }}>
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
                  <TextInput
                    style={styles.joinTextInput}
                    onChangeText={text => account.user_id = text}
                    placeholder="Group Code"
                    secureTextEntry={false} />
                  <View style={{ flexDirection: 'row' }}>
                    <Button
                      title="Join a Group"
                      titleStyle={styles.buttonFont}
                      onPress={() => sendGroupCode()}
                      buttonStyle={styles.joinGroupButton} />
                    <Button
                      title="Make a Group"
                      titleStyle={styles.buttonFont}
                      onPress={this.generateCode}
                      buttonStyle={styles.makeGroupButton} />
                  </View>
                </View>
              </View>
      
            </KeyboardAvoidingView >
          )
      
        }
      
      }
}

export class Navigator extends React.Component {

  state = {
    signedIn: false
  }

  render() {
  
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Not Logged In" component = {Pages.HomePage}/>
            <Stack.Screen name ="Sign Up" component={Pages.SignUpPage}/> 
            <Stack.Screen name="Sign In" component={Pages.SignInPage}/> 
            <Stack.Screen name="Sign In Error" component={Pages.SignInErrorPage} options={{animationEnabled: false,}}/> 
            <Stack.Screen name="Signed In" component={BotBar} options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
        
      )
  }
}

class BotBar extends React.Component {

  render() {
    return (
      <NavigationContainer independent={true}>
        <View style={styles.container}>
          <Tab.Navigator
            tabBarShowLabel={false}
            screenOptions={{

              tabBarStyle: { backgroundColor: '#121212' },
              tabBarShowLabel: false,
              headerShown: false,
            }}
          >
            <Tab.Screen
              name="Drink Counter"
              component={Pages.CounterPage}
              options={{
                tabBarLabel: 'drink',
                tabBarIcon: () => (
                  <Icon
                    name="beer"
                    size={30}
                    color="white" />)
              }} />
            {/* <Tab.Screen name="Data" component={DataPage}/>  */}
            <Tab.Screen
              name="My Groups"
              component={Pages.GroupsPage}
              options={{
                tabBarLabel: 'ppl',
                tabBarIcon: () => (
                  <Icon
                    name="users"
                    size={30}
                    color="white" />)
              }} />
            <Tab.Screen
              name="Map"
              component={Pages.MapPage}
              options={{
                tabBarLabel: 'Mapmap',
                tabBarIcon: () => (
                  <Icon
                    name="map"
                    size={30}
                    color="white" />)
              }} />
          </Tab.Navigator>
        </View>
      </NavigationContainer>
    );
  }
}

