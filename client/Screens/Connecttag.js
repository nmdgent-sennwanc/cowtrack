import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useApi } from '../services';

import Back from '../assets/images/back';
import Menu from '../assets/images/menu';
import Select from '../assets/images/select';

const ConnecttagScreen = ({ route, navigation }) => {
  // states
  const [ tags, setTags ] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  
  // api calls
  const { 
    getEmptyTags,
  } = useApi();

  // init
  const initFetch = useCallback(
    () => {
      const fetchdata = async () => {
        // gets all unused tags
        let temp = await getEmptyTags();
        temp = temp.map((tag) =>{
          return {key: tag.id.toString(), name: `Tag-${tag.id}`};
        });
        
        setTags(temp);
      }
      fetchdata();},
      [],
  )

  useEffect(() => {
    initFetch();
  }, [initFetch, selectedId, route.params]);
  
  // flatlist-item
  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.listRow}>
      <View style={styles.listItem}>
        <Text style={styles.itemText}>{item.name}</Text>
        {item.key === selectedId ? <Select/> : <></>}
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.wrapper}>

      {/* HEADER */}
      <View style={styles.screenHeader}>
        <TouchableOpacity style={styles.btnSymbol} activeOpacity={0.5} onPress={() => navigation.goBack()}>
          <Back/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kies tag</Text>
      </View>

      {/* BODY */}
      <ScrollView style={styles.container}>
        <View style={styles.content}>
        <Text style={styles.instructionText}>Kies een tag of voeg een nieuwe toe</Text>
          { 
          tags.length !== 0 ? 
            <FlatList
              style={styles.list}
              data={tags}
              renderItem={
                ({item}) => <Item item={item} onPress={() => setSelectedId(item.key)} />
              }
            /> : <Text style={styles.instructionText}>Voeg nieuwe tags toe!</Text>
          }
          <TouchableOpacity style={styles.btnMid} activeOpacity={0.5} onPress={() => navigation.navigate('Addtag')}>
              <Text style={styles.btnText}>Tag toevoegen</Text>
          </TouchableOpacity>
          {
            selectedId ? 
              <TouchableOpacity style={styles.btnDark} activeOpacity={0.5} onPress={() => navigation.navigate('Addcow', {tagId: selectedId})}>
                  <Text style={styles.btnText}>Volgende stap</Text>
              </TouchableOpacity> : <></>
          }
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
  
  list: {
    marginBottom: 20,
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

export default ConnecttagScreen;
    