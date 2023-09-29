import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {strings} from '../../../assets/strings';
import {colors} from '../../../assets/colors';
import {s} from '../style';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
export default function SolicitacaoItem({solicitacoesData}) {
  //em_analise então foi recebido
  return (
    <View style={s.solicitacaoItemView}>
      <View style={s.solicitacaoItemHeading}>
        <View style={s.destacarTexto}>
          <Text style={s.solicitacaoItemReceivedText}>
            {solicitacoesData.em_analise ? strings.recebido : 'Não recebido'}
          </Text>
        </View>

        <TouchableOpacity style={s.solicitacaoItemHeadingRight}>
          <Entypo name="eye" color={colors.main_blue} size={24} />
          <Text style={s.visualizar}>{strings.visualizar}</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={s.solicitacaoItemText}>{solicitacoesData.nome}</Text>
        <Text
          style={[s.solicitacaoItemText, {color: colors.placeholder_input}]}>
          {strings.codigo}: {solicitacoesData.codigo}
        </Text>
        <Text style={s.solicitacaoItemText}>
          {strings.cpf_label}: {solicitacoesData.cpf}
        </Text>
        <Text style={s.solicitacaoItemText}>{solicitacoesData.email}</Text>
      </View>

      <Text style={[s.solicitacaoItemText, {color: colors.placeholder_input}]}>
        {strings.solicitado_a} 5 dias
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style={s.destacarTexto}>
          <Text style={{fontSize: 15, color: '#000'}}>
            {solicitacoesData.condicao}
          </Text>
        </View>
        <View style={s.destacarTexto}>
          <Text style={{fontSize: 15, color: '#000'}}>
            {solicitacoesData.estado}
          </Text>
        </View>
        <View style={s.destacarTexto}>
          <Text style={{fontSize: 15, color: '#000'}}>
            {solicitacoesData.inss}
          </Text>
        </View>
      </View>
    </View>
  );
}
