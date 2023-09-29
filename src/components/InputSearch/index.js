import {View, Image, Text, TextInput, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';

export default function InputSearch({padding, fontSize, iconSize, height}) {
  return (
    <View style={[s.searchView, {height: height}]}>
      <AntDesign
        name="search1"
        color={colors.placeholder_input}
        size={iconSize}
      />
      <TextInput
        style={[s.searchInput, {padding: padding, fontSize: fontSize}]}
        placeholder={strings.qual_e_a_sua_duvida}
        placeholderTextColor={colors.placeholder_input}
      />
    </View>
  );
}

const s = StyleSheet.create({
  searchView: {
    flexDirection: 'row',
    columnGap: 20,
    backgroundColor: colors.gray,
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft: 10,
  },
  searchInput: {
    width: '100%',
    color: '#000',
  },
});
