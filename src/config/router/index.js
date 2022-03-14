import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Detail, OnSplash} from '../../pages';
import {navigationRef} from '../RootNavigation';

function HomeScreen({navigation}) {
  return <Home />;
}

function OnSplashScreen() {
  return <OnSplash />;
}

function DetailScreen({route}) {
  const {username} = route.params;
  return <Detail id={username} />;
}

const Stack = createNativeStackNavigator();

function Routing() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnSplash"
          component={OnSplashScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routing;
