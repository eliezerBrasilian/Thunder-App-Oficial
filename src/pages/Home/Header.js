import {Image, View} from 'react-native';
import {s} from './style';
import Notification from '../../components/Notification';
import ProfileIcon from '../../components/ProfileIcon';
export default function Header() {
  return (
    <View style={s.headerContainer}>
      <Image
        resizeMode="cover"
        style={{height: 50, width: 110}}
        source={require('../../assets/images/Logo.png')}
      />

      <View style={{flexDirection: 'row', columnGap: 15}}>
        <Notification />
        <ProfileIcon />
      </View>
    </View>
  );
}
