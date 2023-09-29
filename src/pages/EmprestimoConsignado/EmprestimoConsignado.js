import {s} from './style';
import Header from '../../components/AuthComponents/Header';
import Input from '../../components/AuthComponents/Input';
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
import {Masks} from 'react-native-mask-input';
import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import TermosUso from './TermosDeUso';
import Button from '../../components/AuthComponents/Button';
import OtimasNoticias from './OtimasNoticiasModal';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import {useAsyncStorage} from '../../contexts/AsyncStorage';
import {SelectList} from 'react-native-dropdown-select-list';
import {Spinner} from '../../components/Spinner';
export default function PrimeiroAcesso() {
  const {updatingTrackingId} = useAsyncStorage();
  const nav = useNavigation();
  const [modalTermosDeServicoVisible, setModalTermosDeServicoVisible] =
    useState(false);
  const [isOtimasNoticiasModalVisible, setOtimasNoticiasModalVisible] =
    useState(false);
  const {user} = useContext(AuthContext);
  const nome = useState(user.name);
  const telefone = useState(user.phone);
  const [cep, setCep] = useState('');
  const email = useState(user.email);
  const [termConfirmed, setTermConfirmed] = useState(false);
  const [termConfirmedBelow, setTermConfirmedBelow] = useState(false);
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const [states, setStates] = useState([]);
  const [stateSelected, setStateSelected] = useState([]);
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
  const [categoriaSelected, setCategoriaSelected] = useState([]);
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
  const [convenioSelected, setConvenioSelected] = useState([]);

  async function getEstados() {
    try {
      const queryParams = {
        orderBy: 'nome',
      };
      const response = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
        {params: queryParams},
      );
      console.log(response.data);

      const newData = [];

      // Percorra os dados da API e crie o novo formato
      response.data.forEach(item => {
        const newItem = {
          key: item.id.toString(), // Converta o ID para string
          value: item.nome + ' - ' + item.sigla, // Use o nome da região como o valor
        };

        newData.push(newItem);
      });
      newData.forEach(i => {
        console.log(i);
      });
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

  async function updateDataOnFirestore(
    cnpj,
    faturamento_mensal,
    businessName,
    cargo,
    montantePedido,
    QRED_TRACKING_ID,
  ) {
    await firestore()
      .collection('users')
      .doc(user.user_id)
      .update({
        faturamento_mensal: Number(faturamento_mensal),
        cnpj: cnpj,
        nome_empresa: businessName,
        cargo: cargo,
        montante_solicitado: Number(montantePedido),
        qred_tracking_id: QRED_TRACKING_ID,
      })
      .then(e => {
        console.log('campos de capital de giro atualizados no firestore');
      })
      .catch(e => {
        console.log('erro au atualizar campos de capital de giro: ' + e);
      });
  }

  async function handleAsyncStorage(trackingId) {
    await updatingTrackingId(trackingId);
  }

  async function processData() {
    setOtimasNoticiasModalVisible(true);
    //logica de enviar as informacoes para as APIs

    let trackingId = await getStringIdQred();

    if (trackingId != null) {
      const QRED_TRACKING_ID = trackingId.trackingId;
      console.log('qred trackingID data: ' + JSON.stringify(trackingId));
      console.log('qred_trackingId: ' + QRED_TRACKING_ID);
      await sendQredDataToWordpress(QRED_TRACKING_ID);
      await handleAsyncStorage(QRED_TRACKING_ID);
      await updateDataOnFirestore(
        cnpj,
        receitaMensal,
        businessName,
        cargo,
        montantePedido,
        QRED_TRACKING_ID,
      );
      nav.navigate('FullAccess');
    }
  }

  async function sendQredDataToWordpress(QRED_TRACKING_ID) {
    const new_qred_data = {
      nome: user.name,
      cpf: user.cpf,
      email: user.email,
      cnpj: user.cnpj,
      faturamento: user.faturamento_mensal, //deve vir do firebase
      qredTrackingId: QRED_TRACKING_ID,
      status_atual: 'screening',
      user_id: user.user_id,
      telefone: user.phone,
    };

    try {
      const response = await axios.post(
        'http://192.168.100.31:8686/capital_giro',
        new_qred_data,
      );
      console.log('SUCESSO: ' + response);
      return true;
    } catch (error) {
      console.log('erro: ', error.response);
      return false;
    }
  }
  function sendBusinessData() {
    // if (
    //   cnpj.trim() == '' ||
    //   receitaAnual.trim() == '' ||
    //   businessName.trim() == '' ||
    //   termConfirmed ||
    //   termConfirmedBelow
    // )
    if (
      cnpj.trim() == '' ||
      receitaAnual.trim() == '' ||
      businessName.trim() == '' ||
      termConfirmed
    )
      Alert.alert(strings.fill_all);
    else {
      processData();
    }
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
      <View style={s.main}>
        <Header title={'Empréstimo Consignado'} color={colors.main_blue} />
        <ScrollView>
          <View>
            <TermosUso
              method={toggleTermConfirmedModal}
              isModalVisible={modalTermosDeServicoVisible}
            />
            <OtimasNoticias
              isModalVisible={isOtimasNoticiasModalVisible}
              setModalVisible={setOtimasNoticiasModalVisible}
            />
            <Text style={s.heading}>{strings.heading_capital_de_giro}</Text>

            <Input
              label={strings.cep_label}
              placeholderColor="#A0A0A0"
              placeholderText={strings.cep_placeholder}
              backgroundColor="#F6F6F6"
              value={cep}
              setValue={setCep}
              isMaskInput={true}
              mask={Masks.ZIP_CODE}
              keyboardType="numeric"
            />
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
                isChecked={true}
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
              onclick={sendBusinessData}
              backgroundColor={colors.main_green}
              title={'Enviar Solicitação'}
            />
          </View>
        )}
      </View>
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
