import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 66,
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
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 24,
    color: '#fff',
  },
  quantity: {
    width: 16,
    height: 16,
    backgroundColor: '#FF0000',
    borderRadius: 16,
    position: 'absolute',
    left: -5,
    bottom: -5,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 9,
    color: '#fff',
  },
});
