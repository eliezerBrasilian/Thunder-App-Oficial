import {View, Modal, Text, TouchableOpacity, StyleSheet} from 'react-native';
import InternConfigHeader from '../../../components/InternConfigHeader';
import {colors} from '../../../assets/colors';
import {strings} from '../../../assets/strings';
import InputOnConfig from '../../../components/InputOnConfig';

import {AuthContext} from '../../../contexts/AuthContext';
import {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function DadosPessoais() {
  const {user} = useContext(AuthContext);
  const nav = useNavigation();
  const cpf = formatarCPF(user.cpf);
  const celular = formatarCelular(user.phone);
  const birthDay = formatarDataNascimento(user.birthDay);

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
            placeholderText={strings.nome_completo_label}
            value={user.name}
          />
          <InputOnConfig
            placeholderText={strings.email_label}
            value={user.email}
          />
          <InputOnConfig placeholderText={strings.cpf_label} value={cpf} />
          <InputOnConfig
            placeholderText={strings.data_nascimento_label}
            value={birthDay}
          />
          <InputOnConfig
            placeholderText={strings.celular_label}
            value={celular}
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
