import * as React from 'react';
import {View, Image, FlatList} from 'react-native';
import {strings} from '../../assets/strings';
export default function CarrouselAnimated() {
  return (
    <View style={{flexDirection: 'row'}}>
      <FlatList
        data={INTRO_DATA}
        renderItem={({item}) => <Item data={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{columnGap: 20}}
      />
    </View>
  );
}

function Item({data}) {
  return (
    <View>
      <Image
        style={{height: 300, width: 250, borderRadius: 10}}
        source={data.img}
      />
    </View>
  );
}

const INTRO_DATA = [
  {
    key: '1',
    img: require('../../assets/images/banner1.png'),
    descricao: strings.simplifique,
  },
  {
    key: '2',
    img: require('../../assets/images/banner2.png'),
    descricao: strings.simule_seu_emprestimo_de,
  },
  {
    key: '3',
    img: require('../../assets/images/banner3.png'),
    descricao: strings.simule_seu_emprestimo_de,
  },
  {
    key: '4',
    img: require('../../assets/images/banner4.png'),
    descricao: strings.simule_seu_emprestimo_de,
  },
  {
    key: '5',
    img: require('../../assets/images/banner5.png'),
    descricao: strings.simule_seu_emprestimo_de,
  },
];
