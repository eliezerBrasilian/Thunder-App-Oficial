import Header from '../../components/Header';
import {View, ScrollView} from 'react-native';
import {TextContent} from '../../components/TextContent';
import {Spinner} from '../../components/Spinner';
import React from 'react';
import {Button} from '../../components/Button';
import {Input} from '../../components/Input';
import Alert from '../../components/Alert';
import firestore from '@react-native-firebase/firestore';
export default function Contratar() {
  const nichos = [
    {key: '1', value: 'Alimentação'},
    {key: '2', value: 'Bebida'},
    {key: '4', value: 'Delivery'},
    {key: '5', value: 'Educação'},
    {key: '7', value: 'Estética'},
    {key: '8', value: 'Lazer'},
    {key: '9', value: 'Saúde'},
    {key: '10', value: 'Transporte'},
    {key: '11', value: 'Vestuário'},
  ];

  const [nichoSelected, setNichoSelected] = React.useState('Estética');
  const [placeholder, setPlaceholder] = React.useState('Nicho do aplicativo');
  const [appName, setAppName] = React.useState('');
  const [whatsapp, setWhatsapp] = React.useState('');
  const [customerName, setCustomerName] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  function checkInfo() {
    if (
      appName.trim() !== '' &&
      whatsapp.trim() !== '' &&
      appName.trim() !== '' &&
      customerName.trim() !== ''
    ) {
      if (whatsapp.trim().length < 15) {
        console.log('whas inc');
        setErrorMessage('WhatsApp está incompleto');
        setModalVisible(true);
        return;
      } else if (customerName.trim().length < 5) {
        setErrorMessage('Seu nome está muito curto');
        setModalVisible(true);
        return;
      } else sendRequest();
    } else {
      setErrorMessage('Preencha todos os dados');
      setModalVisible(true);
      console.log('preencha todos os dados');
    }
  }
  function sendRequest() {
    firestore()
      .collection('Pedidos')
      .add({
        appName: appName,
        createdAt: firestore.FieldValue.serverTimestamp(),
        customerName: customerName,
        nicho: nichoSelected,
        whatsapp: whatsapp,
      })
      .then(() => {
        setModalVisible(true);
      });
  }
  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
      <Header titleColor="#4397A9" color="#4397A9" title={'Contratar'} />
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View>
          <TextContent fontSize={18} fontWeight="600">
            Preencha os campos abaixo para que nossa equipe, possa entrar em
            contato.
          </TextContent>

          <View style={{marginTop: 40}}>
            <TextContent fontWeight="bold"></TextContent>

            <Spinner
              data={nichos}
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
          <Input
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
              Enviar informações
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
