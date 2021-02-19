import {getAccessToken} from '../hooks/useAccessToken';
import {getItem} from '../hooks/useAsyncStorage';

export const mapBoxToken =
  'pk.eyJ1Ijoicm9hZHNpZGUiLCJhIjoiY2trbDZleWwzMTdodTJudGQ5NGMzN2hieCJ9.CpLd84FmeqLPRDSTt6m6rw';

export const url = 'http://admin.officialdotzapp.com/api';

export const activitiesImageUrl =
  'http://admin.officialdotzapp.com/uploads/activities/';

export const profileImageUrl =
  'http://admin.officialdotzapp.com/uploads/profiles/';

export const clientId = 'ZPwcGbFGFFjMZ34hCM4r4XEyAL8SCL';

export const clientSecret = '7wP4je=NeR3&zJaJz3#35#bHZ?UA+gP-8EGHcPT-';

const basicAuth =
  'Basic WlB3Y0diRkdGRmpNWjM0aENNNHI0WEV5QUw4U0NMOjd3UDRqZT1OZVIzJnpKYUp6MyMzNSNiSFo/VUErZ1AtOEVHSGNQVC0=';

export const headersFormData = {
  Authorization: basicAuth,
  'Content-Type': 'multipart/form-data',
};

export const headersUrlencoded = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

// export const headersUserToken = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };
