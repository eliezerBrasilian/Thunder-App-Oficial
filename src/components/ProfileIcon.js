import {TouchableOpacity, Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
export default function ProfileIcon() {
  const nav = useNavigation();
  const {user, profilePhoto, setProfilePhoto} = useContext(AuthContext);
  return (
    <TouchableOpacity
      onPress={() => nav.navigate('Configurations')}
      style={{marginRight: 10}}>
      <View>
        {user.profilePhoto == null ? (
          <Image
            style={{height: 30, width: 30}}
            source={require('../assets/images/user.png')}
          />
        ) : (
          <LinearGradient
            colors={[colors.main_green, '#F6AE2D']}
            style={{
              borderRadius: 20,
              height: 40,
              width: 40,
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
      </View>
    </TouchableOpacity>
  );
}
