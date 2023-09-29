import {colors} from '../../assets/colors';
import Header from './Header';
import {s} from './style';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import TopSlider from './TopSlider';
import BelowSlider from './BelowSlider';
import {strings} from '../../assets/strings';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InviteContainer from './InviteContainer';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const nav = useNavigation();

  return (
    <View style={{flex: 1}}>
      <Header />
      <ScrollView>
        <View style={s.mainContainer}>
          <StatusBar backgroundColor={colors.light} barStyle={'dark-content'} />

          <TopSlider />
          <Text style={[s.title, {fontSize: 20, marginBottom: -8}]}>
            {strings.emprestimo}
          </Text>
          <BelowSlider />
          <Text
            style={[
              s.title,
              {fontSize: 20, marginBottom: -10, marginTop: -12},
            ]}>
            {strings.saiba_mais}
          </Text>
          <InviteContainer />
          <TouchableOpacity
            onPress={function () {
              nav.navigate('Shopping');
            }}
            activeOpacity={0.8}
            style={{
              width: '100%',
              rowGap: 10,
            }}>
            <View style={{borderWidth: 1, borderColor: colors.gray_line}} />
            <View style={{flexDirection: 'row', columnGap: 10}}>
              <AntDesign
                name="shoppingcart"
                size={30}
                color={colors.main_blue}
              />
              <View style={{flexDirection: 'column', flex: 1}}>
                <Text style={s.titleAction}>{strings.shopping}</Text>
                <Text style={s.descriptionAction}>{strings.confira_aqui}</Text>
              </View>
            </View>

            <Image
              resizeMode="cover"
              source={require('../../assets/images/shopping_banner.png')}
              style={{height: 130, width: '100%', borderRadius: 10}}
            />
          </TouchableOpacity>
          <View style={{borderWidth: 1, borderColor: colors.gray_line}} />
          <View style={{rowGap: -25, justifyContent: 'center'}}>
            <Text style={s.titleAction}>{strings.precisa_ajuda}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Text style={s.descriptionAction}>
                {strings.estamos_prontos_para}
              </Text>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/robot.png')}
                style={{flex: 1}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
