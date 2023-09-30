import {View, Text, TouchableOpacity} from 'react-native';
import {ContratoContext} from '../../../contexts/ContratosContext';
import {strings} from '../../../assets/strings';
import {colors} from '../../../assets/colors';
import {useContext} from 'react';
import Painel from './Painel';
import Solicitacoes from './Solicitacoes';
import SemContratos from '../../../components/Vazio';
export default function EmAndamento() {
  const {contratos} = useContext(ContratoContext);

  return (
    <View style={{flex: 1, backgroundColor: colors.light}}>
      {contratos.length == 0 ? (
        <SemContratos
          image={require('../../../assets/images/piggy.png')}
          description={strings.nao_possui_contratos}
        />
      ) : (
        <>
          <Painel contratos={contratos} />
          <Solicitacoes />
        </>
      )}
    </View>
  );
}
