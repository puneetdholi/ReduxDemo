import {SET_USER_AGE, SET_USER_NAME, INCREASE_AGE, GET_CITIES} from '../types';

const API_URL = 'https://mocki.io/v1/48419bdb-1d76-45a1-89cb-3ac3fcc7f6ca';

export const setName = name => dispatch => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  });
};

export const setAge = age => dispatch => {
  dispatch({
    type: SET_USER_AGE,
    payload: age,
  });
};

export const increaseAge = age => dispatch => {
  dispatch({
    type: INCREASE_AGE,
    payload: age,
  });
};

export const getCities = data => dispatch => {
  dispatch({
    type: GET_CITIES,
    payload: data,
  });
};
