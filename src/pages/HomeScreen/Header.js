import {View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
export default function Header({
  icon = require('../../assets/images/login_icon.png'),
  marginTopForRightIcon = 0,
  sizeOfRightIcon = 30,
  destination = 'Login',
}) {
  const nav = useNavigation();

  function navigateToDestination() {
    nav.navigate(destination);
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
      }}>
      <Image
        source={require('../../assets/images/thunder_icon.png')}
        style={{height: 30, width: 90}}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={{marginTop: marginTopForRightIcon}}
        onPress={navigateToDestination}>
        <Image
          source={icon}
          style={{height: sizeOfRightIcon, width: sizeOfRightIcon}}
        />
      </TouchableOpacity>
    </View>
  );
}
