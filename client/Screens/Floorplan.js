import React, { useCallback, useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useApi } from '../services';
import { Diamond, Modal, Rectangle } from '../Components';

import Back from '../assets/images/back';
import Menu from '../assets/images/menu';

const FloorplanScreen = ({navigation}) => {
  // states
  const [anchors, setAnchors] = useState();
  const [check1, setCheck1] = useState(null);
  const [check2, setCheck2] = useState(null);
  const [floor, setFloor] = useState();
  const [floorLength, setFloorLength] = useState();
  const [floorWidth, setFloorWidth] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [rectangleScale, setRectangleScale] = useState();
  
  // api calls
  const { 
    farmId,
    getFarm,
    getFarmAnchors,
    updateFarm,
  } = useApi();

  // functions
  // checks input text if not empty => update farm
  const handleOnPress = async() =>{
    if(check1 == null || check2 == null){
      setModalVisible(true);
      return null;
    }
    
    let width = 0;
    let length = 0;
    
    if( parseInt(floorWidth) < parseInt(floorLength)){
      setFloor({width: parseInt(floorWidth), length: parseInt(floorLength)});
      width = parseInt(floorWidth);
      length = parseInt(floorLength);
    } else {
      setFloor({width: parseInt(floorLength), length: parseInt(floorWidth)});
      width = parseInt(floorLength);
      length = parseInt(floorWidth);
    }
    
    // updating farm with new width and length
    await updateFarm(farmId, width, length);

    // if farm updated => navigate to home
    navigation.navigate('Home');
  };

  // resets floor
  const handleReset = () => {
    setFloor(null);
  };

  // navigate to anchor set page
  const handleSetAnchors = () => {
    navigation.navigate('SetAnchors', {anchors: anchors});
  };

  // init
  const initFetch = useCallback(
    () => {
      const fetchdata = async () => {
        // gets farm data
        const temp = await getFarm(farmId);

        if(temp.farmWidth !== null && temp.farmLength !== null){
          const length = parseInt(temp.farmLength);
          const width = parseInt(temp.farmWidth);

          let scale = length/width;
          setRectangleScale(scale);

          setFloorWidth(temp.farmWidth);
          setFloorLength(temp.farmLength);
          setFloor({width: temp.farmWidth, length: temp.farmLength});
        }

        // gets all anchors of a farm
        const temp2 = await getFarmAnchors(farmId);
        if(temp2){
          setAnchors(temp2);
        }
      }
      fetchdata();},
      [],
  );

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return(
    <>
      <View style={styles.wrapper}>

        {/* HEADER */}
        <View style={styles.screenHeader}>
          <TouchableOpacity style={styles.btnSymbol} activeOpacity={0.5} onPress={() => navigation.goBack()}>
            <Back/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Plattegrond</Text>
        </View>

        {/* BODY */}
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            {
              floor ?
              <>
                <View style={{alignItems: 'center', position: 'relative'}}>
                  <Text style={styles.instructionText}>Druk op de ankerpunten voor meer informatie</Text>
                  <Rectangle scale={ rectangleScale } floor={{width: floorWidth, height: floorLength}}>
                  {
                    anchors && anchors.map((anchor, i) => {
                      return <Diamond 
                        size={{width: 40, height: 40}} 
                        top={`${anchor.coordinate_Y/floorLength * 100}%`} 
                        left={`${anchor.coordinate_X/floorWidth * 100}%`}
                        key={i}
                        anchor={anchor}
                        />
                    })
                  } 
                  </Rectangle>
                </View>
                <View style={styles.textBox}>
                  <Text style={styles.textBoxText}>Breedte - {floorWidth} meter</Text>
                  <Text style={styles.textBoxText}>Lengte - {floorLength} meter</Text>
                </View>
                
                <TouchableOpacity style={styles.btnDark} activeOpacity={0.5} onPress={() => handleReset()}>
                    <Text style={styles.btnText}>Stel lengte en breedte in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnMid} activeOpacity={0.5} onPress={() => handleSetAnchors()}>
                    <Text style={styles.btnText}>Stel ankerpunten in</Text>
                </TouchableOpacity>
              </>
              : 
              <View>
                <Text style={styles.instructionText}>Vul hier de breedte en lengte van de stal in</Text>
                <TextInput
                  style={styles.screenInput}
                  onChangeText={(x) => {setFloorWidth(x); setCheck1(x);}}
                  placeholder="Breedte in m ..."
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.screenInput}
                  onChangeText={(x) => {setFloorLength(x); setCheck2(x);}}
                  placeholder="Lengte in m ..."
                  keyboardType="numeric"
                />
                <TouchableOpacity style={styles.btnMid} activeOpacity={0.5} onPress={() => handleOnPress()}>
                    <Text style={styles.btnText}>Bevestig</Text>
                </TouchableOpacity>
              </View>
            }
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

  textBox: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  textBoxText: {
    fontSize: 16,
    color: colors['dark-brown'],
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

export default FloorplanScreen;
  