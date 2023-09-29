import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
export default function InternConfigHeader() {
  const nav = useNavigation();
  return (
    <View style={s.header}>
      <TouchableOpacity
        onPress={function () {
          nav.goBack();
        }}>
        <AntDesign name="arrowleft" color={colors.main_blue} size={32} />
      </TouchableOpacity>
      <Text style={s.title}>{strings.dados_pessoais}</Text>
    </View>
  );
}
const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.main_blue,
  },
});
