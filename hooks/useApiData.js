import {getAccessToken} from './useAccessToken';

export const getHeadersWithToken = async (type) => {
  const token = await getAccessToken();

  if (type === 'urlencoded') {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
  } else {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
};
