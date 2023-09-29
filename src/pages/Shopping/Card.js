import {View, Image, TouchableOpacity, Text} from 'react-native';
import Header from '../../components/AuthComponents/Header';
import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
import {s} from './style';
export default function Card({
  solidBackground = false,
  title,
  offer,
  image,
  method,
}) {
  function goShoppingStore() {
    method();
  }
  return (
    <TouchableOpacity
      onPress={goShoppingStore}
      style={s.mainCard}
      activeOpacity={0.7}>
      <View style={s.circle}>
        <Image source={image} style={s.image} resizeMode="contain" />
      </View>

      <Text style={s.title}>{title}</Text>
      <Text style={s.offer}>Até {offer}% OFF</Text>
    </TouchableOpacity>
  );
}
