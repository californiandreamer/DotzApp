import React from 'react';
import s from './StartForm.s';
import {View} from 'react-native';
import Button from '../Button/Button';

const StartForm = ({loginAction, signUpAction}) => {
  return (
    <View style={s.container}>
      <View style={s.wrapper}>
        <Button
          text={'Login'}
          style={'violet'}
          action={loginAction}
          customStyle={{marginBottom: 0}}
        />
      </View>
      <View style={s.wrapper}>
        <Button text={'Sign up'} style={'violet'} action={signUpAction} />
      </View>
    </View>
  );
};

export default StartForm;
