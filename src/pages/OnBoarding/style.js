import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 20,
    justifyContent: 'center',
  },
  PagerView: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    rowGap: 20,
  },
  img: {
    height: 300,
    width: '100%',
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontWeight: '700',
    alignSelf: 'flex-start',
    textAlign: 'center',
  },
  description: {
    fontSize: 19,
    fontWeight: '400',
  },

  text: {
    fontSize: 30,
  },

  paragrafo: {
    fontSize: 27,
    color: '#fff',
    fontWeight: '400',
    alignSelf: 'flex-start',
  },
});

export {styles};
