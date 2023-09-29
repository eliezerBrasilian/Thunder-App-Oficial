import {View, FlatList, TouchableOpacity, Image, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../../contexts/AuthContext';
import {useEffect, useState, useRef, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
export default function ChatAdmin() {
  const {user} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    firestore()
      .collection('messages')
      .onSnapshot(d => {
        let aux = [];
        d.docs.map(i => {
          const data = {
            id: i.id,
            ...i.data(),
          };
          aux.push(data);
        });
        setMessages(aux);
      });
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <Header />
      <View style={{marginTop: 20}} />
      <FlatList
        contentContainerStyle={{rowGap: 20}}
        data={messages}
        renderItem={({item}) => <Message data={item} />}
      />
    </View>
  );
}

function Message({data}) {
  console.log(data);

  const nav = useNavigation();
  return (
    <TouchableOpacity
      onPress={function goToChatAberto() {
        console.log(data.id);
        nav.navigate('ChatAberto', {
          chat_id: data.id,
          profile_photo: data.profile_photo,
          nome_chat: data.nome_chat,
        });
      }}
      style={{flexDirection: 'row', alignItems: 'center', columnGap: 20}}>
      <Image
        source={
          data.profile_photo != null
            ? {uri: data.profile_photo}
            : require('../../../assets/images/user.png')
        }
        style={{height: 55, width: 55, borderRadius: 55 / 2}}
      />

      <View
        style={{
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text
          numberOfLines={1}
          style={{color: '#000', fontSize: 19, fontWeight: '500'}}>
          {data?.nome_chat}
        </Text>
        {data.file != undefined && data.file !== '' ? (
          <Image source={{uri: data.file}} style={{height: 25, width: 25}} />
        ) : (
          <Text
            numberOfLines={1}
            style={{color: '#000', fontSize: 16, fontWeight: '400', flex: 1}}>
            {data?.last_message}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

function Header() {
  return (
    <View>
      <Text style={{color: '#000', fontSize: 26, fontWeight: '600'}}>
        Conversas
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#C9C9C9',
          marginTop: 10,
        }}
      />
    </View>
  );
}
