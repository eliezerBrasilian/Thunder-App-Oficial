import {s} from './style';
import {strings} from '../../../assets/strings';
import {TouchableOpacity, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
export default function Footer() {
  const nav = useNavigation();
  function goToSignUp() {
    nav.navigate('SignUp');
  }
  function goToLogin() {
    nav.navigate('Login');
  }
  return (
    <View style={s.center}>
      <TouchableOpacity onPress={goToSignUp} style={s.btn}>
        <Text style={s.btnText}>{strings.abrir_conta_de}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogin}>
        <Text style={[s.btnText, s.fazerLogin]}>{strings.fazer_login}</Text>
      </TouchableOpacity>
    </View>
  );
}
