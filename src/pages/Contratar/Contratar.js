import {ScrollView, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import React from 'react';
import SmsRetriever from 'react-native-sms-retriever';
import Alert from '../../components/Alert';
import {Button} from '../../components/Button';
import Header from '../../components/Header';
import {Input} from '../../components/Input';
import {Spinner} from '../../components/Spinner';
import {TextContent} from '../../components/TextContent';
import {TextSimilarToInputComponent} from '../../components/TextSimilarToInputComponent';
import {SimCard} from '../../utils/SimCard';
import {Utils} from '../../utils/Utils';

export default function Contratar() {
  const [nichoSelected, setNichoSelected] = React.useState('Estética');
  const [placeholder, setPlaceholder] = React.useState('Nicho do aplicativo');
  const [appName, setAppName] = React.useState('');
  const [whatsapp, setWhatsapp] = React.useState('');
  const [customerName, setCustomerName] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  React.useEffect(() => {
    SimCard.checkSimCard(loadSimCard);
    //getSimCard();
    //setupSimCard();
  }, []);

  const loadSimCard = async () => {
    do {
      const phoneNumber = await getSimCard();
      if (phoneNumber !== null) {
        setWhatsapp(phoneNumber);
        break;
      }
    } while (true);
  };

  async function getSimCard() {
    try {
      const number = await SmsRetriever.requestPhoneNumber();
      return number.substring(3);
    } catch (error) {
      return null;
    }
  }

  function checkInfo() {
    if (
      appName.trim() !== '' &&
      whatsapp.trim() !== '' &&
      appName.trim() !== '' &&
      customerName.trim() !== ''
    ) {
      if (whatsapp.trim() == '') {
        console.log('whas inc');
        setErrorMessage('WhatsApp está incompleto');
        setModalVisible(true);
        return;
      } else if (customerName.trim().length < 5) {
        setErrorMessage('Seu nome está muito curto');
        setModalVisible(true);
        return;
      } else {
        setErrorMessage(null);
        sendRequest();
      }
    } else {
      setErrorMessage('Preencha todos os campos');
      setModalVisible(true);
      console.log('preencha todos os dados');
    }
  }
  function sendRequest() {
    firestore()
      .collection('Requests')
      .add({
        appName: appName,
        createdAt: firestore.FieldValue.serverTimestamp(),
        customerName: customerName,
        nicho: nichoSelected,
        whatsapp: whatsapp,
        deleted: false,
      })
      .then(() => {
        setModalVisible(true);
      });
  }
  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
      <Header titleColor="#4397A9" color="#4397A9" title={'Fazer orçamento'} />
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View>
          <TextContent fontSize={18} fontWeight="600">
            Preencha os campos abaixo para que nossa equipe, possa entrar em
            contato.
          </TextContent>

          <View style={{marginTop: 40}}>
            <TextContent fontWeight="bold"></TextContent>

            <Spinner
              data={Utils.getNiches()}
              placeholder={placeholder}
              setSelected={setNichoSelected}
              nichoSelected={nichoSelected}
            />
          </View>
          <Input
            label={'Nome do aplicativo'}
            placeholderText="Qual será o nome do aplicativo?"
            value={appName}
            setValue={setAppName}
          />
          <TextSimilarToInputComponent
            label={'Número de WhatsApp'}
            placeholderText="Digite seu número"
            value={whatsapp}
            setValue={setWhatsapp}
            maskedInput={true}
          />
          <Input
            label={'Nome do solicitante'}
            placeholderText="Digite seu nome"
            value={customerName}
            setValue={setCustomerName}
          />

          <View
            style={{
              marginTop: 50,
              alignItems: 'center',
            }}>
            <Button
              fontWeight="bold"
              width={200}
              onClick={checkInfo}
              padding={16}
              borderRadius={25}>
              Fazer orçamento
            </Button>
          </View>
          <Alert
            message={errorMessage}
            setErrorMessage={setErrorMessage}
            visible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      </ScrollView>
    </View>
  );
}
