import {Dimensions, StyleSheet} from 'react-native';

const innerWidth = Dimensions.get('screen').width;
const smallScreen = innerWidth < 350;

export default StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 50,
    paddingVertical: 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '50%',
    minHeight: 50,
    padding: 5,
  },
  inner: {
    width: '100%',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#3A454B',
  },
  activeInner: {
    width: '100%',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FECE03',
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 4,
  },
  text: {
    width: '80%',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: smallScreen ? 12 : 14,
    color: '#F0FCFF',
  },
});
