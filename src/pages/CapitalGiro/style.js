import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const s = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 20,
  },

  heading: {
    fontSize: 20,
    color: colors.main_blue,
    fontWeight: '500',
  },
  termView: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
  },
  term: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    flex: 1,
  },

  paragraph: {
    fontSize: 19,
    color: '#000',
    fontWeight: '400',
    marginTop: 10,
    marginBottom: 30,
  },
  cardView: {
    borderColor: colors.borderCardShopping,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 22,
    color: '#000',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    columnGap: 10,
  },
});
