import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
import {View, ScrollView, Alert} from 'react-native';
import {s} from './style';
import Header from '../../components/Header';
import Input from '../../components/AuthComponents/Input';
import Button from '../../components/AuthComponents/Button';
import {useState, useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {Masks} from 'react-native-mask-input';
export default function Login() {
  const {login} = useContext(AuthContext);
  const [cpf, setCPF] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (cpf.trim() !== '' && password.trim() !== '') {
      const response = await login(cpf, password);
      if (response == 400) {
        Alert.alert(strings.err_invalid_email);
      } else if (response == 404) {
        Alert.alert(strings.user_not_found);
      } else if (response == 406) {
        Alert.alert(strings.err_invalid_password);
      } else if (response == 504) {
        Alert.alert(strings.too_many_requests);
      }
    } else {
      Alert.alert(strings.fill_all);
    }
  }
  return (
    <ScrollView style={s.container}>
      <View style={{marginBottom: 40}}>
        <Header title={strings.login} color={colors.main_blue} />

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
          label={strings.digite_sua_senha}
          placeholderColor="#A0A0A0"
          placeholderText={strings.senha_placeholder}
          backgroundColor="#F6F6F6"
          value={password}
          setValue={setPassword}
          isPassword={true}
        />
        <Button title={strings.entrar} onclick={handleLogin} />
      </View>
    </ScrollView>
  );
}
