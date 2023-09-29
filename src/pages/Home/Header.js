import {Image, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {colors} from '../../assets/colors';
import {s} from './style';
import {strings} from '../../assets/strings';
import {useNavigation} from '@react-navigation/native';
import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
export default function Header() {
  const nav = useNavigation();
  const {user, profilePhoto, setProfilePhoto} = useContext(AuthContext);

  async function updateAsyncStorageData(profilePhoto) {
    try {
      const userData = await AsyncStorage.getItem('@userData');
      if (userData !== null) {
        const data = JSON.parse(userData);
        data.profilePhoto = profilePhoto;

        //Salvando o objeto atualizado no AsyncStorage
        await AsyncStorage.setItem('@userData', JSON.stringify(data));

        console.log('Atributo do objeto atualizado com sucesso!');
      } else {
        console.log('Chave não encontrada no AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o atributo do objeto:', error);
    }
  }

  async function updatePhotoOnFirestore(imageURL) {
    await firestore()
      .collection('users')
      .doc(user.user_id)
      .update({
        profilePhoto: imageURL,
      })
      .then(async r => {
        //ToastAndroid.show(strings.username_was_alterd, ToastAndroid.SHORT);
        await updateAsyncStorageData(imageURL);
      })
      .catch(e => {
        console.log('erro: ' + error);
        //ToastAndroid.show(strings.username_was_alterd, ToastAndroid.SHORT);
      });
  }

  async function savingPhoto(photo) {
    const miliseconds = String(Date.now());
    try {
      const storageRef = await storage()
        .ref('users/profile_photo')
        .child(miliseconds);
      console.log(storageRef);

      await storageRef.putFile(photo);
      const imageURL = await storageRef.getDownloadURL();
      console.log('caminho: ' + imageURL);

      await updatePhotoOnFirestore(imageURL);
    } catch (error) {
      console.log('erro: ' + error);
      // Alert.alert('Aconteceu algum erro ao adicionar o game!');
    }
  }
  const options = {
    title: strings.select_image,
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
        setProfilePhoto(imagePath);
        savingPhoto(imagePath);
      }
    });
  }

  return (
    <View style={s.headerContainer}>
      <TouchableOpacity
        style={{borderWidth: 9, borderColor: 'transparent'}}
        onPress={function () {
          nav.navigate('Configurations');
        }}>
        <EvilIcons name="gear" size={35} color={colors.main_blue} />
      </TouchableOpacity>
      <TouchableOpacity onPress={launchLibrary}>
        {user.profilePhoto == null ? (
          <Image
            style={{height: 50, width: 50}}
            source={require('../../assets/images/user.png')}
          />
        ) : (
          <LinearGradient
            colors={[colors.main_green, '#F6AE2D']}
            style={{
              borderRadius: 30,
              height: 60,
              width: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              loadingIndicatorSource={
                <ActivityIndicator size={30} color="#000" />
              }
              style={s.profileIcon}
              source={{uri: profilePhoto}}
            />
          </LinearGradient>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={{marginRight: 10}}>
        <MaterialCommunityIcon
          //name="bell-badge"
          name="bell-outline"
          size={28}
          color={colors.main_blue}
        />
      </TouchableOpacity>
    </View>
  );
}
