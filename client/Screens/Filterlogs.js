import * as React from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useApi , Utils}  from '../services';

import Back from '../assets/images/back';
import Menu from '../assets/images/menu';
import Next from '../assets/images/next';

const FilterlogsScreen = ({ navigation }) => {
  // api calls
  const { 
    setNumberFilter,
    setEventFilter,
    setDateFilter,

    sortFilter,
    numberFilter,
    eventFilter,
    dateFilter,
  } = useApi();

  // functions
  // sets all filters to null
  const clearFilters = () => {
    setNumberFilter({key: null, name: null});
    setEventFilter({key: null, name: null});
    setDateFilter(null);
  }

  return (
    <View style={styles.wrapper}>

      {/* HEADER */}
      <View style={styles.screenHeader}>
        <TouchableOpacity style={styles.btnSymbol} activeOpacity={0.5} onPress={() => navigation.goBack()}>
          <Back/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
      </View>

      {/* BODY */}
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View>
            <TouchableOpacity style={styles.linkBtn} activeOpacity={0.5} onPress={() => navigation.navigate('Sortfilter')}>
              <View>
                <Text style={styles.linkHead}>Sorteer op</Text>
                <Text style={styles.linkSubhead}>{sortFilter ? sortFilter.name : <></>}</Text>
              </View>
              <Next/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkBtn} activeOpacity={0.5} onPress={() => navigation.navigate('Numberfilter')}>
              <View>
                <Text style={styles.linkHead}>Koenummer</Text>
                <Text style={styles.linkSubhead}>{numberFilter ? numberFilter.name : <></>}</Text>
              </View>
              <Next/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkBtn} activeOpacity={0.5} onPress={() => navigation.navigate('Eventfilter')}>
              <View>
                <Text style={styles.linkHead}>Gebeurtenis</Text>
                <Text style={styles.linkSubhead}>{eventFilter ? eventFilter.name : <></>}</Text>
              </View>
              <Next/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkBtn} activeOpacity={0.5} onPress={() => navigation.navigate('Datefilter')}>
              <View>
                <Text style={styles.linkHead}>Datum</Text>
                <Text style={styles.linkSubhead}>{dateFilter ? Utils.formatDate(dateFilter, true) : <></>}</Text>
              </View>
              <Next/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnMid} activeOpacity={0.5} onPress={() => clearFilters()}>
              <Text style={styles.btnText}>Reset filters</Text>
            </TouchableOpacity>
          </View>
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

  linkHead: {
    color: colors['dark-brown'],
    fontSize: 16,
  }, 

  linkSubhead: {
    color: colors['brown'],
    fontSize: 12,
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

  linkBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
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

export default FilterlogsScreen;
    