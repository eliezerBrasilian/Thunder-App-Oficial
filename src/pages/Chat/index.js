import Header from './Header';
import {View, FlatList} from 'react-native';
import {s} from './style';
import Bubble from './Bubble';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../contexts/AuthContext';
import {useEffect, useState, useRef, useContext} from 'react';
import Input from './Input';
import ChatAdmin from './ChatAdmin/ChatAdmin';
export default function Chat() {
  const {user} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);
  const isAdmin = user.isAdmin;
  useEffect(() => {
    console.log(user);
    const unsubscribeListener = firestore()
      .collection('messages')
      .doc(user.user_id)
      .collection('chat-room')
      .orderBy('createdAt', 'asc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();
          // console.log('DOC ID: ' + doc.id);
          // console.log(doc.data());
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

  if (isAdmin) return <ChatAdmin />;
  return (
    <View style={s.main}>
      <Header />

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({item}) => <Bubble data={item} />}
        keyExtractor={item => item._id}
      />

      <Input />
    </View>
  );
}
