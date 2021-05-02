import React, { useEffect } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import {AUTH_CLIENT_ID, AUTH_ENDPOINT} from "@env";

import Logo from '../assets/images/logo';

const LoginScreen = ({ navigation }) => {
  // env variables
    const auth0ClientId = AUTH_CLIENT_ID;
    const authorizationEndpoint = AUTH_ENDPOINT;
    
    // functions
    // storing JWT token 
    const storeJWT = async (jwtToken) => {
      try {
          await AsyncStorage.setItem('@jwtToken', jwtToken)
        } catch (e) {
          // saving error
          throw new Error(e);
        }
    }
    // login with auth0
    const useProxy = Platform.select({ web: false, default: true });
    const redirectUri = AuthSession.makeRedirectUri({ useProxy });
    
    const [request, result, promptAsync] = AuthSession.useAuthRequest(
        {
        redirectUri,
        clientId: auth0ClientId,
        // id_token will return a JWT token
        responseType: 'id_token',
        // retrieve the user's profile
        scopes: ['openid', 'profile'],
        extraParams: {
            // ideally, this will be a random value
            nonce: 'nonce',
        },
        },
        { authorizationEndpoint }
    );

    useEffect(() => {
        if (result) {
        if (result.error) {
            alert(
            'Authentication error',
            result.params.error_description || 'something went wrong'
            );
            return;
        }
        if (result.type === 'success') {
            // Retrieve the JWT token and decode it
            const jwtToken = result.params.id_token;
            // Store JWT token in async storage
            storeJWT(jwtToken);

            const decoded = jwtDecode(jwtToken);
            
            const { name } = decoded;
            navigation.navigate('Home', {username: name})
        }
        }
    }, [result]);

  return (
    <>
      <View style={styles.wrapper}>
        {/* BODY */}
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            <Logo/>
            <View style={styles.new}>
                <TouchableOpacity style={styles.btnMid} activeOpacity={0.5} disabled={!request} title="Log in with Auth0" onPress={() => promptAsync({ useProxy })}>
                    <Text style={styles.btnText}>Login to Cowtrack</Text>
                </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  )
};

let colors = {
  'dark-brown': '#806854',
  'brown': '#B39C7D',
  'light-brown': '#F0EBD8',
  'white': '#FDFFF5',
  'black': '#000000',
  'grey': '#E8E8E8'
}

const styles = StyleSheet.create({
  // containers
  wrapper: {
    flex: 1,
  },
  
  container: {
    backgroundColor: colors['white'],
    fontFamily: 'Roboto',
  }, 

  content: {
    padding: 30,
  },

  logo:{
      height: 60,
      width: 60,
  },

  // buttons
  btnDark: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: colors['dark-brown'],
  },

  btnMid: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 20,
    backgroundColor: colors['brown'],
  },

  btnText: {
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors['light-brown'],
  },
});

export default LoginScreen;
  