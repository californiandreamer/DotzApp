import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    elevation: 5,
  },
  wrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    height: '100%',
    backgroundColor: '#141F25',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingBottom: 120,
  },
  scrollBox: {
    padding: 20,
  },
  responder: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  responderImg: {
    width: 100,
    height: 8,
    resizeMode: 'contain',
  },
  imageOuter: {
    padding: 7,
    borderWidth: 7,
    borderColor: '#37464F',
    borderRadius: 78,
  },
  image: {
    width: 78,
    height: 78,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#fff',
  },
  buttonsRow: {
    width: '100%',
    maxWidth: 500,
    height: 39,
    marginVertical: 20,
    flexDirection: 'row',
  },
  item: {
    width: '33.33333%',
    height: '100%',
    paddingHorizontal: 4,
  },
  text: {
    width: '100%',
    marginVertical: 10,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#fff',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    position: 'relative',
  },
  leftMapButton: {
    width: 109,
    height: 39,
    position: 'absolute',
    left: 16,
    bottom: 26,
    zIndex: 10,
  },
  rightMapButton: {
    width: 109,
    height: 39,
    position: 'absolute',
    right: 16,
    bottom: 26,
    zIndex: 10,
  },
});
