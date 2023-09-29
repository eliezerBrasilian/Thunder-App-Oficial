import {Text, View, TouchableOpacity} from 'react-native';
import PagerView from 'react-native-pager-view';
import {strings} from '../../assets/strings';
import {s} from './style';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../contexts/AuthContext';
import {useContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
export default BelowSlider = () => {
  const {user} = useContext(AuthContext);
  const [qred_tracking_id, setTrackingId] = useState('');
  useEffect(() => {
    console.log(user);
    function getQredId() {
      firestore()
        .collection('users')
        .doc(user.user_id)
        .onSnapshot(data => {
          setTrackingId(data.data().qred_tracking_id);
        });
    }
    getQredId();
  }, []);
  const carouselItems = [
    {
      title: strings.capital_giro,
      text: strings.faca_uma_simulacao,
      actionText:
        qred_tracking_id == ''
          ? strings.solicitar_agora
          : strings.acompanhar_solicitacoes,
    },
    {
      title: strings.consignado,
      text: strings.simplificado_,
      actionText: strings.solicitar_agora,
    },
  ];
  return (
    <PagerView style={s.pagerView} initialPage={0} pageMargin={20}>
      <View key="1">
        <Page
          item={carouselItems}
          index={0}
          qred_tracking_id={qred_tracking_id}
        />
      </View>
      <View key="2">
        <Page
          item={carouselItems}
          index={1}
          qred_tracking_id={qred_tracking_id}
        />
      </View>
    </PagerView>
  );
};

function solicitar(index, nav, qred_tracking_id) {
  if (index == 0) {
    nav.navigate('CapitalGiro', {qred_tracking_id: qred_tracking_id});
  }
}
function Page({item, index, qred_tracking_id}) {
  const nav = useNavigation();
  return (
    <View style={s.belowSliderContainer}>
      <Text style={s.title}>{item[index].title}</Text>
      <Text style={s.text}>{item[index].text}</Text>
      <TouchableOpacity
        onPress={() => solicitar(index, nav, qred_tracking_id)}
        style={s.btnOnBelowSlider}>
        <Text style={s.btnOnBelowSliderText}>{item[index].actionText}</Text>
      </TouchableOpacity>
    </View>
  );
}
