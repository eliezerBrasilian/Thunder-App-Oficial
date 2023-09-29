import {View, Modal, ScrollView} from 'react-native';
import Header from './Header';
import {s} from './style';
import ListItem from './ListItem';
import {strings} from '../../assets/strings';
import Footer from './Footer';
import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
export default function Configurations() {
  const {user} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    return () => {
      setModalVisible(false);
    };
  });
  return (
    <ScrollView>
      <View style={s.mainContent}>
        <Header name={user.name} />
        <ListItem
          title={strings.dados_pessoais}
          icon={require('../../assets/images/person.png')}
          iconSize={35}
          goTo="DadosPessoais"
        />
        {/* <ListItem
          title={strings.emprestimo}
          icon={require('../../assets/images/loan.png')}
          iconSize={32}
        /> */}
        <ListItem
          title={strings.seguranca}
          icon={require('../../assets/images/security-lock.png')}
          goTo="Seguranca"
        />
        <ListItem
          title={strings.fale_conosco}
          icon={require('../../assets/images/chat.png')}
        />
        <ListItem
          title={strings.excluir_conta}
          icon={require('../../assets/images/bin.png')}
        />

        <Footer />
      </View>
    </ScrollView>
  );
}
