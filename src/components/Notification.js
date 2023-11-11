import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../assets/colors';
import {useNavigation} from '@react-navigation/native';
export default function Notification() {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      onPress={function () {
        nav.navigate('Notificacoes');
      }}>
      <MaterialCommunityIcon
        //name="bell-badge"
        name="bell-outline"
        size={30}
        color={colors.main_blue}
      />
    </TouchableOpacity>
  );
}
