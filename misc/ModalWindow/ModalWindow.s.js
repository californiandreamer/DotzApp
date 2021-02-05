import {Dimensions, StyleSheet} from 'react-native';

const innerWidth = Dimensions.get('window').width;
const innerHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    width: innerWidth,
    height: innerHeight,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  inner: {
    maxWidth: 300,
    maxHeight: 200,
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 16,
  },
  title: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    textAlign: 'center',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#F0FCFF',
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#F0FCFF',
  },
});
