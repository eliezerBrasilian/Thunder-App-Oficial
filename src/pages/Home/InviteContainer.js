import {colors} from '../../assets/colors';
import {s} from './style';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {strings} from '../../assets/strings';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function inviteContainer() {
  return (
    <View style={s.inviteContainer}>
      <View style={s.headerInviteContainer}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/share.png')}
            style={s.shareBtn}
          />
        </TouchableOpacity>
        <Text
          style={[
            s.btnOnBelowSliderText,
            {backgroundColor: 'transparent', color: '#000', flex: 1},
          ]}>
          {strings.convide_seu_amigo}
        </Text>
      </View>

      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
        <Text
          style={{
            color: colors.main_blue,
            fontWeight: '600',
            fontSize: 16,
          }}>
          {strings.compartilhar}
        </Text>
        <AntDesign name="right" color={colors.main_blue} size={20} />
      </TouchableOpacity>
    </View>
  );
}
