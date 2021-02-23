import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOuter: {
    width: 94,
    height: 94,
    padding: 12,
    borderWidth: 7,
    borderColor: '#37464F',
    borderRadius: 78,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#fff',
  },
});
