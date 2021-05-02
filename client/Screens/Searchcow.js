import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useApi } from '../services';
import { Modal } from '../Components';

import Back from '../assets/images/back';
import Menu from '../assets/images/menu';

const SearchcowScreen = ({ navigation }) => {
  // states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState('');
  const [number, setNumber] = useState(null);
  
  // api calls
  const { 
    farmId,
    getCow,
   } = useApi();
  
  // functions
  // checks input text if not empty => search for cow
  const checkTextInput = async() => {
    if (number == null) {
      setModalValue('Gelieve alle velden in te vullen');
      setModalVisible(true);
      return null;
    }

    try {
      // getting cow information by cownumber
      const temp = await getCow(number, farmId);
      if(temp.message){
        throw new Error(temp.message);
      }
      // if cow found => navigate to foundcow
      navigation.navigate('Foundcow', { cow: temp});

    } catch (error) {
      setModelValue('Koe bestaat niet');
      setModalVisible(true);
    }
  };

  return (
    <>
      <View style={styles.wrapper}>

        {/* HEADER */}
        <View style={styles.screenHeader}>
          <TouchableOpacity style={styles.btnSymbol} activeOpacity={0.5} onPress={() => navigation.goBack()}>
            <Back/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Zoek koe</Text>
        </View>

        {/* BODY */}
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.instructionText}>Vul een koenummer in om de details weer te geven</Text>
            <TextInput
              style={styles.screenInput}
              onChangeText={setNumber}
              placeholder="Koenummer ..."
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.btnMid} activeOpacity={0.5} onPress={() => checkTextInput()}>
                <Text style={styles.btnText}>Koe zoeken</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* FOOTER */}
        <TouchableOpacity style={styles.footer} onPress={(ev)=>{navigation.navigate('Home')}}>
          <Menu/>
        </TouchableOpacity>

      </View>

      {/* MODAL */}
      {
        modalVisible ? 
          <Modal 
            value={modalValue}
            visible={modalVisible}
            setModalVisible={setModalVisible}
          /> : <></>
      }

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

  // header
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default SearchcowScreen;
  