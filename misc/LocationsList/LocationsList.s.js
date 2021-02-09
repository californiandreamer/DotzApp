import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 16,
    backgroundColor: '#141F25',
  },
  wrapper: {
    width: '100%',
    paddingVertical: 10,
  },
  title: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#F0FCFF',
  },
  item: {
    width: '100%',
    paddingVertical: 20,
    borderBottomColor: '#3A454B',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  number: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#F0FCFF',
  },
  name: {
    maxWidth: 120,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#F0FCFF',
  },
  stars: {
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starImg: {
    width: 24,
    height: 24,
    marginHorizontal: 1,
    resizeMode: 'contain',
  },
  arrow: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});
