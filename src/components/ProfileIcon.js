import {
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../contexts/AuthContext';
export default function ProfileIcon() {
  const nav = useNavigation();
  const {user, profilePhoto} = useContext(AuthContext);
  //const [profilePhoto] = useState(user.profile_photo);

  useEffect(() => {
    console.log('profileIcon: ' + profilePhoto);
  }, []);
  return (
    <TouchableOpacity
      onPress={() => nav.navigate('Configurations')}
      style={{marginRight: 10}}>
      <View>
        {profilePhoto == null ? (
          <Image
            style={s.profileIcon}
            source={require('../assets/images/user.png')}
          />
        ) : (
          <Image
            loadingIndicatorSource={
              <ActivityIndicator size={30} color="#000" />
            }
            style={s.profileIcon}
            source={{uri: profilePhoto}}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  profileIcon: {
    height: 30,
    width: 30,
    borderRadius: 27.5,
  },
});
