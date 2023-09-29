import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
//import PagerView from 'react-native-pager-view';
import {strings} from '../../assets/strings';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../contexts/AuthContext';
import {useContext} from 'react';
import {colors} from '../../assets/colors';
export default Simulacoes = () => {
  const {user} = useContext(AuthContext);

  const carouselItems = [
    {
      icon: require('../../assets/images/dollar_sign.png'),
      title: strings.emprestimo_consignado,
      navigate_to: 'EmprestimoConsignado',
    },
    {
      icon: require('../../assets/images/exchange.png'),
      title: strings.portabilidade_consignado,
      actionText: strings.simular_agora,
      navigate_to: 'EmprestimoConsignado',
    },
    {
      icon: require('../../assets/images/gift_box.png'),
      title: strings.emprestimo_saque_aniversario,
      actionText: strings.simular_agora,
      navigate_to: 'EmprestimoConsignado',
    },
  ];
  return (
    <FlatList
      data={carouselItems}
      renderItem={({item}) => <Item data={item} />}
      horizontal={true}
      contentContainerStyle={{columnGap: 15}}
    />
  );
};

function Item({data}) {
  const nav = useNavigation();
  return (
    <View style={s.main_view}>
      <Image source={data.icon} style={s.icon} />

      <View style={{alignItems: 'center'}}>
        <Text style={s.title}>{data.title}</Text>
      </View>

      <Text style={s.text}>{data.text}</Text>
      <TouchableOpacity
        onPress={() => solicitar(nav, data.navigate_to)}
        style={s.btn_simulate}>
        <Text style={s.btnOnBelowSliderText}>{strings.simular_agora}</Text>
      </TouchableOpacity>
    </View>
  );
}
function solicitar(nav, screen) {
  nav.navigate(screen);
}

const s = StyleSheet.create({
  main_view: {
    width: 250,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    height: 40,
    width: 40,
  },
  title: {
    fontSize: 20,
    color: colors.main_blue,
    fontWeight: '600',
    textAlign: 'center',
  },
  text: {fontSize: 17, color: '#000'},
  btn_simulate: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    backgroundColor: colors.main_blue,
    borderRadius: 10,
    marginTop: 5,
  },
  btnOnBelowSliderText: {
    fontSize: 17,
    color: '#fff',
  },
});
