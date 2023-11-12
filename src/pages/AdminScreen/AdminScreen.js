import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Header from '../HomeScreen/Header';
import {TextContent} from '../../components/TextContent';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {ImageIcon} from '../../components/ImageIcon';
import {Button} from '../../components/Button';
import {Utils} from '../../utils/Utils';
export default function AdminScreen() {
  const [customers, setCustomers] = React.useState([]);
  const [reloadCustomers, setReloadCustomers] = React.useState(false);

  React.useEffect(() => {
    function loadCustomers() {
      var listOfUsers = [];
      firestore()
        .collection('Users')
        .orderBy('createdAt', 'desc')
        .where('deleted', '==', false)
        .get()
        .then(querySnap => {
          querySnap.docs.forEach(userDoc => {
            var userData = userDoc.data();
            let KeyPropertyAdded = {
              ...userData,
              key: userDoc.id,
            };
            listOfUsers.push(KeyPropertyAdded);
          });
          setCustomers(listOfUsers);
        });
    }
    loadCustomers();
  }, [reloadCustomers]);

  function reload() {
    Utils.showToast('recarregando...');
    setReloadCustomers(!reloadCustomers);
  }
  return (
    <View style={styles.main}>
      <Header
        icon={require('../../assets/images/menu.png')}
        marginTopForRightIcon={5}
        sizeOfRightIcon={25}
        destination={'Menu'}
      />
      <View style={{alignItems: 'center'}}>
        <TextContent clickable={true} onClick={reload}>
          Admin
        </TextContent>
      </View>
      <View style={{marginTop: 30, marginLeft: 20, rowGap: 15}}>
        <TextContent fontWeight="bold">Lista de clientes</TextContent>
        <FlatList
          data={customers}
          //keyExtractor={(item, index) => item.uid}
          renderItem={({item}) => <CustomerItem data={item} />}
          contentContainerStyle={{rowGap: 15}}
          ListEmptyComponent={
            <TextContent>Sem clientes no momento...</TextContent>
          }
        />
      </View>
    </View>
  );
}

const CustomerItem = ({data}) => {
  function showAlert(customerId) {
    Utils.showAlert(
      () => deleteCustomer(customerId),
      'Thunder - Alerta',
      'Deseja excluir esse cliente?',
    );
  }
  function deleteCustomer(customerId) {
    firestore().collection('Users').doc(customerId).update({
      deleted: true,
    });
    Utils.showToast('excluido');
  }
  return (
    <TouchableOpacity
      onLongPress={() => showAlert(data.key)}
      style={{
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#F2F2F2',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 14,
      }}>
      <ImageIcon />
      <View style={{rowGap: 4, alignItems: 'center', width: 90}}>
        <TextContent numberOfLines={1}>{data.name}</TextContent>
        <TextContent>Apps: {data.apps}</TextContent>
      </View>
      <Button width={100}>
        <TextContent color="#fff">Editar</TextContent>
      </Button>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 15,
    backgroundColor: '#fff',
    flex: 1,
  },
});
