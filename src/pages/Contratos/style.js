import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

const s = StyleSheet.create({
  mainView: {
    backgroundColor: colors.light,
    flex: 1,
    padding: 10,
  },
  mainViewTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.main_blue,
    textAlign: 'center',
  },
  painelView: {
    padding: 10,
    rowGap: 15,
    backgroundColor: colors.light,
    flex: 1,
  },
  painelHeader: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },
  painelTitle: {
    fontSize: 20,
    color: colors.main_blue,
    fontWeight: '700',
  },
  painelCards: {
    rowGap: 10,
  },
  painelCardRow: {
    flexDirection: 'row',
    columnGap: 20,
  },
  solicitacoesView: {
    backgroundColor: colors.light,
    rowGap: 15,
    flex: 1,
    marginTop: -50,
  },
  solicitacoesHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.light,
    paddingHorizontal: 10,
  },
  solicitacoesHeadingLeft: {
    flexDirection: 'row',
    columnGap: 15,
    alignItems: 'center',
  },
  solicitacaoItemView: {
    backgroundColor: colors.listItemBackground,
    padding: 10,
    rowGap: 10,
  },
  solicitacaoItemHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  solicitacaoItemHeadingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  destacarTexto: {
    backgroundColor: colors.textoDestacado,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  solicitacaoItemReceivedText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  visualizar: {
    fontSize: 16,
    color: colors.main_blue,
    fontWeight: '500',
    borderBottomColor: colors.main_blue,
    borderBottomWidth: 1,
  },
  solicitacaoItemText: {
    fontSize: 16,
    color: colors.main_blue,
    fontWeight: '500',
  },
});
export {s};
