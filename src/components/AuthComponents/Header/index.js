import {View, Text, TouchableOpacity} from 'react-native';
import {s} from './style';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
export default function Header({title, color, action = 'goBack'}) {
  const nav = useNavigation();
  function method() {
    action == 'goBack' ? nav.goBack() : nav.navigate('Home');
  }
  return (
    <View style={s.header}>
      <TouchableOpacity onPress={method}>
        <Icon name="arrow-left" size={30} color={color} />
      </TouchableOpacity>

      <Text style={s.headerTitle}>{title}</Text>
    </View>
  );
}
