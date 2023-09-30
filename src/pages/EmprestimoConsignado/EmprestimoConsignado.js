import {s} from './style';
import Header from '../../components/Header';
import {
  View,
  ScrollView,
  Text,
  Modal,
  Linking,
  Alert,
  Keyboard,
  StyleSheet,
} from 'react-native';
import {strings} from '../../assets/strings';
import {colors} from '../../assets/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import TermosUso from './TermosDeUso';
import Button from '../../components/AuthComponents/Button';
import OtimasNoticias from './OtimasNoticiasModal';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useAsyncStorage} from '../../contexts/AsyncStorage';
import {Spinner} from '../../components/Spinner';
import {useEmprestimoConsignado} from '../../contexts/EmprestimoConsignadoContext';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
export default function PrimeiroAcesso() {
  const {updatingTrackingId} = useAsyncStorage();
  const {fazerSolicitacaoEmprestimoConsignado} = useEmprestimoConsignado();
  const nav = useNavigation();
  const [modalTermosDeServicoVisible, setModalTermosDeServicoVisible] =
    useState(false);
  const [isOtimasNoticiasModalVisible, setOtimasNoticiasModalVisible] =
    useState(false);
  const {user} = useContext(AuthContext);

  const [termConfirmed, setTermConfirmed] = useState(false);
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const [states, setStates] = useState([]);
  const [stateSelected, setStateSelected] = useState('');
  const categorias = [
    {
      key: '1',
      value: 'Aposentado',
    },
    {
      key: '2',
      value: 'Forças Armadas',
    },
    {
      key: '3',
      value: 'Pensionista',
    },
  ];
  const [categoriaSelected, setCategoriaSelected] = useState('');
  const convenios = [
    {
      key: '1',
      value: 'INSS',
    },
    {
      key: '2',
      value: 'SIAPE',
    },
  ];
  const [convenioSelected, setConvenioSelected] = useState('');
  const [loading, setLoading] = useState(false);
  async function getEstados() {
    try {
      const queryParams = {
        orderBy: 'nome',
      };
      const response = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
        {params: queryParams},
      );
      //console.log(response.data);

      const newData = [];

      // Percorra os dados da API e crie o novo formato
      response.data.forEach(item => {
        const newItem = {
          key: item.id.toString(), // Converta o ID para string
          value: item.nome + ' - ' + item.sigla, // Use o nome da região como o valor
        };

        newData.push(newItem);
      });
      // newData.forEach(i => {
      //   console.log(i);
      // });
      setStates(newData);
    } catch (error) {
      console.log(
        'error on get states - EmprestimoConsignado.js getEstados(): ',
        error,
      );
    }
  }
  useEffect(() => {
    getEstados();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleKeyboardDidShow = () => {
    setKeyboardOpen(true);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardOpen(false);
  };

  function goBack() {
    nav.goBack();
  }
  async function handleSolicitacaoEmprestimoConsignado() {
    setLoading(true);
    if (
      termConfirmed &&
      stateSelected !== '' &&
      convenioSelected !== '' &&
      categoriaSelected !== ''
    ) {
      const solicitou = await fazerSolicitacaoEmprestimoConsignado(
        stateSelected,
        convenioSelected,
        categoriaSelected,
      );
      if (solicitou) {
        setLoading(false);
        console.log('solicitou');
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Sucesso',
          textBody: 'Parabéns! Sua solicitação foi enviada com sucesso',
          button: 'close',
          onPressButton: function () {
            goBack();
          },
          onHide: () => {
            goBack();
          },
        });
      } else {
        setLoading(false);
        console.log('nao solicitou');
      }
    } else Alert.alert(strings.fill_all);
    // else {
    //   //processData();
    // }
  }
  function toggleTermConfirmedModal() {
    setModalTermosDeServicoVisible(!modalTermosDeServicoVisible);
    console.log('clicked: ' + modalTermosDeServicoVisible);
  }

  async function goToFicashWebsite() {
    const url = strings.link;
    const supported = await Linking.canOpenURL(url);
    if (!supported) return;
    console.log('is suportted: ' + supported);
    await Linking.openURL(url);
  }

  return (
    <Modal onRequestClose={() => nav.goBack()}>
      <AlertNotificationRoot>
        <View style={s.main}>
          <Header title={'Empréstimo Consignado'} color={colors.main_blue} />
          <ScrollView>
            <View>
              <Text style={s.heading}>{strings.heading_capital_de_giro}</Text>

              <Spinner
                data={categorias}
                label={'Empréstimo para'}
                placeholder={'Selecione a opção correspondente'}
                setSelected={setCategoriaSelected}
              />
              <Spinner
                data={convenios}
                label={'Convênio aposentado'}
                placeholder={'Selecione o tipo de convênio'}
                setSelected={setConvenioSelected}
              />
              <Spinner
                data={states}
                label={'Estado pelo qual se aposentou'}
                placeholder={'Selecione o estado'}
                setSelected={setStateSelected}
              />
              <TermosUso
                method={toggleTermConfirmedModal}
                isModalVisible={modalTermosDeServicoVisible}
              />
              <OtimasNoticias
                isModalVisible={isOtimasNoticiasModalVisible}
                setModalVisible={setOtimasNoticiasModalVisible}
              />
            </View>
          </ScrollView>

          {!isKeyboardOpen && (
            <View>
              <View style={s.termView}>
                <BouncyCheckbox
                  size={25}
                  fillColor={colors.main_blue}
                  text="Custom Checkbox"
                  disableText={true}
                  iconStyle={{borderColor: colors.main_blue}}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{fontFamily: 'JosefinSans-Regular'}}
                  isChecked={termConfirmed}
                  onPress={isChecked => setTermConfirmed(isChecked)}
                />
                <Text style={s.term}>
                  Estou de acordo com os{' '}
                  <Text
                    onPress={toggleTermConfirmedModal}
                    style={[s.term, {color: colors.main_blue}]}>
                    Termos e Condições{' '}
                  </Text>
                  de uso da Plataforma.
                </Text>
              </View>

              <Button
                onclick={handleSolicitacaoEmprestimoConsignado}
                backgroundColor={colors.main_green}
                title={'Enviar Solicitação'}
                isLoading={loading}
              />
            </View>
          )}
        </View>
      </AlertNotificationRoot>
    </Modal>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#000',
    fontSize: 17,
    marginVertical: 14,
  },
});
