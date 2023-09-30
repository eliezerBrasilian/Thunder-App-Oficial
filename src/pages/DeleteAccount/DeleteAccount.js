import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import {View} from 'react-native';
import {TextContent} from '../../components/TextContent';
import Header from '../../components/Header';
import {Button} from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../contexts/AuthContext';
import {useContext} from 'react';
export default function DeleteAccount() {
  const {deleteAccount, isDeleting} = useContext(AuthContext);
  const nav = useNavigation();

  async function handleDeleteAccount() {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Aviso',
      textBody: 'Tem certeza? Essa operação não tem volta!',
      button: 'Excluir conta',
      onPressButton: async () => {
        await deleteAccount();
      },
    });
  }
  return (
    <AlertNotificationRoot>
      <View style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
        <Header title={'Excluir Conta'} />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextContent title={'Essa é uma operação sem volta'} fontSize={20} />
          <TextContent
            title={'Ainda assim deseja excluir sua conta?'}
            fontSize={20}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              columnGap: 40,
              marginTop: 30,
            }}>
            <Button
              title={'Excluir'}
              padding={15}
              fontSize={19}
              backgroundColor="#d90429"
              onClick={handleDeleteAccount}
              isLoading={isDeleting}
              width={120}
            />
            <Button
              title={'Cancelar'}
              padding={15}
              fontSize={19}
              backgroundColor="#00a8e8"
              onClick={function () {
                nav.goBack();
              }}
              width={120}
            />
          </View>
        </View>
      </View>
    </AlertNotificationRoot>
  );
}
