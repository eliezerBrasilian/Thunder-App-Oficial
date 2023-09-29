import {View, Image, Text, TouchableOpacity} from 'react-native';
import {s} from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import BackIcon from 'react-native-vector-icons/Feather';
import {colors} from '../../assets/colors';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
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
        setOnline(is_online);
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
          source={suportProfilePhoto == '' ? null : {uri: suportProfilePhoto}}
          style={{height: 50, width: 50, borderRadius: 50 / 2}}
        />
        <View style={s.afterImage}>
          <Text style={s.personName}>{suportName}</Text>
          <Text style={s.online}>{isOnline ? 'Online' : 'Offline'}</Text>
        </View>
      </View>

      <TouchableOpacity>
        <Entypo name="dots-three-vertical" size={30} color={colors.main_blue} />
      </TouchableOpacity>
    </View>
  );
}
