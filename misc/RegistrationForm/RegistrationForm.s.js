import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  wrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    backgroundColor: '#C4C4C4',
    borderRadius: 150,
    position: 'relative',
    zIndex: 1,
  },
  avatarImg: {
    width: 150,
    height: 150,
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 150,
  },
  editAvatarBtn: {
    width: 32,
    height: 32,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  },
  editAvatarImg: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  form: {
    width: '100%',
  },
  title: {
    width: '100%',
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    color: '#FECE03',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 56,
    padding: 16,
    backgroundColor: '#212E36',
    borderWidth: 1,
    borderColor: '#3A454B',
    borderRadius: 16,
    fontSize: 18,
    fontFamily: 'Gilroy-Regular',
    color: '#F0FCFF',
  },
  citySelectorBtn: {
    width: '100%',
    height: 56,
    padding: 16,
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
