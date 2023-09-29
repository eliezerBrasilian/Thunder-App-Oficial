import {View, Text, TouchableOpacity} from 'react-native';
import {strings} from '../../assets/strings';
import {colors} from '../../assets/colors';
import EmAndamento from './EmAndamento';
import Pagos from './Pagos/Pagos';
import {s} from './style';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function Contratos() {
  return (
    <View style={s.mainView}>
      <Text style={s.mainViewTitle}>{strings.meus_contratos}</Text>
      <MyTabs />
    </View>
  );
}
function MyTabs() {
  const labelStyle = {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'none', // Define textTransform como 'none' para manter o texto em caixa baixa
  };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: colors.main_green},
      }}>
      <Tab.Screen
        name="EmAndamento"
        component={EmAndamento}
        options={{
          title: strings.em_andamento,
          tabBarLabelStyle: labelStyle,
        }}
      />
      <Tab.Screen
        name="Pagos"
        component={Pagos}
        options={{
          title: strings.pagos,
          tabBarLabelStyle: labelStyle,
        }}
      />
    </Tab.Navigator>
  );
}
