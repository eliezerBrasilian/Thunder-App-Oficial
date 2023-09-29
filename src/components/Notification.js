import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../assets/colors';
export default function Notification() {
  return (
    <TouchableOpacity>
      <MaterialCommunityIcon
        //name="bell-badge"
        name="bell-outline"
        size={30}
        color={colors.main_blue}
      />
    </TouchableOpacity>
  );
}
