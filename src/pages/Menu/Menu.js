import {View, TouchableOpacity} from 'react-native';
import {TextContent} from '../../components/TextContent';
import {colors} from '../../assets/colors';
import {ImageIcon} from '../../components/ImageIcon';
import {useAuthContext} from '../../contexts/AuthContext';
export default function Menu({navigation}) {
  const {signOut} = useAuthContext();
  return (
    <View style={{padding: 10, backgroundColor: '#fff', flex: 1, rowGap: 10}}>
      <Top />
      <Line />
      <MenuOption
        title={'Cadastrar Cliente'}
        icon={require('../../assets/images/cadastrar_cliente_icon.png')}
        destination={'CreateCustomer'}
        navigation={navigation}
      />
      <MenuOption
        title={'Excluir Cliente'}
        icon={require('../../assets/images/excluir_cliente_icon.png')}
        destination={'Requests'}
        navigation={navigation}
      />
      <MenuOption
        title={'Listar Pedidos'}
        icon={require('../../assets/images/list.png')}
        destination={'Requests'}
        navigation={navigation}
      />
      <TextContent clickable={true} onClick={signOut}>
        Sair
      </TextContent>
    </View>
  );
}

const Top = () => {
  return (
    <View>
      <TextContent
        fontSize={30}
        fontWeight="700"
        color={colors.thunder_green_color}>
        Menu
      </TextContent>
    </View>
  );
};
const Line = () => {
  return (
    <View style={{borderWidth: 1, borderColor: colors.thunder_green_color}} />
  );
};

const MenuOption = ({title, icon, destination, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(destination);
      }}
      activeOpacity={0.6}
      style={{
        marginTop: 20,
        flexDirection: 'row',
        columnGap: 20,
        alignItems: 'center',
      }}>
      <ImageIcon source={icon} />
      <TextContent>{title}</TextContent>
    </TouchableOpacity>
  );
};
