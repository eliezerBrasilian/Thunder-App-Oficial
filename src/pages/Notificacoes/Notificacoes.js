import Vazio from '../../components/Vazio';
import Header from '../../components/Header';
import {View} from 'react-native';
export default function Notificacoes() {
  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
      <Header title={'Notificações'} />
      <Vazio
        image={require('../../assets/images/no_notifications.png')}
        description={'Sem notificações no momento!'}
      />
    </View>
  );
}
