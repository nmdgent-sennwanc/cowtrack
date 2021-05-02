import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useApi } from '../services';
import { Modal } from '../Components';
import { Table, TableWrapper, Rows, Col } from 'react-native-table-component';

import Back from '../assets/images/back';
import Menu from '../assets/images/menu';

const ConnectedtagScreen = ({ route, navigation }) => {
  // states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState('');

  // api calls
  const { 
    updateTag,
    deleteCow,
  } = useApi();
  
  // init values for table
  const tableTitle= ['Koenummer', 'Tag'];
  const tableData = [
    [route.params.cow.cownumber],
    [route.params.tagId],
  ];

  // functions
  // updates tag with tagId and cowId
  const handlePress = async () => {
    try {
      const temp = await updateTag(route.params.tagId, route.params.cow.id);
      if(temp){
        setModalValue('Verbinding voltooid');
        setModalVisible(true);
        navigation.navigate('Home');
      }
    } catch (error) {
      setModalValue('Verbinden mislukt, probeer opnieuw');
      setModalVisible(true);
    }
  }

  return (
    <>
      <View style={styles.wrapper}>

         {/* HEADER */}
         <View style={styles.screenHeader}>
          <TouchableOpacity style={styles.btnSymbol} activeOpacity={0.5} onPress={() => {navigation.navigate('Home'); deleteCow(route.params.cow.id);}}>
            <Back/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Voltooien</Text>
        </View>

        {/* BODY */}
        <ScrollView style={styles.container}>
          <View style={styles.content}>
          <Text style={styles.instructionText}>Samenvatting van de verbinding</Text>
            <View style={styles.screenStatus}>
              <Table>
                <TableWrapper style={styles.statusWrapper}>
                  <Col data={tableTitle} textStyle={styles.statusTitle}/>
                  <Rows data={tableData} flexArr={[1]} style={styles.statusRow} textStyle={styles.statusValue}/>
                </TableWrapper>
              </Table>
            </View>
            <TouchableOpacity style={styles.btnMid} activeOpacity={0.5} onPress={() => handlePress()}>
                <Text style={styles.btnText}>Voltooien</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* FOOTER */}
        <TouchableOpacity style={styles.footer} onPress={(ev)=>{navigation.navigate('Home'); deleteCow(route.params.cow.id);}}>
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

  screenStatus: {
    backgroundColor: colors['light-brown'],
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  statusWrapper: { 
    flexDirection: 'row' 
  },

  statusRow: {  
    height: 50  
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


export default ConnectedtagScreen;
    