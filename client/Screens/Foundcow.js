import React, { useCallback, useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useApi, Utils } from '../services';
import { Circle, Rectangle } from '../Components';
import { Table, TableWrapper, Rows, Col } from 'react-native-table-component';

import Back from '../assets/images/back';
import Circle_brown from '../assets/images/circle_brown';
import Menu from '../assets/images/menu';

const FoundcowScreen = ({ route, navigation }) => {
  // states
  const [floor, setFloor] = useState();
  const [floorWidth, setFloorWidth] = useState();
  const [floorLength, setFloorLength] = useState();
  const [rectangleScale, setRectangleScale] = useState();
  const [tag, setTag] = useState();

  // api calls
  const { 
    farmId,
    getFarm,
    getCowTag,
  } = useApi();
  
  // init values for table
  const tableTitle= ['Koenummer', 'Laatste bezoek', 'Melkgift', 'Status'];
  const [tableData, setTableData] = useState([['####'],['-'],['-'],['-']]);
  
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

        // setting table data
        let tableData = []; 
        const temp2 = route.params.cow;
        const newFormatDate = Utils.formatDateWithTime(new Date(temp2.latest_visit), true);
    
        tableData.push([temp2.cownumber], [newFormatDate], [temp2.milk_yield ? temp2.milk_yield + ' L': 0 + ' L'], [temp2.state ? temp2.state : 'Geen status']);

        setTableData(tableData);

        // gets cow tag by cow id
        const temp3 = await getCowTag(temp2.id, farmId);
        if(temp3){
          setTag(temp3);
        }
      }
      fetchdata();},
      [],
  );

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <View style={styles.wrapper}>

      {/* HEADER */}
      <View style={styles.screenHeader}>
        <TouchableOpacity style={styles.btnSymbol} activeOpacity={0.5} onPress={() => navigation.goBack()}>
          <Back/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Koe gevonden</Text>
      </View>

      {/* BODY */}
      <ScrollView style={styles.container}>
        <View style={styles.content}>
        <Text style={styles.instructionText}>Samenvatting van de koe</Text>
          {
            floor ?
              <>
                <Rectangle scale={ rectangleScale } floor={{width: floorWidth, height: floorLength}}>
                  {
                    tag ? 
                      <Circle 
                      size={{width: 15, height: 15}} 
                      top={`${tag[0].coordinate_Y/floorLength * 100}%`} 
                      left={`${tag[0].coordinate_X/floorWidth * 100}%`}
                      state={'Gevonden'}
                      key={tag[0].id}
                      cow={tag[0].cow}
                      />
                    : 
                    <Text style={styles.instructionText}>Geen koe gevonden</Text>
                  }
                </Rectangle>
              </>
            : 
            <View>
              <Text style={styles.instructionText}>Ga naar grondplan om een stal aan te maken</Text>
            </View>
          }

          <View style={styles.screenSubbox}>
            <Circle_brown/>
            <Text style={styles.subboxSubtitle} >Gevonden koe</Text>
          </View>

          <View style={styles.screenStatus}>
            <Table>
              <TableWrapper style={styles.statusWrapper}>
                <Col data={tableTitle} textStyle={styles.statusTitle}/>
                <Rows data={tableData} flexArr={[1]} style={styles.statusRow} textStyle={styles.statusValue}/>
              </TableWrapper>
            </Table>
          </View>

        </View>
      </ScrollView>

      {/* FOOTER */}
      <TouchableOpacity style={styles.footer} onPress={(ev)=>{navigation.navigate('Home')}}>
        <Menu/>
      </TouchableOpacity>
  
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
  },

  screenMap: {
    backgroundColor: colors['grey'],
    height: 200,
    width: '100%',
  },

  screenSubbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20, 
    marginBottom: 10,
  },

  screenStatus: {
    backgroundColor: colors['light-brown'],
    width: '100%',
    paddingHorizontal: 20,
  },

  statusWrapper: { 
    flexDirection: 'row' 
  },

  statusRow: {  
    height: 30 
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

  subboxSubtitle: { 
    color: colors['dark-brown'],
    fontSize: 16,
    marginLeft: 10,
  },

  statusTitle: {
    color: colors['dark-brown'],
  },

  statusValue: { 
    textAlign: 'right', 
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

export default FoundcowScreen;
  