import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSucess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const { data } = yield call(api.get, `students/${id}`);

    yield put(signInSucess(data));
  } catch (err) {
    Alert.alert('Autenticação', err.response.data.error);
    yield put(signInFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
