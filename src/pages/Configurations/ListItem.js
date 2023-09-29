import {View, Text, Image, TouchableOpacity} from 'react-native';
import {s} from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../assets/colors';
import {useNavigation} from '@react-navigation/native';
useNavigation;
export default function ListItem({icon, title, iconSize = 0, goTo}) {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      onPress={function () {
        nav.navigate(goTo);
      }}
      activeOpacity={0.4}
      style={s.listContainer}>
      <View style={s.listLeft}>
        {iconSize != 0 ? (
          <Image
            style={[s.listIcon, {height: iconSize, width: iconSize}]}
            source={icon}
          />
        ) : (
          <Image style={s.listIcon} source={icon} />
        )}

        <Text style={s.listTitle}>{title}</Text>
      </View>

      <View style={{marginRight: 10}}>
        <AntDesign name="right" size={25} color={colors.main_blue} />
      </View>
    </TouchableOpacity>
  );
}
