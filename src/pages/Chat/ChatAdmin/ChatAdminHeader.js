import {View, Image, Text, TouchableOpacity} from 'react-native';
import {s} from '../style';
import Entypo from 'react-native-vector-icons/Entypo';
import BackIcon from 'react-native-vector-icons/Feather';
import {colors} from '../../../assets/colors';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function ChatAdminHeader({profile_photo, nome_chat}) {
  const nav = useNavigation();
  const [isOnline, setOnline] = useState(false);
  const [suportName, setSuportName] = useState('');
  const [suportProfilePhoto, setSuportProfilePhoto] = useState('');
  useEffect(() => {
    firestore()
      .collection('users')
      .doc('suporte')
      .get()
      .then(suportData => {
        const {is_online, name, photo} = suportData.data();
        //setOnline(is_online);
        setSuportName(name);
        setSuportProfilePhoto(photo);
      });
  }, []);

  function goBack() {
    nav.goBack();
  }
  return (
    <View style={s.header}>
      <View style={s.onLeft}>
        <TouchableOpacity onPress={goBack}>
          <BackIcon name="arrow-left" size={30} color={colors.main_blue} />
        </TouchableOpacity>
        <Image
          source={
            profile_photo == null
              ? require('../../../assets/images/user.png')
              : {uri: profile_photo}
          }
          style={{height: 50, width: 50, borderRadius: 50 / 2}}
        />
        <View style={s.afterImage}>
          <Text numberOfLines={1} style={s.personName}>
            {nome_chat}
          </Text>
          <Text style={s.online}>{isOnline ? 'Online' : 'Offline'}</Text>
        </View>
      </View>

      <TouchableOpacity>
        <Entypo name="dots-three-vertical" size={30} color={colors.main_blue} />
      </TouchableOpacity>
    </View>
  );
}
