import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
export default function Header({
  title,
  color = colors.main_blue,
  action = 'goBack',
  titleColor = colors.main_blue,
}) {
  const nav = useNavigation();
  function method() {
    action == 'goBack' ? nav.goBack() : nav.navigate('Home');
  }
  return (
    <View style={s.header}>
      <TouchableOpacity style={{zIndex: 2}} onPress={method}>
        <Icon name="arrow-left" size={30} color={color} />
      </TouchableOpacity>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          zIndex: 1,
          marginLeft: -10,
        }}>
        <Text style={[s.title, {color: titleColor}]}>{title}</Text>
      </View>
    </View>
  );
}

import {StyleSheet} from 'react-native';
import {colors} from '../assets/colors';
const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,

    fontWeight: '700',
    marginRight: 30,
  },
});
