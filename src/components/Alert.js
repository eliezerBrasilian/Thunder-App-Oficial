import {View, Image} from 'react-native';
import Modal from 'react-native-modal';
import {TextContent} from './TextContent';
import {Button} from './Button';
export default Alert = ({
  visible,
  setModalVisible,
  message = null,
  setErrorMessage,
}) => {
  console.log('message is: ' + message);

  const handleCloseModal = () => {
    setErrorMessage(null);
    setModalVisible(false);
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
