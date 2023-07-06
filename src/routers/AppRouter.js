import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView, StyleSheet} from 'react-native';
import Home from '../screens/Home';
import Login from '../screens/Login';
import SignIn from '../screens/SignIn';
import Map from '../screens/Map';
import Pagination from '../screens/Pagination';

const AppRouter = props => {
  const Stack = createStackNavigator();

  return (
    <SafeAreaView style={styles.conatinerView}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#0080ff',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          {/* <Stack.Screen name="Login" component={Login} /> */}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Map" component={Map} />
          {/* <Stack.Screen name="Pagination" component={Pagination} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatinerView: {
    flex: 1,
  },
});
export default AppRouter;
