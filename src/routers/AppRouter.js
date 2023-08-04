import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  BackHandler,
  Alert
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TAB_NAMES} from '../utils/Constants';
import {Colors} from '../themes/Colors';
import { Font } from '../themes/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/Home';
import Login from '../screens/Login';
import SignIn from '../screens/SignIn';
import Map from '../screens/Map';
import Pagination from '../screens/Pagination';


const AppRouter = props => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const handleBackButton = async () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit the app ?',
      [
        {
          text: 'No',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Yes',
          onPress: async () => {
            await exitApp();
          },
        },
      ],
      { cancelable: false },
    );
  };


  function MainTabNavigator() {

    return (

      <Tab.Navigator

        backBehavior="history"

        screenOptions={({route}) => ({

          headerShown: false,

          backBehavior: 'order',

          tabBarActiveTintColor: 'white',

          tabBarInactiveTintColor: 'gray',

          tabBarActiveBackgroundColor: Colors.primaryColor,

          tabBarInactiveBackgroundColor: Colors.primaryColor,

          // tabBarLabel: route.name === 'Home' ? 'Home' : 'Loans',
          tabBarLabelStyle: {
            fontSize: 13,
            color: 'white',
            fontFamily: Font.medium,
            paddingBottom: 5,
          },
          tabBarLabelPosition: 'below-icon',
          tabBarStyle: {height: 55},
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === TAB_NAMES.Home) {
              iconName = focused ? 'home-circle' : 'home-circle-outline';
            } else if (route.name === TAB_NAMES.Pagination) {
              iconName = focused
                ? 'account-settings'
                : 'account-settings-outline';
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}>

        <Tab.Screen
          name={TAB_NAMES.Home}
          component={HomeStack}
          listeners={{
            focus: () =>
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              ),
            blur: () =>
              BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButton,
              ),
          }}
        />
        <Tab.Screen name={TAB_NAMES.Pagination} component={PaginationStack} />
      </Tab.Navigator>
    );
  }

  const HomeStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    );
  };

  const PaginationStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Pagination" component={Pagination} />
      </Stack.Navigator>
    );
  };

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
          <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
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