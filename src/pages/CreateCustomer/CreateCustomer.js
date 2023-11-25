import {View, ScrollView} from 'react-native';
import Header from '../../components/Header';
import {Button} from '../../components/Button';
import {Input} from '../../components/Input';
import React from 'react';
import {Utils} from '../../utils/Utils';
import firestore from '@react-native-firebase/firestore';
export default function CreateCustomer() {
  const [customerName, setCustomerName] = React.useState('');
  const [credentialLogin, setCredentialLogin] = React.useState('');
  const [credentialPassword, setCredentialPassword] = React.useState('');
  const [whatsapp, setWhatsapp] = React.useState('');

  async function handleCreationOfCustomer() {
    if (inputsAreValid()) await createCustomer();
    else Utils.showToast('preencha todos os campos');
  }

  async function createCustomer() {
    const credentialAvailable = await credentialInformedForLoginIsAvailable(
      credentialLogin,
    );
    if (credentialAvailable) {
      console.log('available');

      const userRef = firestore().collection('Users');
      userRef
        .add({
          apps: 0,
          credential: credentialLogin,
          credentialPassword: credentialPassword,
          deleted: false,
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
    } else Utils.showToast('esta credential já está em uso');
  }

  async function credentialInformedForLoginIsAvailable(credential) {
    const credentialFounded = await firestore()
      .collection('Users')
      .where('credential', '==', credential)
      .get();
    return credentialFounded.empty;
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
