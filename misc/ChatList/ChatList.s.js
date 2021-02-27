import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  list: {
    backgroundColor: '#141F25',
  },
  item: {
    width: '100%',
    minHeight: 65,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#404040',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10,
  },
  content: {},
  name: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 20,
    color: '#fff',
  },
  text: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 12,
    color: '#9B9B9B',
  },
  time: {
    width: '20%',
    height: '100%',
    alignItems: 'flex-end',
  },
  timeText: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 12,
    color: '#B8B8B8',
  },
});
