import { default as React, useContext, createContext, useState} from 'react';
import {Utils} from './utils';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
  const baseURL = `http://cmsdev-sennewancour.be:3000`;
  
  // STATES
  const [farmId, setFarmId] = useState(1);

  const [sortFilter, setSortFilter] = useState({key: 'date', name: 'Datum'});
  const [numberFilter, setNumberFilter] = useState({key: null, name: null});
  const [eventFilter, setEventFilter] = useState({key: null, name: null});
  const [dateFilter, setDateFilter] = useState(null);


  // JWT TOKEN 
  const getJWTtoken = async () => {
    try {
      const value = await AsyncStorage.getItem('@jwtToken')
      if(value !== null) {
        // value previously stored
        return value;
      }
    } catch(e) {
      // error reading value
      return '';
    }
  }

  // API CALLS
  const getFarms = async () => {
      let url = `${baseURL}/farms`;

      const myHeaders = {
        'Authorization': `Bearer ${getJWTtoken}`,
      }
  
      const options = {
        method: 'GET',
        headers: myHeaders,
      };
  
      const response = await fetch(url, options);
      let data = await response.json();
      return data;
  };

  const updateFarm = async (farmId, farmWidth, farmLength) => {
    let url = `${baseURL}/farms/${farmId}`;

    const body ={
      'farmId': farmId,
      'farmWidth': farmWidth,
      'farmLength': farmLength,
    }

    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getJWTtoken}`,
    }

    const options = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(body),
    };

    const response = await fetch(url, options);
    let data = await response.json();
    return data;
  }

  const getFarm = async (farmId) => {
    let url = `${baseURL}/farms/${farmId}`;

    const myHeaders = {
      'Authorization': `Bearer ${getJWTtoken}`,
    }

    const options = {
      method: 'GET',
      headers: myHeaders,
    };

    const response = await fetch(url, options);
    let data = await response.json();
    return data;
  };

  const getCows = async (farmId) => {
      let url = `${baseURL}/cows?farmId=${farmId}`;

      const myHeaders = {
        'Authorization': `Bearer ${getJWTtoken}`,
      }
  
      const options = {
        method: 'GET',
        headers: myHeaders,
      };

      const response = await fetch(url, options);
      let data = await response.json();
      return data;
  };

  const getCow = async (cowNumber, farmId) => {
    let url = `${baseURL}/cows/${cowNumber}?farmId=${farmId}`;

    const myHeaders = {
      'Authorization': `Bearer ${getJWTtoken}`,
    }

    const options = {
      method: 'GET',
      headers: myHeaders,
    };

    const response = await fetch(url, options);
    let data = await response.json();
    return data;
  };

  const addCow = async (cowNumber, farmId) => {
    let url = `${baseURL}/cows`;

    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getJWTtoken}`,
    }

    const body ={
      'cownumber': cowNumber,
      'latest_visit' : null,
      'milk_yield' : null,
      'state' : null,
      'farm': farmId,
    }

    const options = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(body),
    };
    const response = await fetch(url, options);
    let data = await response.json();
    return data;
  }

  const deleteCow = async (cowId) => {
    let url = `${baseURL}/cows/${cowId}`;

    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getJWTtoken}`,
    }

    const options = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };
    await fetch(url, options);
  }

  const getTags = async () => {
      let url = `${baseURL}/tags`;

      const myHeaders = {
        'Authorization': `Bearer ${getJWTtoken}`,
      }
  
      const options = {
        method: 'GET',
        headers: myHeaders,
      };

      const response = await fetch(url, options);
      let data = await response.json();
      return data;
  };

  const getFarmTags = async (farmId, status) => {
    let url = `${baseURL}/tags?farmId=${farmId}&status=${status}`;

    const myHeaders = {
      'Authorization': `Bearer ${getJWTtoken}`,
    }

    const options = {
      method: 'GET',
      headers: myHeaders,
    };

    const response = await fetch(url, options);
    let data = await response.json();
    return data;
  };

  const getCowTag = async (cowId, farmId) => {
    let url = `${baseURL}/tags/one?cowId=${cowId}&farmId=${farmId}`;

    const myHeaders = {
      'Authorization': `Bearer ${getJWTtoken}`,
    }

    const options = {
      method: 'GET',
      headers: myHeaders,
    };

    const response = await fetch(url, options);
    let data = await response.json();
    return data;
  };

  const getEmptyTags = async () => {
    let url = `${baseURL}/tags/empty`;

    const myHeaders = {
      'Authorization': `Bearer ${getJWTtoken}`,
    }

    const options = {
      method: 'GET',
      headers: myHeaders,
    };

    const response = await fetch(url, options);
    let data = await response.json();
    return data;
};

  const addTag = async (cowId) => {
    let url = `${baseURL}/tags`;

    const coordinate_X = Math.random() * 20;
    const coordinate_Y = Math.random() * 50;
    const coordinate_Z = Math.random() + 1;

    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getJWTtoken}`,
    }

    const body ={
      'coordinate_X': coordinate_X,
      'coordinate_Y': coordinate_Y,
      'coordinate_Z': coordinate_Z,
    }

    const options = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(body),
    };

    const response = await fetch(url, options);
    let data = await response.json();
    return data;
  }

  const updateTag = async (tagId, cowId) => {
    let url = `${baseURL}/tags/${tagId}`;

    const body ={
      'tagId': tagId,
      'cowId': cowId,
    }

    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getJWTtoken}`,
    }

    const options = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(body),
    };

    const response = await fetch(url, options);
    let data = await response.json();
    return data;
  }
  
  const getFarmAnchors = async (farmId) => {
    let url = `${baseURL}/anchors?farmId=${farmId}`;

    const myHeaders = {
      'Authorization': `Bearer ${getJWTtoken}`,
    }

    const options = {
      method: 'GET',
      headers: myHeaders,
    };

    const response = await fetch(url, options);
    let data = await response.json();
    return data;
  };

  const updateAnchors = async (anchorId, X, Y) => {
    let url = `${baseURL}/anchors`;

    const body ={
      'anchorId': anchorId,
      'X': X,
      'Y': Y,
    }

    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getJWTtoken}`,
    }

    const options = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(body),
    };

    const response = await fetch(url, options);
    let data = await response.json();
    return data;
  }

  const getEventsSorted = async (sort, limit, farmId, cowNumber, eventName, dateTime) => {

    let url = `${baseURL}/events?sort=${sort}&limit=${limit}&farmId=${farmId}&cownumber=${cowNumber}&eventname=${eventName}`;

    const myHeaders = {
      'Authorization': `Bearer ${getJWTtoken}`,
    }

    const options = {
      method: 'GET',
      headers: myHeaders,
    };
    
    if (dateTime) {
      const formattedDate = Utils.formatDate(dateTime);
      url += `&datetime=${formattedDate}`;
    }

    const response = await fetch(url, options);
    let data = await response.json();
    return data;
  };

  return (
    <ApiContext.Provider value={{
        getFarms,
        updateFarm,
        getFarm,
        getCows,
        getCow,
        addCow,
        deleteCow,
        getTags,
        getFarmTags,
        getCowTag,
        getEmptyTags,
        addTag,
        updateTag,
        getFarmAnchors,
        updateAnchors,
        getEventsSorted,

        farmId,
        sortFilter,
        numberFilter,
        eventFilter,
        dateFilter,
        setFarmId,
        setSortFilter,
        setNumberFilter,
        setEventFilter,
        setDateFilter,
    }}>
      {children}
    </ApiContext.Provider>
  );
};

export {
  ApiContext,
  ApiProvider,
  useApi,
}