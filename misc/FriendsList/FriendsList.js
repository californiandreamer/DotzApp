import React, {useState} from 'react';
import s from './FriendsList.s';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import AvatarPlaceholderImg from '../../assets/images/avatar.jpg';
import cancelImg from '../../assets/icons/ic-close2.png';
import {profileImageUrl} from '../../api/api';

const FriendsList = ({
  list,
  type,
  showProfileAction,
  showChatAction,
  approveFrendshipAction,
}) => {
  const [isConfrimDisabled, setIsConfrimDisabled] = useState(false);

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      {list.map((item) => (
        <View style={s.item} key={item.app_user_id}>
          <View style={s.topRow}>
            <Image
              style={s.image}
              source={
                item.profile && item.profile.profile_img_ava
                  ? {
                      uri: `${profileImageUrl}/${item.profile.profile_img_ava}`,
                    }
                  : AvatarPlaceholderImg
              }
            />
            <Text style={s.name}>{item.app_user_name || item.author_name}</Text>
          </View>
          <View style={s.bottomRow}>
            {type === 'Friends' ? (
              <TouchableOpacity
                style={s.chatButton}
                activeOpacity={0.8}
                onPress={() =>
                  showChatAction('Dialog', {
                    id: item.app_user_id || item.author_id,
                    name: item.app_user_name || item.author_name,
                  })
                }>
                <Text style={s.buttonText}>Chat</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  s.confirmButton,
                  {opacity: isConfrimDisabled ? 0.7 : 1},
                ]}
                disabled={isConfrimDisabled}
                activeOpacity={0.8}
                onPress={() => {
                  approveFrendshipAction(item.app_user_id || item.author_id);
                  setIsConfrimDisabled(true);
                }}>
                <Text style={s.buttonText}>Confirm</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={s.profileButton}
              activeOpacity={0.8}
              onPress={() =>
                showProfileAction('Profile', {
                  id: item.app_user_id,
                  name: item.app_user_name,
                  activities: item.activities,
                  city: item.profile.profile_city,
                  posts: item.profile.posts,
                  currentActivity: item.profile.profile_current_act,
                  image: item.profile.profile_img_ava,
                })
              }>
              <Text style={s.buttonText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.cancelButton} activeOpacity={0.8}>
              <Image style={s.buttonImage} source={cancelImg} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default FriendsList;
