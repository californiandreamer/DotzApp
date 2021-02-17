import {getItem} from './useAsyncStorage';

export const getAccessToken = async () => {
  const token = await getItem('access_token');
  return token;
};

export const getHeadersWithAccessToken = async () => {
  const token = await getItem('access_token');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return headers;
};
