import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contaier: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  inner: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141F25',
    borderRadius: 16,
  },
  scrollBox: {
    width: '100%',
  },
  item: {
    width: '100%',
    padding: 24,
    borderBottomColor: '#3A454B',
  },
  text: {
    width: '100%',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#F0FCFF',
  },
});
