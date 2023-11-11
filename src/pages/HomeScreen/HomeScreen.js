import React from 'react';
import {View} from 'react-native';
import Footer from './Footer';
import Header from './Header';
import CarrouselAnimated from './CarrouselAnimated';
import {TextContent} from '../../components/TextContent';
import {Button} from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
export default function HomeScreen() {
  const nav = useNavigation();
  function MarginHorizontal({children, custom = 20}) {
    return <View style={[{marginHorizontal: custom}]}>{children}</View>;
  }
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        paddingVertical: 15,
        justifyContent: 'space-between',
      }}>
      <Header />
      <View
        style={{
          flex: 1,
          marginTop: 40,

          justifyContent: 'space-around',
        }}>
        <MarginHorizontal>
          <TextContent fontWeight="bold" fontSize={17}>
            Nossos Serviços
          </TextContent>
        </MarginHorizontal>
        <CarrouselAnimated />

        <View style={{alignItems: 'center'}}>
          <Button
            onClick={function () {
              nav.navigate('Contratar');
            }}
            fontWeight="bold"
            padding={15}>
            Contratar
          </Button>
        </View>

        <MarginHorizontal>
          <TextContent fontWeight="bold" fontSize={17}>
            Sistemas mais pedidos
          </TextContent>
        </MarginHorizontal>
        <Footer />
      </View>
    </View>
  );
}
