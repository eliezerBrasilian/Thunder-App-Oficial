import {View, TextInput, TouchableOpacity} from 'react-native';
import {s} from '../style';
import firestore from '@react-native-firebase/firestore';
import {useState, useContext} from 'react';
import {colors} from '../../../assets/colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../../contexts/AuthContext';
export default function ChatAdminInput({chat_id}) {
  const {profilePhoto, user} = useContext(AuthContext);
  const [inputText, setInputText] = useState('');

  async function sendMessage() {
    if (inputText == '') return;
    await firestore()
      .collection('messages')
      .doc(chat_id)
      .collection('chat-room')
      .add({
        is_suport: true,
        is_system: false,
        profile_photo: profilePhoto,
        picture: null,
        text: inputText.trim(),
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setInputText('');
      });
  }
  return (
    <View style={s.inputView}>
      <Feather name="paperclip" color={colors.placeholder_input} size={35} />
      <View style={s.inputArea}>
        <TextInput
          multiline={true}
          style={s.inputText}
          placeholderTextColor={colors.placeholder_input}
          placeholder="escreva sua mensagem..."
          value={inputText}
          onChangeText={t => setInputText(t)}
        />
      </View>
      <TouchableOpacity onPress={sendMessage}>
        <MaterialCommunityIcons
          name="send"
          color={colors.main_blue}
          size={35}
        />
      </TouchableOpacity>
    </View>
  );
}
