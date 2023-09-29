import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';
const s = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.light,
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  profileIcon: {
    height: 55,
    width: 55,
    borderRadius: 27.5,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.light,
    rowGap: 10,
    padding: 10,
  },
  pagerView: {
    flex: 1,
    minHeight: 200,
  },
  belowSliderContainer: {
    backgroundColor: colors.gray,
    borderRadius: 5,
    padding: 15,
    rowGap: 2,
    borderRadius: 10,
  },

  title: {
    fontSize: 24,
    color: colors.main_blue,
    fontWeight: '600',
  },
  text: {
    fontSize: 17,
    color: '#000',
  },
  btnOnBelowSlider: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    alignSelf: 'flex-start',
    backgroundColor: colors.main_blue,
    borderRadius: 10,
    marginTop: 5,
  },
  btnOnBelowSliderText: {
    fontSize: 17,
    color: '#fff',
  },
  inviteContainer: {
    backgroundColor: colors.gray,
    borderRadius: 5,
    padding: 15,
    rowGap: 10,
  },
  headerInviteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  shareBtn: {
    flexDirection: 'row',
    height: 35,
    width: 35,
  },
  titleAction: {
    color: '#000',
    fontSize: 19,
    fontWeight: '600',
  },
  descriptionAction: {
    color: '#000',
    fontSize: 17,
    fontWeight: '400',
    flex: 1,
  },
});

export {s};
