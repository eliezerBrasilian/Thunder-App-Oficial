import {StyleSheet} from 'react-native';
import {colors} from '../../../assets/colors';
const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    columnGap: 70,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    color: colors.main_blue,
    fontWeight: '700',
  },
});

export {s};
