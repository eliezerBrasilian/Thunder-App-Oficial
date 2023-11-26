import {FlatList, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import React from 'react';
import Header from '../../components/Header';
import {TextContent} from '../../components/TextContent';

export default function RequestsTrash() {
  const [requestsDeleted, setRequestsDeleted] = React.useState([]);
  const [requestsDeteletedTotal, setRequestsDeteletedTotal] = React.useState(0);
  React.useEffect(() => {
    firestore()
      .collection('Requests')
      .where('deleted', '==', true)
      .orderBy('createdAt', 'desc')
      .get()

      .then(requests => {
        const requestList = [];
        let counterRequestsDeleted = 0;
        requests.forEach(request => {
          counterRequestsDeleted++;
          requestList.push({
            key: request.id,
            ...request.data(),
          });
        });
        setRequestsDeleted(requestList);
        setRequestsDeteletedTotal(counterRequestsDeleted);
      });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
      <Header title={'Pedidos excluidos'} />
      <TextContent>
        Total de pedidos excluidos: {requestsDeteletedTotal}
      </TextContent>
      <View style={{marginBottom: 15}} />
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
