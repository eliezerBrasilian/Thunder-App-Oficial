import {format, fromUnixTime} from 'date-fns';
import {Alert, Linking, ToastAndroid} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';

export class Utils {
  static getNiches() {
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

    return nichos;
  }

  static dateFromFirestoreToBrasilianFormat(firestoreDate: any) {
    const firebaseDate = firestoreDate; // Exemplo de objeto de data do Firebase Firestore
    const dataUnix = firebaseDate.seconds;
    const dataBrasileira = format(
      fromUnixTime(dataUnix),
      'dd/MM/yyyy HH:mm:ss',
    );
    // console.log(dataBrasileira); // Saída: '12/10/2023 18:49:45'
    return dataBrasileira;
  }

  static showToast(message: string) {
    ToastAndroid.show(message, ToastAndroid.LONG);
  }
  static copytoclipboard(text: string, messageToShowInToast: string) {
    Clipboard.setString(text);
    this.showToast(messageToShowInToast);
  }

  static sendMessageToWhatsApp(content: any) {
    const message = this.generatePhraseForSendOnWhatsApp(
      content.appName,
      content.customerName,
      content.nicho,
    );
    console.log(message);
    Linking.openURL(
      `whatsapp://send?text=${message}&phone=55${content.phoneNumber}`,
    );
  }
  static generatePhraseForSendOnWhatsApp(
    appName: string,
    askerName: string,
    nicho: string,
  ) {
    var phrase = `Olá ${askerName}! Somos da equipe Thunder e estamos entrando em contato para conversarmos sobre o aplicativo *${appName}* de (${nicho}) que você quer criar. Quando estiver disponível, nos retorne por gentileza. Thunder agradece seu contato!`;

    this.copytoclipboard(phrase, 'frase copiada');

    return phrase;
  }
  static showAlert(onClick: () => void, title: string, text: string) {
    Alert.alert(
      title,
      text,
      [
        {
          text: 'Excluir',
          onPress: () => {
            onClick();
          },
        },
      ],
      {cancelable: true},
    );
  }
}
