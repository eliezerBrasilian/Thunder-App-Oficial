import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
import {View, ScrollView} from 'react-native';
import {s} from '../Login/style';
import Header from '../../components/AuthComponents/Header';
import Input from '../../components/AuthComponents/Input';
import Button from '../../components/AuthComponents/Button';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Masks} from 'react-native-mask-input';
export default function SignUp() {
  const nav = useNavigation();
  const [name, setName] = useState('Teste Teste Super Teste Mega Teste');
  const [birthday_date, setBirthDay] = useState('11223333');
  const [email, setEmail] = useState('teste11@gmail.com');
  const [phone, setPhone] = useState('11223344556');

  function next() {
    nav.navigate('Second', {name, birthday_date, phone, email});
  }
  return (
    <ScrollView style={s.container}>
      <View style={{marginBottom: 40}}>
        <Header title={strings.cadastro} color={colors.main_blue} />
        <Input
          label={strings.nome_completo_label}
          placeholderColor="#A0A0A0"
          placeholderText={strings.nome_completo_placeholder}
          backgroundColor="#F6F6F6"
          value={name}
          setValue={setName}
        />

        <Input
          label={strings.data_nascimento_label}
          placeholderColor="#A0A0A0"
          placeholderText={strings.data_nascimento_placeholder}
          backgroundColor="#F6F6F6"
          value={birthday_date}
          setValue={setBirthDay}
          isMaskInput={true}
          keyboardType="numeric"
          mask={Masks.DATE_DDMMYYYY}
        />
        <Input
          label={strings.email_label}
          placeholderColor="#A0A0A0"
          placeholderText={strings.email_placeholder}
          backgroundColor="#F6F6F6"
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
          allCaps="none"
        />
        <Input
          label={strings.celular_label}
          placeholderColor="#A0A0A0"
          placeholderText={strings.celular_placeholder}
          backgroundColor="#F6F6F6"
          value={phone}
          setValue={setPhone}
          isMaskInput={true}
          mask={Masks.BRL_PHONE}
          keyboardType="numeric"
        />

        <Button onclick={next} title={strings.continuar} />
      </View>
    </ScrollView>
  );
}
