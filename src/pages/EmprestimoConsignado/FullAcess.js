import {useState, useEffect, useContext, useMemo} from 'react';
import {Text, View, ScrollView, Image, Modal} from 'react-native';

import {strings} from '../../assets/strings';
import {colors} from '../../assets/colors';
import Header from '../../components/Header';
import {s} from './style';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../contexts/AuthContext';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
export default function FullAccess() {
  const {user} = useContext(AuthContext);

  const [qredStatus, setQredStatus] = useState('');
  const [qredTrackingId, setQredTrackingId] = useState(user?.qred_tracking_id);
  const [faturamento_mensal, setFaturamentoMensal] = useState(
    user?.faturamento_mensal,
  );
  const nav = useNavigation();

  useEffect(() => {
    // console.log('qred_na memoria: ' + );

    async function fetchData() {
      const qredStatusData = await getQredStatus(qredTrackingId);
      if (qredStatusData !== null) {
        console.log('qredStatus: ' + JSON.stringify(qredStatusData));
        console.log('qredStatus.status:', qredStatusData.status);
        console.log('qredStatus.reason:', qredStatusData.reason);
        setQredStatus(qredStatusData.status.toLowerCase());
        await sendQredDataToWordpress(qredStatusData.status.toLowerCase());
      }
    }

    fetchData();
    //sendQredDataToWordpress('em_analise');
  }, []);

  async function getQredStatus(qred_tracking_id) {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://partner-api-sandbox.qred.com.br/v1/application/${qred_tracking_id}`,
      headers: {
        Authorization: `Bearer ${user.qredToken}`,
        'x-api-key': 'Itm5tXJAVHahuBU5LRj8C4gVEb0TPzbb4WaYkWvJ',
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.log(error.response);
      return null;
    }
  }
  async function sendQredDataToWordpress(qred_status) {
    const data = {
      status_atual: qred_status,
    };

    try {
      const response = await axios.put(
        `http://192.168.100.31:8686/capital_giro/${qredTrackingId}`,
        data,
      );
      console.log('SUCESSO: ' + response);
      return true;
    } catch (error) {
      console.log('erro: ', error.response);
      return false;
    }
  }
  return (
    <Modal onRequestClose={() => nav.navigate('Home')}>
      <View style={s.main}>
        <Header
          action="goHome"
          color={colors.main_blue}
          title={strings.capital_giro}
        />
        <Text style={s.heading}>{strings.financiadores_ativos}</Text>
        <Text style={s.paragraph}>
          {strings.todas_as_instituicoes_financeiras_abaixo}
        </Text>
        <ScrollView>
          <View>
            <QREDCard qredStatus={qredStatus} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

function QREDCard({qredStatus}) {
  const [status, setStatus] = useState('');
  useMemo(() => {
    switch (qredStatus) {
      case 'cancelled_by_client_reason':
        setStatus('REPROVADO');
        break;
      case 'screening':
        setStatus('EM ANÁLISE');
        break;
      case 'pre_approval':
        setStatus('PRÉ APROVADO');
        break;
      case 'credit_analyse':
        setStatus('ANÁLISANDO CREDITO');
        break;
      case 'signed_contract':
        setStatus('APROVADO');
        break;

      default:
        setStatus('PROCESSANDO...');
        break;
    }
  }, [qredStatus]);

  return (
    <View style={s.cardView}>
      <View style={s.cardTop}>
        <Text style={[s.cardTitle, {color: '#272727'}]}>
          {strings.qredbrasil}
        </Text>
        <Image
          source={require('../../assets/images/qred.png')}
          style={{height: 40, width: 50, borderRadius: 10}}
        />
      </View>
      <Text style={[s.cardTitle, {fontSize: 18, marginTop: 10}]}>
        Até R$ 100.000,00
      </Text>
      <Text style={[s.cardTitle, {fontSize: 17, fontWeight: '400'}]}>
        {strings.taxas_a_partir_de}2,89% a.m
      </Text>
      <Text style={[s.cardTitle, {fontSize: 17, fontWeight: '400'}]}>
        {strings.prazo_de_ate}18 meses
      </Text>
      <View style={s.footer}>
        <Text
          style={[
            s.cardTitle,
            {
              fontSize: 16,
              fontWeight: '500',
              backgroundColor: '#B0FF92',
              color: '#169873',
              padding: 5,
              marginTop: 20,
              borderRadius: 8,
            },
          ]}>
          {status}
        </Text>
        <Text
          style={[
            s.cardTitle,
            {
              fontSize: 16,
              fontWeight: '500',
              backgroundColor: '#B0FF92',
              color: '#169873',
              padding: 5,
              marginTop: 20,
              borderRadius: 8,
            },
          ]}>
          $
        </Text>
      </View>
    </View>
  );
}
