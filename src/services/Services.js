import {Platform} from 'react-native';
import axios from 'axios';
export default class Services {
  static postMethod = (url, postBody, config) => {
    return new Promise((resolve, reject) => {
      axios
        .post(url, postBody, {
          headers: config,
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  static getMethod = (url, acessToken) => {
    const AuthStr = 'Bearer ' + acessToken;
    let config = {Authorization: AuthStr};
    return new Promise(async (resolve, reject) => {
      await axios
        //.get(url, {headers: config})
        .get(url)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}
