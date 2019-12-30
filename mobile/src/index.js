import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import '~/config/ReactotronConfig';

import App from '~/App';
import store from '~/store';

export default function Index() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <App />
    </Provider>
  );
}
