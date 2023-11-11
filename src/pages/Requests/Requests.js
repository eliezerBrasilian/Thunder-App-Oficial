import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {FlatList, Keyboard, View} from 'react-native';
import Header from '../../components/Header';
import {colors} from '../../assets/colors';
import {TextContent} from '../../components/TextContent';
import {Utils} from '../../utils/Utils';
import {Button} from '../../components/Button';
export default function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    function loadRequests() {
      //change from "Pedidos" to "Requests" in the future
      firestore()
        .collection('Pedidos')
        .orderBy('createdAt', 'desc')
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
      />
    </View>
  );
}

const RequestItem = ({data}) => {
  function copyPhoneToClipboard() {
    Utils.copytoclipboard(data.whatsApp, 'número de WhatsApp copiado');
  }
  function copyNameToClipboard() {
    Utils.copytoclipboard(data.customerName, 'nome do solicitante copiado');
  }

  return (
    <View
      style={{
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.thunder_green_color,
        padding: 10,
      }}>
      <TextContent fontWeight="bold">Nome do Aplicativo</TextContent>
      <TextContent>{data.appName}</TextContent>
      <View style={{marginTop: 10}} />
      <TextContent fontWeight="bold">Nome do Solicitante</TextContent>
      <TextContent onClick={copyNameToClipboard} clickable={true}>
        {data.customerName}
      </TextContent>
      <View style={{marginTop: 10}} />
      <TextContent fontWeight="bold">Nicho do aplicativo</TextContent>
      <TextContent>{data.nicho}</TextContent>
      <View style={{marginTop: 10}} />
      <TextContent fontWeight="bold">WhatsApp do Solicitante</TextContent>
      <TextContent onClick={copyPhoneToClipboard} clickable={true}>
        {data.whatsApp}
      </TextContent>

      <View style={{marginTop: 20}} />
      <Button
        onClick={() =>
          Utils.generatePhraseForSendOnWhatsApp(
            data.appName,
            data.customerName,
            data.nicho,
          )
        }
        backgroundColor={colors.thunder_green_color}>
        <TextContent color="#fff">Gerar frase para WhatsApp</TextContent>
      </Button>
    </View>
  );
};
