import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    height: 50,
    backgroundColor: '#F18303',
    // borderWidth: 1,
    // borderColor: '#E8E8E8',
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'relative',
    zIndex: 0,
  },
  tab: {
    width: '50%',
    height: 50,
    padding: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  inner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#fff',
  },
  activeText: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#F18303',
  },
});
