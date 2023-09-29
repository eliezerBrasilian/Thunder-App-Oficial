import {View, Modal, Text, TouchableOpacity, StyleSheet} from 'react-native';
import InternConfigHeader from '../../../components/InternConfigHeader';
import {colors} from '../../../assets/colors';
import {strings} from '../../../assets/strings';
import InputOnConfig from '../../../components/InputOnConfig';

import {AuthContext} from '../../../contexts/AuthContext';
import {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/AuthComponents/Button';

export default function Seguranca() {
  const {user} = useContext(AuthContext);
  const nav = useNavigation();
  const [password, setPassword] = useState(user.localPassword);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //   const [cpf,setCPF] = useState(formatarCPF(user.cpf))
  //   const [celular,setCelular] = useState(formatarCelular(user.phone))
  //   const [birthDay,setBirthDay] = useState(formatarDataNascimento(user.birthDay))

  function formatarCPF(cpf) {
    // Remove qualquer caractere não numérico da string
    cpf = cpf.replace(/\D/g, '');
    // Aplica a formatação do CPF (###.###.###-##)
    cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    return cpf;
  }
  function formatarCelular(celular) {
    celular = celular.replace(/\D/g, '');
    celular = celular.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    return celular;
  }
  function formatarDataNascimento(birthDay) {
    birthDay = birthDay.replace(/\D/g, '');
    birthDay = birthDay.replace(/^(\d{4})(\d{2})(\d{2})$/, '$3/$2/$1');
    return birthDay;
  }

  return (
    <Modal
      onRequestClose={function () {
        nav.navigate('Configurations_');
      }}>
      <View style={s.main}>
        <InternConfigHeader />
        <View style={{marginTop: 40}} />
        <View style={{rowGap: 20}}>
          <InputOnConfig
            placeholderText={strings.senha_atual}
            value={password}
            setValue={setPassword}
            onlyRead={false}
            isPassword={true}
          />
          <InputOnConfig
            placeholderText={strings.nova_senha}
            value={newPassword}
            setValue={setNewPassword}
            onlyRead={false}
            isPassword={true}
          />
          <InputOnConfig
            placeholderText={strings.confirmar_senha}
            value={confirmPassword}
            setValue={setConfirmPassword}
            onlyRead={false}
            isPassword={true}
          />
          <Button
            title={strings.salvar_alteracoes}
            backgroundColor={colors.main_blue}
          />
        </View>
      </View>
    </Modal>
  );
}
const s = StyleSheet.create({
  main: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.light,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.main_blue,
  },
});
