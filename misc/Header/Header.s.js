import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    minHeight: 66,
    padding: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  button: {
    width: 30,
  },
  image: {
    width: 30,
    height: 30,
  },
  title: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 24,
    color: '#fff',
  },
});
