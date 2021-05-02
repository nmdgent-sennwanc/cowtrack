import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Log from '../assets/images/log';
import Logo from '../assets/images/logo';
import Loupe from '../assets/images/loupe';
import Map from "../assets/images/map";
import Plus from '../assets/images/plus';
import Warehouse from "../assets/images/warehouse";

const HomeScreen = ({ route, navigation }) => {
    return (
      <View style={styles.wrapper}>

        {/* HEADER */}
        <View style={styles.screenHeader}>
          {/* <Text style={styles.headerTitle}>CowTrack</Text> */}
          <Logo/>
        </View>

        {/* BODY */}
        <ScrollView style={styles.container}>
          <View style={styles.content}>
          <Text style={styles.instructionText}>Welkom {route.params.username}</Text>
            {/* LINK TO STALSTATUS */}
            <TouchableOpacity style={styles.linkToScreen} activeOpacity={0.5} onPress={() => navigation.navigate('Stalstatus')}>
              <Map style={styles.linktToScreenIcon}/>
              <Text style={styles.linkToScreenText}>stalstatus</Text>
            </TouchableOpacity>

            {/* LINK TO FLOORPLAN */}
            <TouchableOpacity style={styles.linkToScreen} activeOpacity={0.5} onPress={() => navigation.navigate('Floorplan')}>
              <Warehouse/>
              <Text style={styles.linkToScreenText}>plattegrond stal </Text>
            </TouchableOpacity>

            {/* LINK TO SEARCH COW */}
            <TouchableOpacity style={styles.linkToScreen} activeOpacity={0.5} onPress={() => navigation.navigate('Searchcow')}>
              <Loupe/>
              <Text style={styles.linkToScreenText}>koe zoeken</Text>
            </TouchableOpacity>

            {/* LINK TO ADD COW */}
            <TouchableOpacity style={styles.linkToScreen} activeOpacity={0.5} onPress={() => navigation.navigate('Connecttag')}>
              <Plus/>
              <Text style={styles.linkToScreenText}>koe toevoegen</Text>
            </TouchableOpacity>

            {/* LINK TO LOGS */}
            <TouchableOpacity style={styles.linkToScreen} activeOpacity={0.5} onPress={() => navigation.navigate('Logs')}>
              <Log/>
              <Text style={styles.linkToScreenText}>logboek</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    );
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  linkToScreen: {
    height: 140,
    width: 140,
    backgroundColor: colors['light-brown'],
    borderRadius: 5,
    margin: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  linkToScreenText: {
    marginTop: 10,
    textAlign: 'center',
    color: colors['dark-brown'],
    alignItems: 'center', 
    textTransform: 'uppercase',
    fontSize: 12,
  },

  // header
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? 30 : 10,
    paddingBottom: 10,
    backgroundColor: colors['light-brown'],
  },

  headerTitle: { 
    alignItems: 'center',
    fontSize: 20,
    textTransform: 'uppercase',
    color: colors['dark-brown'],
  },

  // input
  screenInput: {
    color: colors['dark-brown'],
    height: 50,
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: colors['light-brown'],
  },
  // text
  instructionText: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 10,
    marginBottom: 20,
    borderBottomWidth: 2, 
    borderTopWidth: 2, 
    borderColor: colors['light-brown'],
    color: colors['brown'],
  },

  // buttons
  btnSymbol: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
    marginHorizontal: 20,
    borderRadius: 5,
  },

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
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: colors['brown'],
  },

  btnText: {
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors['light-brown'],
  },

  // footer
  footer: {
    height: 60,
    backgroundColor: colors['dark-brown'],
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default HomeScreen;
  