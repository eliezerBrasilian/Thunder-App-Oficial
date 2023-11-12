import {ToastAndroid, Alert} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
export class Utils {
  static showToast(message: string) {
    ToastAndroid.show(message, ToastAndroid.LONG);
  }
  static copytoclipboard(text: string, messageToShowInToast: string) {
    Clipboard.setString(text);
    this.showToast(messageToShowInToast);
  }
  static generatePhraseForSendOnWhatsApp(
    appName: string,
    askerName: string,
    nicho: string,
  ) {
    var phrase = `Olá ${askerName}! Somos da equipe Thunder e estamos entrando em contato para conversarmos sobre o aplicativo *${appName}* de (${nicho}) que você quer criar. Quando estiver disponível, nos retorne por gentileza. Thunder agradece seu contato!`;
    this.copytoclipboard(phrase, 'frase copiada');
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
