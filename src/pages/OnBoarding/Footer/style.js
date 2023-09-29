import {StyleSheet} from 'react-native';
import {colors} from '../../../assets/colors';
const s = StyleSheet.create({
  btn: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main_blue,
    width: '90%',
    borderRadius: 8,
  },
  btnText: {
    fontSize: 19,
    color: colors.light,
    fontWeight: '600',
  },
  fazerLogin: {
    fontWeight: '700',
    color: colors.main_blue,
  },
  center: {
    alignItems: 'center',
    rowGap: 15,
  },
});

export {s};
