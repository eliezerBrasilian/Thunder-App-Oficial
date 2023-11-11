import {View, FlatList, Image, Text} from 'react-native';
import {TextContent} from '../../components/TextContent';
export default function Footer() {
  const sistemas = [
    {id: '0', title: 'Pizzaria', img: require('../../assets/images/1.png')},
    {id: '1', title: 'Fitness', img: require('../../assets/images/2.png')},
    {
      id: '2',
      title: 'Sistema de estoque',
      img: require('../../assets/images/3.png'),
    },
    {id: '3', title: 'Padaria', img: require('../../assets/images/4.png')},
    {id: '4', title: 'Lavanderia', img: require('../../assets/images/5.png')},
    {id: '5', title: 'Taxi', img: require('../../assets/images/6.png')},
  ];
  return (
    <View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={sistemas}
        renderItem={({item}) => <Card data={item} />}
        contentContainerStyle={{columnGap: 15}}
      />
    </View>
  );
}

function Card({data}) {
  return (
    <View
      style={{
        backgroundColor: '#F0F0F0',
        height: 190,
        alignItems: 'center',
        width: 150,
        borderRadius: 15,
        rowGap: 5,
      }}>
      <Image source={data.img} style={{height: 140, width: 140}} />
      <Text style={{fontWeight: '600', color: '#000', fontSize: 16}}>
        {data.title}
      </Text>
    </View>
  );
}
