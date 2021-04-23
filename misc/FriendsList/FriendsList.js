import React, {useState} from 'react';
import s from './FriendsList.s';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import AvatarPlaceholderImg from '../../assets/images/avatar.jpg';
import cancelImg from '../../assets/icons/ic-close2.png';
import {profileImageUrl} from '../../api/api';

const FriendsList = ({
  list,
  type,
  refreshing,
  showProfileAction,
  showChatAction,
  approveFrendshipAction,
  onRefresh,
}) => {
  const [disabledButtons, setDisabledButtons] = useState([]);

  const checkIsButtonDisabled = (id) => {
    const isInclude = disabledButtons.includes(id);
    return isInclude;
  };

  console.log('list', list);
  return (
    <ScrollView
      style={s.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {list.map((item) => (
        <View style={s.item} key={item.app_user_id || item.author_id}>
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
            {type === 'Teammates' ? (
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
                  {
                    opacity: checkIsButtonDisabled(
                      item.app_user_id || item.author_id,
                    )
                      ? 0.7
                      : 1,
                  },
                ]}
                activeOpacity={0.8}
                disabled={checkIsButtonDisabled(
                  item.app_user_id || item.author_id,
                )}
                onPress={() => {
                  approveFrendshipAction(item.app_user_id || item.author_id);
                  setDisabledButtons((prev) => [
                    ...prev,
                    item.app_user_id || item.author_id,
                  ]);
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
                  posts: item.posts,
                  currentActivity: item.profile.profile_current_act,
                  image: item.profile.profile_img_ava,
                  verified: item.profile.profile_verified,
                  club: item.profile.profile_club,
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
