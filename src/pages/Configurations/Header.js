import {s} from './style';
import {View, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
import {useNavigation} from '@react-navigation/native';
import InputSearch from '../../components/InputSearch';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
export default function Header({name}) {
  const nav = useNavigation();
  const {user, profilePhoto} = useContext(AuthContext);
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
          {user.profilePhoto == null ? (
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
          )}

          <Text style={s.headingText}>Olá, {name}!</Text>
        </View>
      </View>
      <InputSearch padding={17} fontSize={19} iconSize={30} />
    </View>
  );
}
