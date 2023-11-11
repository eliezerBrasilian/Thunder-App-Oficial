import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
import {View, ScrollView, Alert} from 'react-native';
import {s} from './style';
import Header from '../../components/Header';
<<<<<<< HEAD
import {useState} from 'react';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {useAuthContext} from '../../contexts/AuthContext';
export default function Login({navigation}) {
  const {login} = useAuthContext();

  const [credencial, setCredencial] = useState('eliezeradmin123');
  const [password, setPassword] = useState('123456');

  function handleLogin() {
    //console.log(credencial.trim(), password.trim());

    login(credencial.trim(), password.trim());
=======
import Input from '../../components/AuthComponents/Input';
import Button from '../../components/AuthComponents/Button';
import {useState, useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {Masks} from 'react-native-mask-input';
export default function Login() {
  const {login} = useContext(AuthContext);
  const [cpf, setCPF] = useState('12345678910');
  const [password, setPassword] = useState('123456');

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
>>>>>>> c18a55245d230d1f9bc4da7212753a3624bb7db5
  }
  return (
    <ScrollView style={s.container}>
      <View style={{marginBottom: 40}}>
        <Header title={strings.login} color={colors.main_blue} />
<<<<<<< HEAD
        <Input
          label={'Credencial de acesso'}
          placeholderText="Digite sua credencial de acesso"
          value={credencial}
          setValue={setCredencial}
        />
        <Input
          label={'Senha'}
          placeholderText="Digite sua senha de acesso"
          value={password}
          setValue={setPassword}
        />
        <View style={{marginTop: 40, alignItems: 'center'}}>
          <Button onClick={handleLogin} padding={15} title={strings.entrar}>
            Entrar
          </Button>
        </View>
=======

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
>>>>>>> c18a55245d230d1f9bc4da7212753a3624bb7db5
      </View>
    </ScrollView>
  );
}
