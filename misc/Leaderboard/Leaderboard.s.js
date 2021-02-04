import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 20,
  },
  wrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    marginTop: 10,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#fff',
  },
  item: {
    width: '100%',
    paddingVertical: 8,
  },
  inner: {
    width: '100%',
    height: 70,
    padding: 8,
    backgroundColor: '#999',
    borderRadius: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 61,
    height: 61,
    resizeMode: 'contain',
    borderRadius: 61,
  },
  text: {
    paddingHorizontal: 15,
  },
  name: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#040415',
  },
  result: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    color: '#040415',
  },
  place: {
    paddingHorizontal: 15,
  },
  placeText: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 30,
    color: '#040415',
  },
});
