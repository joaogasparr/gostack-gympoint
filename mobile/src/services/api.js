import { APP_URL } from 'react-native-dotenv';

import axios from 'axios';

const api = axios.create({
  baseURL: APP_URL,
});

export default api;
