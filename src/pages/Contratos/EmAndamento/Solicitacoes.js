import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {strings} from '../../../assets/strings';
import {colors} from '../../../assets/colors';
import {s} from '../style';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InputSearch from '../../../components/InputSearch';
import SolicitacaoItem from './SolicitacoesItem';
import {ContratoContext} from '../../../contexts/ContratosContext';
import {useContext} from 'react';
export default function SolicitacoesHeader() {
  //solicitacoes vao vir do banco
  const {contratos} = useContext(ContratoContext);

  return (
    <View style={s.solicitacoesView}>
      <View style={s.solicitacoesHeading}>
        <View style={s.solicitacoesHeadingLeft}>
          <Feather name="list" color={colors.main_green} size={25} />
          <Text style={s.painelTitle}>{strings.solicitacoes}</Text>
        </View>
        <FontAwesome name="filter" color={colors.main_blue} size={24} />
      </View>

      <InputSearch padding={12} fontSize={17} iconSize={25} />

      <FlatList
        data={contratos}
        renderItem={({item}) => <SolicitacaoItem solicitacoesData={item} />}
        contentContainerStyle={{rowGap: 10}}
      />
    </View>
  );
}
