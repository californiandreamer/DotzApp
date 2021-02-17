import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    width: '100%',
    padding: 16,
    borderColor: '#3A454B',
    borderWidth: 2,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontFamily: 'Gilroy-SemiBold',
    textTransform: 'uppercase',
    color: '#FECE03',
  },
  item: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0,
    borderColor: '#3A454B',
    borderWidth: 2,
  },
  itemImg: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  itemTitle: {
    width: '50%',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    color: '#F0FCFF',
  },
  checkBox: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#fff',
  },
  checkBoxImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
