import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import {API_URLS} from '../utils/Constants';
import Services from '../services/Services';
import Loader from '../components/Loader';

export default function Pagination({navigation, route}) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [isloading, setisLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getData = () => {
    setisLoading(true);
    var url = API_URLS.page_url + 'page=' + page + '&' + 'size=10';
    console.log(url);
    Services.getMethod(url, '')
      .then(response => {
        setisLoading(false);
        if (response.data) {
          setData(prevData => [...prevData, ...response.data.data]);
        }
      })
      .catch(error => {
        setisLoading(false);
        console.log('checking for Error Api response ', error);
      });
  };
  const onPlus = () => {
    setCount(prev => prev + 1);
  };
  const onMinus = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.title}>Count : {count}</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={onPlus}>
          <Text style={styles.title}>Plus</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onMinus}>
          <Text style={styles.title}>Minus</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        onEndReachedThreshold={0.1}
        onEndReached={() => setPage(page + 1)}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.item}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {isloading ? <Loader color="white" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    margin: 10,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 130,
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#cccccc',
    borderRadius: 5,
    margin: 7,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    margin: 10,
  },
  subtitle: {
    fontSize: 20,
    margin: 10,
    color: '#999999',
  },
});
