import {useRoute} from '@react-navigation/native';
import {View, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState, useRef} from 'react';
import ChatAdminHeader from './ChatAdminHeader';
import {s} from '../style';
import ChatAdminBubble from './ChatAdminBubble';
import ChatAdminInput from './ChatAdminInput';
export default function ChatAberto() {
  const route = useRoute();
  const chat_id = route?.params?.chat_id;
  const profile_photo = route?.params?.profile_photo;
  const nome_chat = route?.params?.nome_chat;
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    //console.log(user);
    const unsubscribeListener = firestore()
      .collection('messages')
      .doc(chat_id)
      .collection('chat-room')
      .orderBy('createdAt', 'asc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();
          //   console.log('DOC ID: ' + doc.id);
          //console.log(doc.data());
          const data = {
            _id: doc.id,
            ...firebaseData,
          };

          return data;
        });
        setMessages(messages);
      });
    return () => unsubscribeListener();
  }, []);
  useEffect(() => {
    // Rolar para o final da lista sempre que messages for atualizado
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  return (
    <View style={s.main}>
      <ChatAdminHeader profile_photo={profile_photo} nome_chat={nome_chat} />

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({item}) => <ChatAdminBubble data={item} />}
        keyExtractor={item => item._id}
      />

      <ChatAdminInput chat_id={chat_id} />
    </View>
  );
}
