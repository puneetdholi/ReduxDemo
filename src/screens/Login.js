import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import CustomButton from '../utils/CustomButton';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setName, setAge, getCities} from '../redux/actions/loginAction';
import {API_URLS} from '../utils/Constants';
import {Images} from '../themes/Images';
import Loader from '../components/Loader';
import Services from '../services/Services';
import PushNotification, {Importance} from 'react-native-push-notification';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

const Login = ({navigation}) => {
  const [isloading, setisLoading] = useState(false);
  const {name, age} = useSelector(state => state.loginReducer);
  const dispatch = useDispatch();

  // const [name, setName] = useState('');
  // const [age, setAge] = useState('');

  useEffect(() => {
    createTable();
    getData();
    requestNotificationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Users ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);',
      );
    });
  };

  const requestNotificationPermission = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
        PermissionsAndroid.PERMISSIONS.SCHEDULE_EXACT_ALARM,
      );
      createChannels();
    } catch (err) {
      console.log(err);
    }
  };

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'test-channel',
        channelName: 'Test Channel',
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  const getData = () => {
    try {
      // AsyncStorage.getItem('UserData')
      //     .then(value => {
      //         if (value != null) {
      //             navigation.navigate('Home');
      //         }
      //     })
      apiCall();
      db.transaction(tx => {
        tx.executeSql('SELECT Name, Age FROM Users', [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            navigation.navigate('Home');
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    if (name.length == 0 || age.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        dispatch(setName(name));
        dispatch(setAge(age));
        // var user = {
        //     Name: name,
        //     Age: age
        // }
        // await AsyncStorage.setItem('UserData', JSON.stringify(user));

        // await db.transaction(async tx => {
        //   // await tx.executeSql(
        //   //     "INSERT INTO Users (Name, Age) VALUES ('" + name + "'," + age + ")"
        //   // );
        //   await tx.executeSql('INSERT INTO Users (Name, Age) VALUES (?,?)', [
        //     name,
        //     age,
        //   ]);
        // });
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const apiCall = async () => {
    setisLoading(true);
    var url = API_URLS.api_url;
    Services.getMethod(url, '')
      .then(response => {
        setisLoading(false);
        if (response.data) {
          dispatch(getCities(response.data));
          console.log('Login resonse issss...', response.data);
        }
      })
      .catch(error => {
        setisLoading(false);
        console.log('checking for Login Api response ', error);
      });
  };

  return (
    <View style={styles.body}>
      <Image style={styles.logo} source={Images.redux_img} />
      <Text style={styles.text}>Redux</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={value => dispatch(setName(value))}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        onChangeText={value => dispatch(setAge(value))}
      />
      <CustomButton title="Login" color="#1eb900" onPressFunction={setData} />
      {isloading ? <Loader color="white" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0080ff',
  },
  logo: {
    width: 150,
    height: 150,
    margin: 20,
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
    marginBottom: 100,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
});

export default Login;
