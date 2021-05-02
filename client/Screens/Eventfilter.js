import * as React from 'react';
import { Platform, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useApi } from '../services';

import Back from '../assets/images/back';
import Menu from '../assets/images/menu';
import Select from '../assets/images/select';

const EventfilterScreen = ({ navigation }) => {
  // api calls
  const { 
    setEventFilter,
    eventFilter,
  } = useApi();
  
  // init values for table
  const options = [
      {key: 'in melkrobot', name: 'In melkrobot'},
      {key: 'aan voederhek', name: 'Aan voederhek'},
  ];

  // flatlist-item
  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.listRow}>
      <View style={styles.listItem}>
        <Text style={styles.itemText}>{item.name}</Text>
        {eventFilter ? item.key === eventFilter.key ? <Select/> : <></> : <></> }
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.wrapper}>

      {/* HEADER */}
      <View style={styles.headerWrapper}>
        <View style={styles.screenHeader}>
          <TouchableOpacity style={styles.btnSymbol} activeOpacity={0.5} onPress={() => navigation.goBack()}>
            <Back/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Gebeurtenis</Text>
        </View>
      </View>

      {/* BODY */}
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <FlatList
            data={options}
            renderItem={
              ({item}) => <Item item={item} onPress={() => setEventFilter({key: item.key, name: item.name})} />
            }
          />
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
  },

  listRow: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: colors['light-brown'],
    padding: 10,
  },

  listItem : {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  itemText: {
    color: colors['dark-brown'],
    fontSize: 16,
    textTransform: 'uppercase',
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

export default EventfilterScreen;
    