import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';
export const s = StyleSheet.create({
  main: {
    flex: 1,
    color: colors.chatBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.light,
    minHeight: 90,
    padding: 15,
  },
  onLeft: {flexDirection: 'row', columnGap: 10, alignItems: 'center'},
  afterImage: {
    justifyContent: 'center',
  },
  personName: {
    fontSize: 19,
    color: colors.main_blue,
    fontWeight: '700',
    maxWidth: 200,
  },
  online: {
    fontSize: 16,
    color: colors.placeholder_input,
    fontWeight: '500',
  },
  bubble: {
    minHeight: 20,
    minWidth: 90,
    maxWidth: '70%',
    marginHorizontal: 10,
    marginVertical: 9,
    padding: 15,
    borderTopEndRadius: 10,
    borderRadius: 10,
    flex: 0,
    alignSelf: 'flex-start',
  },
  bubbleText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '400',
  },
  chatSystemText: {
    color: '#000',
    fontSize: 19,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 15,
  },
  bubbleLeft: {
    backgroundColor: colors.light,
  },
  bubbleRight: {
    backgroundColor: colors.bubbleBackgroundColor,
    alignSelf: 'flex-end',
    borderBottomEndRadius: 10,
  },
  inputView: {
    minHeight: 90,
    backgroundColor: colors.light,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    paddingHorizontal: 20,
  },
  inputArea: {
    flex: 1,
    borderRadius: 20,
    borderColor: colors.placeholder_input,
    borderWidth: 1,
    maxHeight: 90,
  },
  inputText: {
    fontSize: 17,
    color: '#000',
    fontWeight: '500',
  },
});
