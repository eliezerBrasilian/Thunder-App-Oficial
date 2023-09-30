import {s} from './style';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
import {useNavigation} from '@react-navigation/native';
import InputSearch from '../../components/InputSearch';
import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import {launchImageLibrary} from 'react-native-image-picker';
export default function Header({name}) {
  const nav = useNavigation();
  const {user, savePhoto, isLoadingPhoto, profilePhoto} =
    useContext(AuthContext);

  useEffect(() => {
    console.log('profileIcon: ' + profilePhoto);
  }, []);
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
        //setProfilePhoto(imagePath);
        console.log(imagePath);
        await savePhoto(imagePath);
      }
    });
  }

  function RenderProfileIcon() {
    if (isLoadingPhoto) {
      return <ActivityIndicator color={colors.main_blue} size={40} />;
    } else {
      return profilePhoto == null ? (
        <Image
          style={s.profileIcon}
          source={require('../../assets/images/user.png')}
        />
      ) : (
        <LinearGradient
          colors={['#4EF2F6', '#09168C', '#F8095A']}
          style={{
            borderRadius: 30,
            height: 60,
            width: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image style={s.profileIcon} source={{uri: profilePhoto}} />
        </LinearGradient>
      );
    }
  }
  return (
    <View style={s.header}>
      <View style={s.headerTop}>
        <TouchableOpacity
          style={s.backBtn}
          onPress={function () {
            nav.goBack();
          }}>
          <AntDesign name="arrowleft" color={colors.main_blue} size={35} />
        </TouchableOpacity>

        <View style={s.middle}>
          <TouchableOpacity onPress={launchLibrary}>
            <RenderProfileIcon />
          </TouchableOpacity>
          <Text numberOfLines={1} style={[s.headingText, {width: 200}]}>
            Olá, {name}!
          </Text>
        </View>
      </View>
      <InputSearch padding={17} fontSize={19} iconSize={30} />
    </View>
  );
}
