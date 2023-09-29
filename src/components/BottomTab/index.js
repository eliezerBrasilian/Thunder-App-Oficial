import {Image, View, StyleSheet} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../assets/colors';

export default function BottomTab({color, size, focused, currentRouteName}) {
  switch (currentRouteName) {
    case 'HomeTab': {
      return focused ? (
        <View style={s.tab}>
          {/* <Octicons name="home" size={27} color={colors.light} /> */}
          <Image
            style={s.icon}
            source={require('../../assets/images/home_white.png')}
          />
        </View>
      ) : (
        <View style={[s.tab, {backgroundColor: colors.bottom_tab_bg}]}>
          {/* <Foundation name="home" size={27} color="#1222" /> */}
          <Image
            style={s.icon}
            source={require('../../assets/images/home_gray.png')}
          />
        </View>
      );
      break;
    }
    case 'ContratosTab': {
      return focused ? (
        <View style={s.tab}>
          {/* <Octicons name="home" size={22} color={colors.light} /> */}
          <Image
            style={s.icon}
            source={require('../../assets/images/contratos_white.png')}
          />
        </View>
      ) : (
        <View style={[s.tab, {backgroundColor: colors.bottom_tab_bg}]}>
          {/* <Foundation name="home" size={22} color="#1222" /> */}
          <Image
            style={s.icon}
            source={require('../../assets/images/contracts_gray.png')}
          />
        </View>
      );
      break;
    }
    case 'ChatTab': {
      return focused ? (
        <View style={s.tab}>
          {/* <Ionicons
            name="chatbox-ellipses-outline"
            size={22}
            color={colors.light}
          /> */}
          <Image
            style={s.icon}
            source={require('../../assets/images/chat_white.png')}
          />
        </View>
      ) : (
        <View style={[s.tab, {backgroundColor: colors.bottom_tab_bg}]}>
          {/* <Ionicons name="chatbox-ellipses-outline" size={22} color="#1222" /> */}
          <Image
            style={s.icon}
            source={require('../../assets/images/chat_gray.png')}
          />
        </View>
      );
      break;
    }
  }
}

const s = StyleSheet.create({
  tab: {
    backgroundColor: colors.main_green,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    borderRadius: 10,
    marginTop: 20,
  },
  icon: {
    height: 30,
    width: 30,
  },
});
