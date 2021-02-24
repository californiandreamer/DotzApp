import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {},
  wrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 28,
    color: '#fff',
  },
  title: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#fff',
  },
  image: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  timer: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 40,
    color: '#fff',
  },
  speed: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 18,
    color: '#fff',
  },
});
