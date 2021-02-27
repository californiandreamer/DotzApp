import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Keyboard,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../misc/Header/Header';
import ArrowCircleImg from '../../assets/icons/ic-Arrow-Left-Circle.png';
import {getAccessToken} from '../../hooks/useAccessToken';
import {getItem} from '../../hooks/useAsyncStorage';
import {axiosGet} from '../../hooks/useAxios';
import {socketUrl} from '../../api/api';

const Dialog = ({route}) => {
  const [userId, setUserId] = useState([]);
  const [messageValue, setMessageValue] = useState('');
  const [messagesList, setMessagesList] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  console.log('messagesList', messagesList);

  let initialMessagesList = [];
  const chatHistoryPath = 'chat/getChatHistory';
  const scrollRef = useRef(null);
  const rotateValue = useRef(new Animated.Value(0)).current;
  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '0deg'],
  });

  const rotateButton = (val) => {
    Animated.timing(rotateValue, {
      toValue: val,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const interlocutorId = route.params.id;
  const interlocutorName = route.params.name;

  const getChatHistory = async () => {
    const token = await getAccessToken();
    const profile = await getItem('profile');
    const parsedProfile = JSON.parse(profile);
    const profileUserId = parsedProfile.app_user_id;
    setUserId(profileUserId);

    const headersUserToken = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const chatHistory = await axiosGet(chatHistoryPath, headersUserToken);

    for (let i = 0; i < chatHistory.length; i++) {
      const chatItem = chatHistory[i];
      const senderId = chatItem.author_id;
      const receiverId = chatItem.msg_reciever_id;

      if (senderId === interlocutorId || receiverId === interlocutorId) {
        initialMessagesList.push(chatItem);
      }
    }

    setMessagesList(initialMessagesList);
    connectToSocket(token);
  };

  const connectToSocket = async (token) => {
    const conn = new WebSocket(`${socketUrl}${token}`);
    let mounted = true;

    conn.onmessage = (e) => {
      const data = e.data;
      const parsedData = JSON.parse(data);
      if (parsedData.hasOwnProperty('message')) {
        setMessagesList((prev) => [...prev, {...parsedData}]);
      }
    };
  };

  const sendMessage = async () => {
    const token = await getAccessToken();
    const conn = new WebSocket(`${socketUrl}${token}`);
    const timeStamp = +new Date();
    const stringedTimeStamp = JSON.stringify(timeStamp);
    const date = new Date().toISOString();

    conn.onopen = (e) => {
      const obj = {
        msg: messageValue,
        msg_reciever_id: interlocutorId,
        msg_timestamp_sent: stringedTimeStamp,
        msg_time_sent: date,
      };
      conn.send(JSON.stringify(obj));
    };

    setMessagesList([
      ...messagesList,
      {
        msg_id: generateMessageId(),
        author_id: userId,
        author_name: interlocutorName,
        message: messageValue,
        msg_reciever_id: interlocutorId,
        msg_timestamp_sent: stringedTimeStamp,
        msg_time_sent: date,
      },
    ]);
    setMessageValue('');
    scrollingDown();
  };

  const generateMessageId = () => {
    const listLenght = messagesList.length;
    const lastItem = messagesList[listLenght - 1];
    const idValue = lastItem.msg_id;
    const parsedIdValue = parseInt(idValue);
    const newId = parsedIdValue + 1;
    const stringedNewId = newId.toString();
    return stringedNewId;
  };

  const handleScroll = () => {
    Keyboard.dismiss();
  };

  const scrollingDown = async () => {
    setTimeout(() => {
      scrollRef.current.scrollToEnd({animated: true});
    }, 0);
  };

  useEffect(() => {
    getChatHistory();
  }, []);

  useEffect(() => {
    scrollingDown();
  }, [messagesList]);

  useEffect(() => {
    if (messageValue !== '') {
      rotateButton(1);
      setIsButtonDisabled(false);
    } else {
      rotateButton(0);
      setIsButtonDisabled(true);
    }
  }, [messageValue]);

  const renderInputArea = (
    <View style={s.inputArea}>
      <TextInput
        style={s.input}
        value={messageValue}
        placeholder="Message here..."
        onFocus={() => {
          rotateButton(1);
        }}
        onEndEditing={() => (messageValue === '' ? rotateButton(0) : null)}
        onChange={(e) => {
          e.persist();
          setMessageValue(e.nativeEvent.text);
        }}
      />
      <TouchableOpacity
        style={s.button}
        activeOpacity={0.8}
        disabled={isButtonDisabled}
        onPress={() => sendMessage()}
        // onPress={() => sendMessage()}
      >
        <Animated.Image
          style={[
            s.buttonImg,
            {transform: [{rotate: spin}], opacity: isButtonDisabled ? 0.7 : 1},
          ]}
          source={ArrowCircleImg}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={s.container}>
      <Header title={interlocutorName} style={'orange'} />
      <View style={s.wrapper}>
        <View style={s.chat}>
          <ScrollView
            style={s.messages}
            showsVerticalScrollIndicator={false}
            ref={scrollRef}
            onScroll={handleScroll}>
            {messagesList.map((message) => (
              <View
                style={[
                  s.item,
                  message.author_id === userId ? s.user : s.interlocutor,
                ]}
                key={message.msg_id}>
                <View style={s.inner}>
                  <Text style={s.text}>{message.message}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        {renderInputArea}
      </View>
    </View>
  );
};

export default Dialog;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#141F25',
  },
  wrapper: {
    height: '100%',
    paddingTop: 0,
    marginTop: 66,
  },
  chat: {
    width: '100%',
    height: '100%',
    paddingBottom: 50,
  },
  messages: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 90,
  },
  item: {
    width: '100%',
    paddingVertical: 8,
  },
  inner: {
    maxWidth: '75%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    // borderBottomLeftRadius: 0,
  },
  interlocutor: {
    alignItems: 'flex-start',
  },
  user: {
    alignItems: 'flex-end',
  },
  inputArea: {
    height: 50,
    paddingHorizontal: 3,
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 82,
    zIndex: 1,
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '85%',
    paddingLeft: 16,
    fontFamily: 'Gilroy-Regular',
  },
  button: {
    width: 50,
  },
  disabled: {
    width: 50,
    opacity: 0.7,
  },
  buttonImg: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
