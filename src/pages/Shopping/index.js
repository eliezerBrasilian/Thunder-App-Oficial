import {View, Linking, ScrollView, Text} from 'react-native';
import Header from '../../components/Header';
import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
import {s} from './style';
import Card from './Card';
export default function Shopping() {
  async function method(url) {
    const supported = await Linking.canOpenURL(url);
    if (!supported) return;

    await Linking.openURL(url);
  }
  return (
    <View style={s.main}>
      <Header color={colors.main_blue} title={strings.shopping} />
      <Text style={s.description}>{strings.navegue_pelas_lojas}</Text>
      <ScrollView>
        <View style={{rowGap: 10}}>
          <View style={s.rowView}>
            <Card
              title={strings.electrolux}
              image={require('../../assets/images/logo-eletrolux-2048.png')}
              offer={25}
              method={() => method(strings.linkElectrolux)}
            />
            <Card
              title={strings.renner}
              image={require('../../assets/images/logo-renner-2048.png')}
              offer={25}
              method={() => method(strings.linkRenner)}
            />
          </View>
          <View style={s.rowView}>
            <Card
              title={strings.girafa}
              image={require('../../assets/images/BR-logo-girafa.webp')}
              offer={25}
              method={() => method(strings.linkGirafa)}
            />
            <Card
              title={strings.nike}
              image={require('../../assets/images/logo-nike-2048.png')}
              offer={25}
              method={() => method(strings.linkNike)}
            />
          </View>
          <View style={s.rowView}>
            <Card
              title={strings.dlk}
              image={require('../../assets/images/dlk.png')}
              offer={25}
              method={() => method(strings.linkDLK)}
            />
            <Card
              title={strings.carrefour}
              image={require('../../assets/images/carrefour.png')}
              offer={25}
              method={() => method(strings.linkCarrefour)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
