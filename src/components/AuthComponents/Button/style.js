import {StyleSheet} from 'react-native';
import {colors} from '../../../assets/colors';
const s = StyleSheet.create({
  btnContainer: {
    padding: 16,
    backgroundColor: colors.main_green,
    marginTop: 20,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 20,
    color: colors.light,
    fontWeight: '700',
  },
});

export {s};
