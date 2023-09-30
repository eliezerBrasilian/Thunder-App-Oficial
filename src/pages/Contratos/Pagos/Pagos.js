import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {ContratoContext} from '../../../contexts/ContratosContext';
import {useContext} from 'react';
import {strings} from '../../../assets/strings';
import {colors} from '../../../assets/colors';
import {s} from './style';
import SemContratos from '../../../components/Vazio';
export default function Pagos() {
  const {contratos, setContratos} = useContext(ContratoContext);
  return (
    <View style={s.pagosMain}>
      {contratos.length == 0 ? (
        <SemContratos
          description={strings.sem_contratos}
          image={require('../../../assets/images/sem_contrato.png')}
        />
      ) : (
        <View style={{flex: 1, width: '100%'}}>
          <FlatList
            data={contratos}
            renderItem={({item}) => <ContratoPago pagos={item} />}
            contentContainerStyle={{rowGap: 20}}
          />
        </View>
      )}
    </View>
  );
}

function ContratoPago({pagos}) {
  if (pagos.pago)
    return (
      <View style={s.card}>
        <View style={s.cardOnTop}>
          <Image
            style={s.cardIconePago}
            source={require('../../../assets/images/ok_pago.png')}
            resizeMode="contain"
          />
          <Text style={s.cardOnTopText}>{strings.pago}</Text>
        </View>

        <View style={{rowGap: 10}}>
          <Text style={s.cardValorContratoTitle}>{strings.valor_contrato}</Text>
          <Text style={s.cardValorContrato}>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(pagos.valor)}
          </Text>
        </View>
        <TouchableOpacity style={s.cardVerDetalhesContainer}>
          <Text style={s.cardVerDetalhes}>{strings.ver_detalhes}</Text>
        </TouchableOpacity>
      </View>
    );
}
