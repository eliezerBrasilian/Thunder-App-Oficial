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
export default function PrimeiroAcesso() {
  const {updatingTrackingId} = useAsyncStorage();
  const nav = useNavigation();
  const [modalTermosDeServicoVisible, setModalTermosDeServicoVisible] =
    useState(false);
  const [isOtimasNoticiasModalVisible, setOtimasNoticiasModalVisible] =
    useState(false);
  const {user} = useContext(AuthContext);
  const [] = useState('');
  const [nome] = useState(user.name);
  const [telefone] = useState(user.phone);
  const [cep, setCep] = useState('06411150');
  const [cnpj, setCNPJ] = useState('12011493000144');
  const [receitaMensal, setReceitaMensal] = useState('50000'); //String(user?.receita_anual)
  const [email] = useState(user.email);
  const [montantePedido, setMontantePedido] = useState('10000');
  const [receitaAnual, setReceitaAnual] = useState('50000'); //String(user?.receita_anual)
  const [businessName, setBusinessName] = useState('Coca-Cola');
  const [cargo] = useState('Sócio / Proprietário');
  const [termConfirmed, setTermConfirmed] = useState(false);
  const [termConfirmedBelow, setTermConfirmedBelow] = useState(false);
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);

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
  async function getStringIdQred() {
    const REASON_CAPITAL_GIRO = '2';
    const PRAZO_PAGAMENTO = 12;
    try {
      const data = {
        amount: Number(montantePedido),
        zipCode: cep.toString(),
        cnpj: cnpj.toString(),
        email: email.toString(),
        installments: PRAZO_PAGAMENTO,
        name: nome.toString(),
        phone: telefone.toString(),
        reason: REASON_CAPITAL_GIRO,
        revenues: Number(receitaMensal),
        role: cargo.toString(),
      };

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://partner-api-sandbox.qred.com.br/v1/application',
        headers: {
          'x-api-key': 'Itm5tXJAVHahuBU5LRj8C4gVEb0TPzbb4WaYkWvJ',
          Authorization: `Bearer ${user.qredToken}`,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      };

      const response = await axios.request(config);
      console.log('SUCCESS');
      console.log(JSON.stringify(response.data));

      updateAsyncStorageData();
      setOtimasNoticiasModalVisible(false);

      return response.data;
    } catch (error) {
      console.log(error.response);
      setOtimasNoticiasModalVisible(false);
      return null;
    }
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
        <Header title={strings.capital_giro} color={colors.main_blue} />
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
              label={strings.cnpj}
              placeholderColor="#A0A0A0"
              placeholderText={strings.cnpj_placeholder}
              backgroundColor="#F6F6F6"
              value={cnpj}
              setValue={setCNPJ}
              isMaskInput={true}
              mask={Masks.BRL_CNPJ}
              keyboardType="numeric"
            />
            <Input
              label={strings.nome_empresa_label}
              placeholderColor="#A0A0A0"
              placeholderText={strings.nome_empresa_placeholder}
              backgroundColor="#F6F6F6"
              value={businessName}
              setValue={setBusinessName}
            />
            <Input
              label={strings.receita_mensal}
              placeholderColor="#A0A0A0"
              placeholderText={strings.receita_mensal_placeholder}
              backgroundColor="#F6F6F6"
              value={receitaMensal}
              setValue={setReceitaMensal}
              isMaskInput={true}
              mask={Masks.BRL_CURRENCY}
              keyboardType="numeric"
            />
            <Input
              label={strings.montante_label}
              placeholderColor="#A0A0A0"
              placeholderText={strings.montante_placeholder}
              backgroundColor="#F6F6F6"
              value={montantePedido}
              setValue={setMontantePedido}
              isMaskInput={true}
              mask={Masks.BRL_CURRENCY}
              keyboardType="numeric"
            />
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
            <View style={s.termView}>
              <BouncyCheckbox
                size={25}
                fillColor={colors.main_blue}
                text="Custom Checkbox"
                disableText={true}
                iconStyle={{borderColor: colors.main_blue}}
                innerIconStyle={{borderWidth: 2}}
                textStyle={{fontFamily: 'JosefinSans-Regular'}}
                onPress={isChecked => setTermConfirmedBelow(isChecked)}
                isChecked={true}
              />
              <Text style={s.term}>
                Estou de acordo que a{' '}
                <Text
                  onPress={goToFicashWebsite}
                  style={[s.term, {color: colors.main_blue}]}>
                  Ficash
                </Text>{' '}
                e seus parceiros financiadores acessem informações da empresa
                cadastrada.
              </Text>
            </View>
            <Button
              onclick={sendBusinessData}
              backgroundColor={colors.main_blue}
              title={strings.cadastrar_minha_empresa}
            />
          </View>
        )}
      </View>
    </Modal>
  );
}
