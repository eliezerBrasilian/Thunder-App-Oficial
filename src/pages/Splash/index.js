import {View, Image, Text} from 'react-native';

export default function Splash() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../../assets/images/ficash_icone.png')}
        resizeMode="cover"
        style={{borderRadius: 10, width: 90, height: 90}}
      />
      <Text
        style={{fontSize: 17, color: '#000', position: 'absolute', bottom: 20}}>
        ©️ Todos direitos reservados
      </Text>
    </View>
  );
}
