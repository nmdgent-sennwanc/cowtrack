import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useApi, Utils } from '../services';
import CalendarPicker from 'react-native-calendar-picker';

import Back from '../assets/images/back';
import Menu from '../assets/images/menu';

const DatefilterScreen = ({ navigation }) => {
  // states
  const [ selectedId, setSelectedId ] = useState();

  // api calls
  const { 
    setDateFilter,
  } = useApi();

  // init value for max calendar date
  const maxDate = new Date(); // Today

  // functions
  // sets date to other format
  const onDateChange = (date) =>{
    const newFormatDate = Utils.formatDate(date._d, true);
    setSelectedId(newFormatDate);
    setDateFilter(date._d);
  };
   
  return (
    <View style={styles.wrapper}>

       {/* HEADER */}
       <View style={styles.headerWrapper}>
        <View style={styles.screenHeader}>
          <TouchableOpacity style={styles.btnSymbol} activeOpacity={0.5} onPress={() => navigation.goBack()}>
            <Back/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Datum</Text>
        </View>
      </View>

      {/* BODY */}
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View>
            <CalendarPicker
              startFromMonday={true}
              maxDate={maxDate}
              todayBackgroundColor="#f0ebd8"
              selectedDayColor="#806854"
              selectedDayTextColor="#FFFFFF"
              todayTextStyle={{
                color: '#806854',
              }}
              weekdays={['Ma', 'Di', 'Woe', 'Don', 'Vrij', 'Zat', 'Zon']}
              months={['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December']}
              previousTitle="Vorige"
              nextTitle="Volgende"
              textStyle={{
                color: '#806854',
              }}
              selectYearTitle="Selecteer jaar"
              selectMonthTitle="Selecteer maand"
              scaleFactor={450}
              headerWrapperStyle={{
                width: '100%'
              }}
              onDateChange={onDateChange}
            />
            <View style={styles.selectedDateBox}>
              <Text style={styles.selectedDateString}>Geselecteerde datum: { selectedId ? selectedId : <></>}</Text>
            </View>
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

  selectedDateBox: {
    marginTop: 20,
    alignItems: 'center',
  },

  selectedDateString: {
    color: colors['dark-brown'],
    fontSize: 12,
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

export default DatefilterScreen;
    