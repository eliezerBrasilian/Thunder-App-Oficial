import {View, Text, TouchableOpacity} from 'react-native';
import {strings} from '../../../assets/strings';
import {colors} from '../../../assets/colors';
import {s} from '../style';
import Feather from 'react-native-vector-icons/Feather';
import {useState, useMemo} from 'react';
export default function Painel({contratos}) {
  const [aprovados, setAprovados] = useState(0);
  const [reprovados, setReprovados] = useState(0);
  const [emAnalise, setEmAnalise] = useState(0);
  const [contratosSize, setContratosSize] = useState(0);

  useMemo(() => {
    const totalAprovados = contratos.filter(
      contrato => contrato.aprovado === true,
    ).length;
    const totalReprovados = contratos.filter(
      contrato => contrato.reprovado === true,
    ).length;
    const totalEmAnalise = contratos.filter(
      contrato => contrato.em_analise === true,
    ).length;

    setContratosSize(contratos.length);

    setAprovados(totalAprovados);
    setReprovados(totalReprovados);
    setEmAnalise(totalEmAnalise);
  }, []);
  return (
    <View style={s.painelView}>
      <View style={s.painelHeader}>
        <Feather name="list" color={colors.main_green} size={30} />
        <Text style={s.painelTitle}>{strings.painel}</Text>
      </View>

      <View style={s.painelCards}>
        <View style={s.painelCardRow}>
          <Card
            backgroundColor={colors.painelGray}
            title={strings.total}
            total={contratosSize}
          />
          <Card
            backgroundColor={colors.painelOrange}
            title={strings.em_analise}
            total={emAnalise}
          />
        </View>
        <View style={s.painelCardRow}>
          <Card
            backgroundColor={colors.painelGreen}
            title={strings.aprovados}
            total={aprovados}
          />
          <Card
            backgroundColor={colors.painelPink}
            title={strings.reprovados}
            total={reprovados}
          />
        </View>
      </View>
    </View>
  );
}

function Card({backgroundColor, title, total}) {
  const textStyle = {fontSize: 18, color: '#000', fontWeight: '400'};
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        flex: 1,
        padding: 17,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
      }}>
      <Text style={textStyle}>{title}</Text>
      <Text style={textStyle}>{total}</Text>
    </View>
  );
}
