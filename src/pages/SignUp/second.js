import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
import {View, ScrollView, Alert} from 'react-native';
import {s} from '../Login/style';
import Header from '../../components/Header';
import Input from '../../components/AuthComponents/Input';
import Button from '../../components/AuthComponents/Button';
import {useState, useContext} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../contexts/AuthContext';
import {Masks} from 'react-native-mask-input';
export default function Second() {
  const route = useRoute();
  const nav = useNavigation();
  const {signUp} = useContext(AuthContext);
  const [name] = useState(route?.params.name);
  const [birthday_date] = useState(route?.params.birthday_date);
  const [email] = useState(route?.params.email);
  const [phone] = useState(route?.params.phone);
  const [cpf, setCPF] = useState('12345678903');
  const [password, setPassword] = useState('123456');

  function goToLogin() {
    nav.navigate('Login');
  }
  async function handleSignUp() {
    if (
      name.trim() !== '' &&
      birthday_date.trim() !== '' &&
      email.trim() !== '' &&
      phone.trim() !== '' &&
      cpf.trim() !== '' &&
      password.trim() !== ''
    ) {
      const response = await signUp(
        name,
        birthday_date,
        email,
        phone,
        cpf,
        password,
      );
      if (response == 400) {
        Alert.alert(strings.err_invalid_email);
      } else if (response == 406) {
        Alert.alert(strings.email_already_in_use);
      } else if (response == 407) {
        Alert.alert(strings.cpf_already_in_use);
      } else if (response == 411) {
        Alert.alert(strings.weak_password);
      } else if (response == 500) {
        Alert.alert(strings.intern_error);
      } else if (response == 200) {
        Alert.alert(strings.game_state_title, strings.account_created, [
          {text: strings.thats_it, onPress: () => goToLogin()},
        ]);
      }
    } else {
      Alert.alert(strings.fill_all);
    }
  }

  return (
    <ScrollView style={s.container}>
      <View style={{marginBottom: 40}}>
        <Header title={strings.cadastro} color={colors.main_blue} />

        <Input
          label={strings.cpf_label}
          placeholderColor="#A0A0A0"
          placeholderText={strings.cpf_placeholder}
          backgroundColor="#F6F6F6"
          value={cpf}
          setValue={setCPF}
          isMaskInput={true}
          mask={Masks.BRL_CPF}
          keyboardType="numeric"
        />

        <Input
          label={strings.senha_label}
          placeholderColor="#A0A0A0"
          placeholderText={strings.senha_placeholder}
          backgroundColor="#F6F6F6"
          value={password}
          setValue={setPassword}
          isPassword={true}
        />
        <Button title={strings.cadastrar} onclick={handleSignUp} />
      </View>
    </ScrollView>
  );
}
