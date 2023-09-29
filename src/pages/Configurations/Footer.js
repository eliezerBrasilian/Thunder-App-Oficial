import {Text, View, TouchableOpacity} from 'react-native';
import {s} from './style';
import {strings} from '../../assets/strings';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
export default function Footer() {
  const {signOut} = useContext(AuthContext);
  return (
    <View style={s.footer}>
      <TouchableOpacity
        onPress={function () {
          signOut();
        }}>
        <Text style={s.footerText}>{strings.sair}</Text>
      </TouchableOpacity>
      <Text style={s.footerHeading}>{strings.horario_atendimento}</Text>
      <Text style={s.footerParagraph}>{strings.segunda_a_sexta}</Text>
      <Text style={s.footerParagraph}>{strings.sabado}</Text>
    </View>
  );
}
