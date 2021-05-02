import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useApi } from '../services';
import { Modal } from '../Components';

import Back from '../assets/images/back';
import Menu from '../assets/images/menu';

const SetAnchorsScreen = ({route, navigation}) => {
  // states
  const [modalVisible, setModalVisible] = useState(false);
  const [X1, setX1] = useState(null);
  const [Y1, setY1] = useState(null);
  const [X2, setX2] = useState(null);
  const [Y2, setY2] = useState(null);
  const [X3, setX3] = useState(null);
  const [Y3, setY3] = useState(null);

  // api calls
  const { 
    updateAnchors,
  } = useApi();

  // functions
  // checks input text if not empty => update anchors
  const handleOnPress = async() =>{
    
    if (X1 == null || Y1 == null || X2 == null|| Y2 == null|| X3 == null|| Y3 == null) {
      setModalVisible(true);
      return null;
    }

    // for each anchor, update data
    const anchors = route.params.anchors;
    for (let i = 0; i < anchors.length; i++) {
      if(i === 0){
        await updateAnchors(anchors[i].id, X1, Y1); 
      } else if (i === 1){
        await updateAnchors(anchors[i].id, X2, Y2); 
      } else {
        await updateAnchors(anchors[i].id, X3, Y3); 
      }
    }

    // if anchors updated => navigate to home
    navigation.navigate('Home');
    setModalVisible(true);
  };

  return(
    <>
      <View style={styles.wrapper}>

         {/* HEADER */}
         <View style={styles.screenHeader}>
          <TouchableOpacity style={styles.btnSymbol} activeOpacity={0.5} onPress={() => navigation.goBack()}>
            <Back/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ankerpunten</Text>
        </View>

        {/* BODY */}
        <ScrollView style={styles.container}>
          <View style={styles.content}>
              <View>
                <Text style={styles.instructionText}>Geef de x en y waardes van de ankerpunten (1 eenheid is 1 meter)</Text>
                <Text style={styles.instructionText}>Het punt (0,0) situeert zich linksboven op de plattegrond</Text>
                <View style={styles.inputFields}>
                  <TextInput style={styles.screenInputSmall} onChangeText={setX1} placeholder="X1..."keyboardType="numeric"/>
                  <TextInput style={styles.screenInputSmall} onChangeText={setY1} placeholder="Y1..."keyboardType="numeric"/>
                </View>
                <View style={styles.inputFields}>
                  <TextInput style={styles.screenInputSmall} onChangeText={setX2} placeholder="X2..."keyboardType="numeric"/>
                  <TextInput style={styles.screenInputSmall} onChangeText={setY2} placeholder="Y2..."keyboardType="numeric"/>
                </View>
                <View style={styles.inputFields}>
                  <TextInput style={styles.screenInputSmall} onChangeText={setX3} placeholder="X3..."keyboardType="numeric"/>
                  <TextInput style={styles.screenInputSmall} onChangeText={setY3} placeholder="Y3..."keyboardType="numeric"/>
                </View>
                <TouchableOpacity style={styles.btnMid} activeOpacity={0.5} onPress={() => handleOnPress()}>
                    <Text style={styles.btnText}>Bevestig</Text>
                </TouchableOpacity>
              </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.footer} onPress={(ev)=>{navigation.navigate('Home')}}>
          <Menu/>
        </TouchableOpacity>
      </View>
      {
        modalVisible ? 
          <Modal 
            value={`Gelieve alle velden in te vullen`}
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
  screenInputSmall: {
    color: colors['dark-brown'],
    height: 50,
    flex: 1,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: colors['light-brown'],
  },

  inputFields: {
    flexDirection: 'row',
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

export default SetAnchorsScreen;
  