import {TouchableOpacity, View} from 'react-native';

import {Button} from './Button';
import {TextContent} from './TextContent';
import {Utils} from '../utils/Utils';
import {colors} from '../assets/colors';
import firestore from '@react-native-firebase/firestore';

export default RequestItem = ({data}) => {
  function copyPhoneToClipboard() {
    Utils.copytoclipboard(data.whatsApp, 'número de WhatsApp copiado');
  }
  function copyNameToClipboard() {
    Utils.copytoclipboard(data.customerName, 'nome do solicitante copiado');
  }

  function showAlert(requestId) {
    Utils.showAlert(
      () => deleteRequest(requestId),
      'Thunder - Alerta',
      'Deseja excluir esse pedido?',
    );
  }

  function deleteRequest(requestId) {
    firestore().collection('Requests').doc(requestId).update({
      deleted: true,
    });
    Utils.showToast('pedido excluido');
  }

  return (
    <TouchableOpacity
      onLongPress={() => showAlert(data.id)}
      activeOpacity={0.8}
      style={{
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.thunder_green_color,
        padding: 10,
      }}>
      <TextContent fontWeight="bold">Nome do Aplicativo</TextContent>
      <TextContent>{data.appName}</TextContent>
      <View style={{marginTop: 10}} />
      <TextContent fontWeight="bold">Nome do Solicitante</TextContent>
      <TextContent onClick={copyNameToClipboard} clickable={true}>
        {data.customerName}
      </TextContent>
      <View style={{marginTop: 10}} />
      <TextContent fontWeight="bold">Nicho do aplicativo</TextContent>
      <TextContent>{data.nicho}</TextContent>
      <View style={{marginTop: 10}} />
      <TextContent fontWeight="bold">WhatsApp do Solicitante</TextContent>
      <TextContent onClick={copyPhoneToClipboard} clickable={true}>
        {data.whatsapp}
      </TextContent>
      <View style={{marginTop: 10}} />
      <TextContent fontWeight="bold">Data de criação</TextContent>
      <TextContent onClick={copyPhoneToClipboard} clickable={true}>
        {Utils.dateFromFirestoreToBrasilianFormat(data.createdAt)}
      </TextContent>

      <View style={{marginTop: 20}} />
      <Button
        onClick={() =>
          Utils.generatePhraseForSendOnWhatsApp(
            data.appName,
            data.customerName,
            data.nicho,
          )
        }
        backgroundColor={colors.thunder_green_color}
        width={300}
        padding={15}>
        <TextContent color="#fff">Gerar frase para WhatsApp</TextContent>
      </Button>
      <View style={{marginTop: 20}} />
      <Button
        onClick={() =>
          Utils.sendMessageToWhatsApp({
            appName: data.appName,
            customerName: data.customerName,
            nicho: data.nicho,
            phoneNumber: data.whatsapp,
          })
        }
        backgroundColor={colors.thunder_green_color}
        width={300}
        padding={15}>
        <TextContent color="#fff">Enviar mensagem no WhatsApp</TextContent>
      </Button>
    </TouchableOpacity>
  );
};
