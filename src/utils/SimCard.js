import {PERMISSIONS, check, request} from 'react-native-permissions';

export class SimCard {
  static async checkSimCard(method) {
    const rationale = {
      title: 'Permissão de SimCard',
      message:
        'O aplicativo precisa acessar o armazenamento externo para salvar os seus arquivos.',
      buttonNeutral: 'Pergunte-me depois',
      buttonNegative: 'Cancelar',
      buttonPositive: 'OK',
    };
    check(PERMISSIONS.ANDROID.READ_PHONE_NUMBERS).then(r => console.log(r));
    request(PERMISSIONS.ANDROID.READ_PHONE_NUMBERS, rationale).then(
      async status => {
        console.log(status);
        method();
      },
    );
  }
}
