import React from 'react';
import AppRouter from './src/routers/AppRouter';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './src/redux/reducers/combinedReducers';
import {Provider} from 'react-redux';

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
