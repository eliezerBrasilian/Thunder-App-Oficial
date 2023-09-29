import {AuthContext} from '../../contexts/AuthContext';
import PrimeiroAcesso from './PrimeiroAcesso';
import FullAccess from './FullAcess';
import {useContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native';
import {colors} from '../../assets/colors';
import {useRoute} from '@react-navigation/native';

export default function CapitalGiro() {
  const {user} = useContext(AuthContext);
  const route = useRoute();
  const qred_tracking_id = route?.params?.qred_tracking_id;
  const [loading, setLoading] = useState(true);

  if (qred_tracking_id !== '') return <FullAccess />;
  if (qred_tracking_id == '') {
    return <PrimeiroAcesso />;
  }

  //return <FullAccess />;
}
