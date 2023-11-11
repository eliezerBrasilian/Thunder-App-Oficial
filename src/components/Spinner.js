import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {TextContent} from './TextContent';
import I from 'react-native-vector-icons/AntDesign';
import {useState} from 'react';

export function Spinner({setSelected, data, placeholder, nichoSelected}) {
  const [clicked, setClicked] = useState(false);

  let toogleListView = () => {
    setClicked(!clicked);
  };

  let selectingAvalue = value => {
    console.log(value);
    setSelected(value);
    toogleListView();
  };
  if (clicked) {
    return (
      <View style={{rowGap: 5}}>
        <TextContent fontWeight="bold">
          Escolha o nicho do aplicativo
        </TextContent>
        <ScrollView
          horizontal={true}
          style={{
            borderRadius: 10,
            borderColor: '#000',
            borderWidth: 1,
            padding: 15,
            width: '100%',
          }}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <TextContent
                onClick={() => selectingAvalue(item.value)}
                clickable={true}
                color="#000">
                {item.value}
              </TextContent>
            )}
          />
        </ScrollView>
      </View>
    );
  }

  if (!clicked)
    return (
      <View style={{rowGap: 5}}>
        <TextContent fontWeight="bold">{placeholder}</TextContent>
        <View
          style={{
            borderRadius: 10,
            borderColor: '#000',
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: 15,
            height: 70,
          }}>
          <TouchableOpacity onPress={toogleListView}>
            <TextContent>{nichoSelected}</TextContent>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toogleListView}
            style={{
              height: 50,
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <I name="caretdown" color={'#000'} size={10} />
          </TouchableOpacity>
        </View>
      </View>
    );
}
