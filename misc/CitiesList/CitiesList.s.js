import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  item: {
    width: '100%',
    paddingVertical: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#3A454B',
    borderWidth: 2,
    borderTopWidth: 0,
  },
  name: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#F0FCFF',
  },
  arrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
