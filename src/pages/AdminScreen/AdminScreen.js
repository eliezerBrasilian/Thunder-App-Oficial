import {View, StyleSheet} from 'react-native';
import Header from '../HomeScreen/Header';
import {TextContent} from '../../components/TextContent';
export default function AdminScreen() {
  return (
    <View style={styles.main}>
      <Header
        icon={require('../../assets/images/menu.png')}
        marginTopForRightIcon={5}
        sizeOfRightIcon={25}
        destination={'Menu'}
      />
      <View style={{alignItems: 'center'}}>
        <TextContent>Admin</TextContent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 15,
    backgroundColor: '#fff',
    flex: 1,
  },
});
