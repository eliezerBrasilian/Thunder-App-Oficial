import {StyleSheet, View, Image, Text} from 'react-native';
import {colors} from '../../assets/colors';
export default function SemContratos({description, image}) {
  return (
    <View style={s.pagosMain}>
      <Image style={s.image} source={image} resizeMode="contain" />
      <Text style={s.semContratosPagosText}>{description}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  pagosMain: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: 'center',
    paddingTop: 30,
    rowGap: 20,
  },
  semContratosPagosText: {
    fontSize: 22,
    color: colors.semContratosPagosText,
    textAlign: 'center',
    fontWeight: '600',
  },
  image: {
    height: 150,
    height: 150,
  },
});
