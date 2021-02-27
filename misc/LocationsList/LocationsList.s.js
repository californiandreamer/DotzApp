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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  divider: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  number: {
    marginRight: 10,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#F0FCFF',
  },
  name: {
    maxWidth: 120,
    textAlign: 'left',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#F0FCFF',
  },
  stars: {
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starImg: {
    width: 20,
    height: 20,
    marginHorizontal: 1,
    resizeMode: 'contain',
  },
  arrow: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});
