import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

const s = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 20,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_line,
    rowGap: 20,
  },
  profileIcon: {
    height: 55,
    width: 55,
    borderRadius: 27.5,
  },
  headerTop: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 10,
  },
  middle: {
    rowGap: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  headingText: {
    fontSize: 24,
    color: colors.main_blue,
    fontWeight: '700',
  },

  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_line,
    paddingVertical: 15,
  },
  listLeft: {
    flexDirection: 'row',
    columnGap: 11,
    alignItems: 'center',
  },
  listIcon: {
    height: 27,
    width: 27,
  },
  listTitle: {
    fontSize: 19,
    color: '#000',
    fontWeight: '500',
  },
  footer: {
    rowGap: 20,
  },
  footerText: {
    fontSize: 19,
    color: colors.light_blue,
    fontWeight: '700',
  },
  footerHeading: {
    fontSize: 19,
    color: '#000',
    fontWeight: '600',
  },
  footerParagraph: {
    fontSize: 16,
    color: '#000',
    fontWeight: '300',
  },
});

export {s};
