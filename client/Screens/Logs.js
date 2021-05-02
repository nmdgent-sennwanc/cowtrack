import React, { useCallback, useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Table, Row, Rows } from 'react-native-table-component';
import { useApi, Utils } from '../services';

import ArrowDown from '../assets/images/arrowDown';
import ArrowUp from '../assets/images/arrowUp';
import Back from '../assets/images/back';
import Filter from '../assets/images/filter';
import Menu from '../assets/images/menu';

const LogsScreen = ({ navigation }) => {
  // states
  const [ events, setEvents ] = useState([['####', '-', '-']]);
  const [ limit, setLimit ] = useState(10);

  // api calls
  const { 
    farmId,
    getEventsSorted,
    sortFilter,
    numberFilter,
    eventFilter,
    dateFilter,
  } = useApi();
  
  // init values for table
  const tableHead = ['Koenr.', 'Gebeurtenis', 'Datum en tijd'];
  const tableNoData = ['Geen data gevonden...'];

  // functions
  // loading less logs
  const loadLess = () => {
    if (limit > 10) {
      const newLimit = limit - 10;
      setLimit(newLimit);  
    } else {
      setLimit(10);
    }
  };

  // loading more logs
  const loadMore = () => {
      const newLimit = limit + 10;
      setLimit(newLimit) ;
  };

  // init
  const initFetch = useCallback(
    (sort, limit, farmId, cowNumber, eventName, dateTime) => {
      const fetchdata = async () => {
        // gets sorted events based on filter
        const temp = await getEventsSorted(sort, limit, farmId, cowNumber, eventName, dateTime);

        // setting table data
        let tableData = []; 
        temp.forEach(dataRow => {
          const newFormatDate = Utils.formatDateWithTime(new Date(dataRow.date), true);
          tableData.push([dataRow.cow.cownumber, dataRow.eventname, newFormatDate]);
        });
        setEvents(tableData);
      }
      fetchdata();},
      [],
  )

  useEffect(() => {
    initFetch(
      sortFilter.key, 
      limit, 
      farmId, 
      numberFilter.key !== null ? numberFilter.key : '',
      eventFilter.key !== null ? eventFilter.key : '',
      dateFilter)
  }, [initFetch, sortFilter, limit, numberFilter, eventFilter, dateFilter]);

  return (
    <View style={styles.wrapper}>

      {/* HEADER */}
      <View style={styles.headerWrapper}>
        <View style={styles.screenHeader}>
          <TouchableOpacity style={styles.btnSymbol} activeOpacity={0.5} onPress={() => navigation.goBack()}>
            <Back/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Logs</Text>
        </View>
        <TouchableOpacity style={styles.btnSymbol} activeOpacity={0.5} onPress={() => navigation.navigate('Filterlogs')}>
          <Filter/>
        </TouchableOpacity>
      </View>

      {/* BODY */}
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.screenLogs}>
            <Table 
              pagination={true}
              paginationTotalRows={20}
            >
              <Row data={tableHead} flexArr={[1, 2, 2]} style={styles.logRowHead} textStyle={styles.logTitle}/>
              {events.length === 0 ? 
                <Row data={tableNoData} style={styles.logRow} textStyle={styles.logTitle}/>
              : 
                <Rows data={events} flexArr={[1, 2, 2]} style={styles.logRow} textStyle={styles.logValue}/>
              }
            </Table>
          </View>
          <View style={styles.screenPagination}>
            {
              limit !== 10 ? 
              <TouchableOpacity style={styles.pagBtnPrev} activeOpacity={0.5} onPress={() => loadLess()}>
                <ArrowUp style={styles.pagTextPrev}/>
              </TouchableOpacity> : 
              <></>
            }
            {
              events.length === limit ? 
                <TouchableOpacity style={styles.pagBtnNext} activeOpacity={0.5} onPress={() => loadMore()}>
                  <ArrowDown style={styles.pagTextPrev}/>
                </TouchableOpacity> :
                <></>
            }          
          </View>
        </View>
    </ScrollView>
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

  screenLogs: {
    width: '100%',
  },

  logRowHead: {  
    height:50,
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderColor: colors['light-brown'],
  },

  logRow: {  
    height:50,
    borderBottomWidth: 2,
    borderColor: colors['light-brown'],
  },

  screenPagination:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  // header
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    backgroundColor: colors['light-brown'],
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? 30 : 10,
    paddingBottom: 10,
  },

  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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

  logTitle: {
    color: colors['dark-brown'],
    textAlign: 'center',
  },

  logValue: { 
    textAlign: 'center', 
    color: colors['brown'],
  },

  pagTextPrev: {
    color: colors['dark-brown'],
    fontSize: 16,
  },

  pagTextNext: {
    color: colors['brown'],
    fontSize: 16,
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

  pagBtnPrev: {
    height: 50,
    width: '50%',
    backgroundColor: colors['brown'],
    borderRadius: 5,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pagBtnNext: {
    backgroundColor: colors['dark-brown'],
    height: 50,
    width: '50%',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
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

export default LogsScreen;
  