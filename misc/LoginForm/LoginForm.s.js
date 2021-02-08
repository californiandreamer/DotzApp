import {Dimensions, StyleSheet} from 'react-native';

const innerWidth = Dimensions.get('screen').width;
const smallScreen = innerWidth < 350;

export default StyleSheet.create({
  form: {
    width: '100%',
    paddingVertical: 10,
    paddingBottom: 32,
  },
  wrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    marginBottom: 8,
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'Gilroy-SemiBold',
  },
  input: {
    width: '100%',
    height: 56,
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#3A454B',
    borderRadius: 16,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: smallScreen ? 14 : 18,
    color: '#000',
  },
  text: {
    width: '100%',
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
  },
  textBold: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 14,
  },
  googleBtn: {
    width: 56,
    height: 56,
  },
  googleImg: {
    width: 56,
    height: 56,
  },
});
