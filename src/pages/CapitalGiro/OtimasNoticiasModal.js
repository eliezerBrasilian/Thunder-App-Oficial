import React, {useState, useMemo} from 'react';
import {
  Button,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import Close from 'react-native-vector-icons/AntDesign';
import {strings} from '../../assets/strings';
import {colors} from '../../assets/colors';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
export default function OtimasNoticiasModal({isModalVisible, setModalVisible}) {
  const [isVisible, setVisible] = useState(false);
  useMemo(() => {
    setVisible(isModalVisible);
  }, [isModalVisible]);
  function executeMethod() {
    setModalVisible(false);
  }

  return (
    <Modal isVisible={isVisible} onBackButtonPress={executeMethod}>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 5,
          minHeight: 200,
          alignItems: 'center',
          width: '100%',
          rowGap: 10,
          borderRadius: 10,
        }}>
        <Image
          source={require('../../assets/images/check.png')}
          style={{height: 60, width: 70}}
          resizeMode="contain"
        />
        <Text
          style={{fontSize: 25, fontWeight: '700', color: colors.main_blue}}>
          {strings.otimas_noticias}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: colors.main_blue,
            textAlign: 'center',
          }}>
          {strings.suas_informacoes_foram_salvas}
        </Text>
        <View style={{flex: 1, marginBottom: 10, marginTop: 10}}>
          <DotIndicator color={colors.main_green} size={15} />
        </View>
      </View>
    </Modal>
  );
}
