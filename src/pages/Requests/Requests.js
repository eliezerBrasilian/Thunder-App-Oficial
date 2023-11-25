import {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import Header from '../../components/Header';
import RequestItem from '../../components/RequestItem';
import {TextContent} from '../../components/TextContent';

export default function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    function loadRequests() {
      firestore()
        .collection('Requests')
        .orderBy('createdAt', 'desc')
        .where('deleted', '==', false)
        .onSnapshot(querySnap => {
          var list = [];
          querySnap.docs.forEach(document => {
            const currentId = document.id;
            const documentsData = document.data();
            var documentWithId = {
              ...documentsData,
              id: currentId,
            };

            list.push(documentWithId);
          });
          setRequests(list);
        });
    }
    loadRequests();
  }, []);
  return (
    <View style={{backgroundColor: '#fff', flex: 1, padding: 15}}>
      <Header title={'Pedidos'} />
      <FlatList
        data={requests}
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
