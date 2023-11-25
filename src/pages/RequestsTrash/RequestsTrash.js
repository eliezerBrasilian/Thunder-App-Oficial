import {FlatList, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import React from 'react';
import Header from '../../components/Header';
import {TextContent} from '../../components/TextContent';
import {useAuthContext} from '../../contexts/AuthContext';

export default function RequestsTrash() {
  const {user} = useAuthContext();
  const uid = user?.uid;
  const [requestsDeleted, setRequestsDeleted] = React.useState([]);
  React.useEffect(() => {
    firestore()
      .collection('Requests')
      .where('deleted', '==', true)
      .orderBy('createdAt', 'desc')
      .get()

      .then(requests => {
        const requestList = [];
        requests.forEach(request => {
          console.log(request.data());
          requestList.push({
            key: request.id,
            ...request.data(),
          });
        });
        setRequestsDeleted(requestList);
      });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header title={'Pedidos excluidos'} />
      <FlatList
        data={requestsDeleted}
        renderItem={({item}) => <RequestItem data={item} />}
        contentContainerStyle={{rowGap: 10}}
        ListEmptyComponent={
          <View style={{alignItems: 'center'}}>
            <TextContent>Você não possui nennum pedido</TextContent>
          </View>
        }
      />
    </View>
  );
}
