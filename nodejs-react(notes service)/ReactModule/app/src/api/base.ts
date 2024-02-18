import axios from 'axios';

import { MOCK_API_ADDRESS } from './constants';

export const apiClient = axios.create({
  baseURL: MOCK_API_ADDRESS,
  withCredentials: true,
});
