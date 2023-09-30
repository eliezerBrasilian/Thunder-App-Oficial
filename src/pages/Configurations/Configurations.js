import {View, Modal, ScrollView} from 'react-native';
import Header from './Header';
import {s} from './style';
import ListItem from './ListItem';
import {strings} from '../../assets/strings';
import Footer from './Footer';
import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../assets/colors';
export default function Configurations() {
  const {user} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    return () => {
      setModalVisible(false);
    };
  });
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={s.mainContent}>
        <Header name={user.name} />
        <ListItem
          title={strings.dados_pessoais}
          icon={
            <FontAwesome name={'user-o'} color={colors.main_blue} size={30} />
          }
          goTo="DadosPessoais"
        />

        <ListItem
          title={strings.seguranca}
          icon={
            <FontAwesome name={'lock'} color={colors.main_blue} size={34} />
          }
          goTo="Seguranca"
        />
        <ListItem
          title={strings.fale_conosco}
          icon={<Entypo name={'chat'} color={colors.main_blue} size={30} />}
          goTo={'ChatTab'}
        />
        <ListItem
          title={strings.excluir_conta}
          icon={
            <FontAwesome name={'trash-o'} color={colors.main_blue} size={30} />
          }
        />

        <Footer />
      </View>
    </ScrollView>
  );
}
