import {View, ScrollView} from 'react-native';
import Header from '../../components/Header';
import {Button} from '../../components/Button';
import {Input} from '../../components/Input';
import React from 'react';
import {Utils} from '../../utils/Utils';
import firestore from '@react-native-firebase/firestore';
export default function CreateCustomer() {
  const [whatsapp, setWhatsapp] = React.useState('');
  const [customerName, setCustomerName] = React.useState('');
  const [credentialLogin, setCredentialLogin] = React.useState('');
  const [credentialPassword, setCredentialPassword] = React.useState('');

  function handleCreationOfCustomer() {
    if (inputsAreValid()) createCustomer();
    else Utils.showToast('preencha todos os campos');
  }

  function createCustomer() {
    const userRef = firestore().collection('Users');
    userRef
      .add({
        credential: credentialLogin,
        credentialPassword: credentialPassword,
        email: null,
        firstInstallmentPayed: false,
        secondInstallmentPayed: false,
        photo: null,
        name: customerName,
        whatsapp: whatsapp,
        isAdmin: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
        uid: null,
      })
      .then(response => {
        const docId = response.id;
        userRef.doc(docId).update({uid: docId});
        Utils.showToast('cliente criado');
      });
  }

  function inputsAreValid() {
    return (
      whatsapp.trim() !== '' &&
      customerName.trim() !== '' &&
      credentialLogin.trim() !== '' &&
      credentialPassword.trim() !== ''
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
      <Header title={'Cadastrar Cliente'} />
      <ScrollView>
        <View>
          <Input
            label={'Nome do cliente'}
            placeholderText="Digite o nome do cliente"
            value={customerName}
            setValue={setCustomerName}
          />
          <Input
            label={'Credential de acesso'}
            placeholderText="Digite a credential de acesso"
            value={credentialLogin}
            setValue={setCredentialLogin}
          />
          <Input
            label={'Senha de acesso'}
            placeholderText="Digite a senha"
            value={credentialPassword}
            setValue={setCredentialPassword}
          />
          <Input
            label={'Número de WhatsApp'}
            placeholderText="Digite seu número"
            value={whatsapp}
            setValue={setWhatsapp}
            maskedInput={true}
          />

          <View
            style={{
              marginTop: 50,
              alignItems: 'center',
            }}>
            <Button
              fontWeight="bold"
              width={200}
              onClick={handleCreationOfCustomer}
              padding={16}
              borderRadius={25}>
              Criar Cliente
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
