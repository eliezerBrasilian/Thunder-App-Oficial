import {StyleSheet} from 'react-native';
import {colors} from '../../../assets/colors';

export const s = StyleSheet.create({
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
  card: {
    borderRadius: 10,
    borderColor: '#dedede',
    borderWidth: 1,
    width: '100%',
    padding: 15,
  },
  cardOnTop: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },
  cardOnTopText: {
    color: colors.pagoTitleColor,
    fontSize: 20,
    fontWeight: '700',
  },
  cardIconePago: {
    height: 40,
    width: 40,
  },
  cardValorContratoTitle: {
    fontSize: 18,
    color: colors.placeholder_input,
    fontWeight: '400',
  },
  cardValorContrato: {
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
  },
  cardVerDetalhesContainer: {
    borderBottomColor: colors.main_blue,
    borderBottomWidth: 1,
    width: 120,
  },
  cardVerDetalhes: {
    fontSize: 17,
    color: colors.main_blue,
    fontWeight: '700',
  },
});
