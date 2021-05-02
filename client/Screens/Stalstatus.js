import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useApi } from '../services';
import { Circle, Rectangle } from '../Components';

import Back from '../assets/images/back';
import Menu from '../assets/images/menu';

const StalstatusScreen = ({ navigation }) => {
  // states
  const [dimensions, setDimensions] = useState({ window, screen });
  const [floor, setFloor] = useState();
  const [floorWidth, setFloorWidth] = useState();
  const [floorLength, setFloorLength] = useState();
  const [rectangleScale, setRectangleScale] = useState();
  const [tags, setTags] = useState();

  // api calls
  const {
    farmId,
    getFarm,
    getFarmTags,
  } = useApi();

  // window and screen dimension settings
  const window = Dimensions.get("window");
  const screen = Dimensions.get("screen");

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  // functions
  // gets all tags of a farm with given status
  const handleStatus = async (status) => {
    setTags(null);
    const temp = await getFarmTags(farmId, status);
    setTags(temp);
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

          setFloorWidth(width);
          setFloorLength(length);
          setFloor({width: width, length: length});
        }

        // gets all tags of a farm
        const temp2 = await getFarmTags(farmId);
        if(temp2) setTags(temp2);
      }
      fetchdata();},
      [],
  );

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return(
    <View style={styles.wrapper}>

      {/* HEADER */}
      <View style={styles.screenHeader}>
        <TouchableOpacity style={styles.btnSymbol} activeOpacity={0.5} onPress={() => navigation.goBack()}>
          <Back/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Stalstatus</Text>
      </View>

      {/* BODY */}
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {
            floor ?
              <>
                <Text style={styles.instructionText}>Druk op een koe (cirkel) voor meer informatie</Text>
                <Rectangle scale={ rectangleScale } floor={{width: floorWidth, height: floorLength}}>
                {
                  tags && tags.map((tag, i) => {
                    return <Circle 
                      size={{width: 13, height: 13}} 
                      top={`${tag.coordinate_Y/floorLength * 100}%`} 
                      left={`${tag.coordinate_X/floorWidth * 100}%`}
                      state={tag.cow.state}
                      key={i}
                      cow={tag.cow}
                      />
                  })
                }   
                </Rectangle>
                <View style={styles.statusSection}>
                  <TouchableOpacity onPress={() => {handleStatus('Gemolken');}} style={styles.statusBox}>
                    <Text style={styles.statusTextGreen} > &#11044; Aantal gemolken </Text>
                    <Text style={styles.statusTextGreen}>{tags ? tags.filter(item => item.cow.state === 'Gemolken').length : ''}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {handleStatus('Op te halen');}} style={styles.statusBox}>
                    <Text style={styles.statusTextRed}> &#11044; Aantal op te halen </Text>
                    <Text style={styles.statusTextRed}>{tags ? tags.filter(item => item.cow.state === 'Op te halen').length : ''}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {handleStatus('Zelfde plaats');}} style={styles.statusBox}>
                    <Text style={styles.statusTextOrange}> &#11044; Meer dan 24u zelfde plaats </Text>
                    <Text style={styles.statusTextOrange}>{tags ? tags.filter(item => item.cow.state === 'Zelfde plaats').length : ''}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {handleStatus('Geen status');}} style={styles.statusBox}>
                    <Text style={styles.statusTextBlack}> &#11044; Geen status </Text>
                    <Text style={styles.statusTextBlack}>{tags ? tags.filter(item => item.cow.state === 'Geen status').length : ''}</Text>
                  </TouchableOpacity>
                </View>
              </>
            : 
            <View>
              <Text style={styles.instructionText}>Ga naar het onderdeel 'plattegrond stal' om een stal aan te maken</Text>
            </View>
          }
        </View>
      </ScrollView>

      {/* FOOTER */}
      <TouchableOpacity style={styles.footer} onPress={(ev)=>{navigation.navigate('Home')}}>
        <Menu/>
      </TouchableOpacity>

    </View>
  )
};

let colors = {
  'dark-brown': '#806854',
  'brown': '#B39C7D',
  'light-brown': '#F0EBD8',
  'white': '#FDFFF5',
  'black': '#000000',
  'grey': '#E8E8E8',
  'dark-grey': '#555555',

  'green': '#A8BAA9',
  'red': '#B46E66', 
  'orange': '#E9B873',
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

  floor: {
    overflow:'hidden',
  },

  statusSection: {
    marginTop: 20,
  },

  statusBox: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginVertical: 5,
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
    height: 50,
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: colors['light-brown'],
    color: colors['dark-brown'],
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

  statusTextGreen: {
    fontSize: 16,
    color: colors['green'],
  },

  statusTextRed: {
    fontSize: 16,
    color: colors['red'],
  },

  statusTextOrange: {
    fontSize: 16,
    color: colors['orange'], 
  },

  statusTextBlack: {
    fontSize: 16,
    color: colors['dark-grey'],
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

export default StalstatusScreen;