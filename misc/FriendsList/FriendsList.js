import React from 'react';
import s from './FriendsList.s';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import GirlImg from '../../assets/images/girl.jpg';
import cancelImg from '../../assets/icons/ic-close2.png';

const FriendsList = ({type}) => {
  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.item}>
        <View style={s.topRow}>
          <Image style={s.image} source={GirlImg} />
          <Text style={s.name}>Bożenka Malina</Text>
        </View>
        <View style={s.bottomRow}>
          {type === 'Friends' ? (
            <TouchableOpacity style={s.chatButton} activeOpacity={0.8}>
              <Text style={s.buttonText}>Chat</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={s.confirmButton} activeOpacity={0.8}>
              <Text style={s.buttonText}>Confirm</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={s.profileButton} activeOpacity={0.8}>
            <Text style={s.buttonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.cancelButton} activeOpacity={0.8}>
            <Image style={s.buttonImage} source={cancelImg} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default FriendsList;
