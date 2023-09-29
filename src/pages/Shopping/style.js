import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';
const imageSize = 80;
export const s = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 20,
  },
  description: {
    color: '#000',
    fontSize: 19,
    fontWeight: '400',
    marginBottom: 25,
  },
  rowView: {
    flexDirection: 'row',
    width: '100%',
    columnGap: 10,
  },
  mainCard: {
    borderRadius: 10,
    borderWidth: 1.6,
    borderColor: colors.borderCardShopping,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 180,
    rowGap: 9,
    padding: 10,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: imageSize,
    borderRadius: imageSize / 2,
    borderWidth: 1.3,
    borderColor: colors.borderCardShopping,
    padding: 5,
  },
  image: {
    height: imageSize - 10,
    width: imageSize - 10,
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  offer: {
    color: colors.offerText,
    fontSize: 18,
    fontWeight: '700',
    backgroundColor: colors.textoDestacado,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
});
