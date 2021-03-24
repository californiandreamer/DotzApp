import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
    zIndex: 120,
  },
  inner: {
    padding: 20,
    backgroundColor: '#141F25',
    borderRadius: 16,
  },
  closeBtn: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 121,
  },
  closeImg: {
    width: 25,
    height: 25,
  },
  wrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 20,
    color: '#fff',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    color: '#fff',
  },
  nextBtn: {
    width: 48,
    height: 48,
  },
  nextImg: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    height: 56,
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: 'transparent',
    borderColor: '#3A454B',
    borderWidth: 2,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#F0FCFF',
  },
  citySelectorBtn: {
    width: '100%',
    height: 56,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#212E36',
    borderWidth: 1,
    borderColor: '#3A454B',
    borderRadius: 16,
  },
  citySelectorBtnText: {
    fontSize: 18,
    fontFamily: 'Gilroy-Regular',
    color: '#F0FCFF',
  },
});
