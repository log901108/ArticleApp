import axios from 'axios';

const baseURL = __DEV__
  ? 'http://localhost:1337'
  : 'https://articles.example.com';

const client = axios.create({
  baseURL,
});

export function applyToken(jwt: string) {
  client.defaults.headers.common.Authorization = `Bearer ${jwt}`;
}

export function clearToken() {
  client.defaults.headers.common.Authorization = undefined;
}

export default client;
