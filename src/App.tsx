import React from 'react';
import gridReducer from './features/grid'

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Root from './Root';

const store = configureStore({
  reducer: {
    grid: gridReducer,
  },
})

const App = () => {
  return (
    <Provider store={store}>
        <Root />
    </Provider>
  );
};

export default App;
