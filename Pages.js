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
                    <Text style={styles.useBottomNav}>Use the bottom navigation bar to get started</Text>
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
                  onPress={() => signInAPI()}
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

}