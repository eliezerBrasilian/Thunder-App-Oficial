import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
import {View, ScrollView, Alert} from 'react-native';
import {s} from './style';
import Header from '../../components/Header';
import {useState} from 'react';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {useAuthContext} from '../../contexts/AuthContext';
export default function Login({navigation}) {
  const {login} = useAuthContext();

  const [credencial, setCredencial] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    login(credencial.trim(), password.trim());
  }
  return (
    <ScrollView style={s.container}>
      <View style={{marginBottom: 40}}>
        <Header title={strings.login} color={colors.main_blue} />
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
      </View>
    </ScrollView>
  );
}
