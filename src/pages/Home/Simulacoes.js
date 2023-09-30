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
import {useContext, useMemo, useState, useEffect} from 'react';
import {colors} from '../../assets/colors';
import {TextContent} from '../../components/TextContent';
import {firebase} from '@react-native-firebase/firestore';

export default Simulacoes = () => {
  const {user} = useContext(AuthContext);
  const [pediu_emprestimo_consignado, setPediuEmprestimoConsignado] =
    useState(false);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(user.user_id)
      .onSnapshot(snap => {
        console.log(snap.data());
        const info = snap.data();
        console.log(info.emprestimo_consignado.status);
        setPediuEmprestimoConsignado(info.emprestimo_consignado.status);
      });

    return () => unsubscribe();
  }, []);
  const carouselItems = [
    {
      icon: require('../../assets/images/dollar_sign.png'),
      title: strings.emprestimo_consignado,
      navigate_to: 'EmprestimoConsignado',
      status: pediu_emprestimo_consignado,
      disponivel: true,
    },
    {
      icon: require('../../assets/images/exchange.png'),
      title: strings.portabilidade_consignado,
      actionText: strings.simular_agora,
      navigate_to: 'EmprestimoConsignado',
      status: false,
      disponivel: false,
    },
    {
      icon: require('../../assets/images/gift_box.png'),
      title: strings.emprestimo_saque_aniversario,
      actionText: strings.simular_agora,
      navigate_to: 'EmprestimoConsignado',
      status: false,
      disponivel: false,
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
  console.log(data.status);
  const status = data.status;
  const disponivel = data.disponivel;
  const SimularAgora = useMemo(() => {
    if (status == false && disponivel) {
      //a pessoa nao solicitou e ta disponivel na interface
      return function () {
        return (
          <TouchableOpacity
            onPress={() => solicitar(nav, data.navigate_to)}
            style={s.btn_simulate}>
            <TextContent title={strings.simular_agora} color="#fff" />
          </TouchableOpacity>
        );
      };
    } else if (status == false && !disponivel) {
      return function () {
        return <TextContent title={'Indisponível'} color="#d90429" />;
      };
    } else
      return function () {
        return <TextContent title={'Já Solicitado'} color="green" />;
      };
  }, [status, disponivel]);
  const nav = useNavigation();
  return (
    <View style={s.main_view}>
      <Image source={data.icon} style={s.icon} />

      <View style={{alignItems: 'center'}}>
        <Text style={s.title}>{data.title}</Text>
      </View>
      <SimularAgora />
    </View>
  );
}
function solicitar(nav, screen) {
  nav.navigate(screen);
}

const s = StyleSheet.create({
  main_view: {
    width: 230,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',

    borderColor: '#000',
    borderWidth: 0.2,
    borderRadius: 20,
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
