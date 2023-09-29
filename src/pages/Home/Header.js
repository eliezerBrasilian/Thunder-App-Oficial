import {Image, View} from 'react-native';
import {s} from './style';
import {strings} from '../../assets/strings';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notification from '../../components/Notification';
import ProfileIcon from '../../components/ProfileIcon';
export default function Header() {
  async function launchLibrary() {
    const options = {
      title: strings.select_image,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
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
      <Image
        resizeMode="cover"
        style={{height: 50, width: 100}}
        source={require('../../assets/images/Logo.png')}
      />

      <View style={{flexDirection: 'row', columnGap: 15}}>
        <Notification />
        <ProfileIcon />
      </View>
    </View>
  );
}
