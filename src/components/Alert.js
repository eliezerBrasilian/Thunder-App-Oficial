import {Image, View} from 'react-native';

import {Button} from './Button';
import Modal from 'react-native-modal';
import {TextContent} from './TextContent';
import {useNavigation} from '@react-navigation/native';

export default Alert = ({
  visible,
  setModalVisible,
  message = null,
  setErrorMessage,
}) => {
  const nav = useNavigation();

  const handleCloseModal = () => {
    setErrorMessage(null);
    setModalVisible(false);
    if (message === null) nav.goBack();
  };
  return (
    <Modal isVisible={visible} onBackButtonPress={handleCloseModal}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            rowGap: 10,
          }}>
          <Image
            source={
              message !== null
                ? require('../assets/images/error.png')
                : require('../assets/images/verified.png')
            }
            style={{height: 70, width: 70}}
          />
          <View style={{alignItems: 'center'}}>
            {message !== null ? (
              <TextContent fontWeight="700">{message}</TextContent>
            ) : (
              <View>
                <TextContent fontWeight="700">
                  Seu pedido foi enviado com sucesso
                </TextContent>
                <TextContent fontWeight="800">
                  Nossa equipe entrará em contato
                </TextContent>
              </View>
            )}
          </View>
          <Button onClick={handleCloseModal} padding={15}>
            <TextContent color="#fff">Fechar</TextContent>
          </Button>
        </View>
      </View>
    </Modal>
  );
};
