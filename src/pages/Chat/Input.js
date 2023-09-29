import {View, TextInput, TouchableOpacity, Image} from 'react-native';
import {s} from './style';
import firestore from '@react-native-firebase/firestore';
import {useState, useContext} from 'react';
import {colors} from '../../assets/colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../contexts/AuthContext';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function Input() {
  const {profilePhoto, user} = useContext(AuthContext);
  const [inputText, setInputText] = useState('');
  const [file_on_memory, setFileOnMemort] = useState('');
  const [file_from_storage, setFileFromStorage] = useState('');
  const [isLoadingOnSaving, setLoadingOnSaving] = useState(false);
  const options = {
    title: 'Selecione seu arquivo',

    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  async function launchLibrary() {
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('Seleção de imagem cancelada');
      } else if (response.error) {
        console.log('Erro: ', response.error);
      } else {
        // Caminho do arquivo selecionado
        const ra = response.assets;
        const imagePath = ra[0].uri;
        console.log(imagePath);
        setFileOnMemort(imagePath);
      }
    });
  }

  async function getFileUrl() {
    const miliseconds = String(Date.now());
    if (file_on_memory.trim() == '') {
      return '';
    }
    try {
      const storageRef = await storage().ref('users/fotos').child(miliseconds);
      console.log(storageRef);
      // setLoadingOnSaving(true);
      await storageRef.putFile(file_on_memory);
      const caminho = await storageRef.getDownloadURL();

      console.log(caminho);
      setFileOnMemort('');
      return caminho;
    } catch (error) {
      console.log('erro: ' + error);
      Alert.alert('Aconteceu algum erro ao adicionar o game!');
      return '';
    }
  }
  async function sendMessage() {
    let file_url = '';
    if (file_on_memory !== '') {
      file_url = await getFileUrl();
      setFileFromStorage(file_url);
      console.log('file_url: ' + file_url);
    }

    if (inputText.trim() == '' && file_on_memory.trim() == '') return;
    await firestore()
      .collection('messages')
      .doc(user.user_id)
      .collection('chat-room')
      .add({
        is_suport: false,
        is_system: false,
        profile_photo: profilePhoto,
        picture: null,
        text: inputText.trim(),
        createdAt: firestore.FieldValue.serverTimestamp(),
        file: file_url,
      })
      .then(() => {
        setInputText('');
        setFileFromStorage('');
        firestore().collection('messages').doc(user.user_id).set({
          created_at: firestore.FieldValue.serverTimestamp(),
          last_message: inputText.trim(),
          nome_chat: user.name,
          profile_photo: user.profilePhoto,
          file: file_url,
        });
      });
    //setFileFromStorage('');
  }
  return (
    <View style={s.inputView}>
      <TouchableOpacity onPress={launchLibrary}>
        {file_on_memory !== '' ? (
          <View style={{height: 60, alignItems: 'center'}}>
            <Image
              source={{uri: file_on_memory}}
              style={{height: 40, width: 40}}
            />
            <TouchableOpacity
              onPress={() => setFileOnMemort('')}
              style={{position: 'absolute', bottom: 0}}>
              <AntDesign name={'closecircle'} size={30} color={'red'} />
            </TouchableOpacity>
          </View>
        ) : (
          <Feather
            name="paperclip"
            color={colors.placeholder_input}
            size={30}
          />
        )}
      </TouchableOpacity>
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
