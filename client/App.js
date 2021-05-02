import 'react-native-gesture-handler';
import * as React from 'react';
import { useFonts } from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApiProvider } from './services';

import {
  LoginScreen,
  HomeScreen,
  StalstatusScreen,
  FloorplanScreen,
  SetAnchorsScreen,
  SearchcowScreen,
  FoundcowScreen,
  AddcowScreen,
  AddtagScreen,
  ConnecttagScreen,
  ConnectedtagScreen,
  LogsScreen,
  FilterlogsScreen,
  SortfilterScreen,
  NumberfilterScreen,
  EventfilterScreen,
  DatefilterScreen
} from './Screens';

const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ApiProvider>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />

          <Stack.Screen
            name="Stalstatus"
            component={StalstatusScreen}
          />

          <Stack.Screen
            name="Floorplan"
            component={FloorplanScreen}
          />

          <Stack.Screen
            name="SetAnchors"
            component={SetAnchorsScreen}
          />

          <Stack.Screen
            name="Searchcow"
            component={SearchcowScreen}
          />

          <Stack.Screen
            name="Foundcow"
            component={FoundcowScreen}
          />

          <Stack.Screen
            name="Addcow"
            component={AddcowScreen}
          />

          <Stack.Screen
            name="Addtag"
            component={AddtagScreen}
          />

          <Stack.Screen
            name="Connecttag"
            component={ConnecttagScreen}
          />

          <Stack.Screen
            name="Connectedtag"
            component={ConnectedtagScreen}
          />

          <Stack.Screen
            name="Logs"
            component={LogsScreen}
          />

          <Stack.Screen
            name="Filterlogs"
            component={FilterlogsScreen}
          />

          <Stack.Screen
            name="Sortfilter"
            component={SortfilterScreen}
          />

          <Stack.Screen
            name="Numberfilter"
            component={NumberfilterScreen}
          />

          <Stack.Screen
            name="Eventfilter"
            component={EventfilterScreen}
          />

          <Stack.Screen
            name="Datefilter"
            component={DatefilterScreen}
          />
        </Stack.Navigator>
      
      </NavigationContainer>
    </ApiProvider>
  );
};

export default App;