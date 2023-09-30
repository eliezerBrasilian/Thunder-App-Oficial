import Home from '../pages/Home/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../assets/colors';
import BottomTab from '../components/BottomTab';
import Configurations from '../pages/Configurations/Configurations';
import Contratos from '../pages/Contratos';
import DadosPessoais from '../pages/Configurations/DadosPessoais';
import Seguranca from '../pages/Configurations/Seguranca';
import Chat from '../pages/Chat';
import Shopping from '../pages/Shopping';
import EmprestimoConsignado from '../pages/EmprestimoConsignado/EmprestimoConsignado';
import ChatAberto from '../pages/Chat/ChatAdmin/ChatAberto';
import ChatAdminHeader from '../pages/Chat/ChatAdmin/ChatAdminHeader';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Notificacoes from '../pages/Notificacoes/Notificacoes';
const TopTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabBarLabelStyle = {
  marginTop: 10,
  fontSize: 16,
  fontWeight: '600',
};
const tabBarStyle = {
  borderTopWidth: 0,
  borderTopColor: 'transparent',
  height: 80,
};

function ChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
      }}>
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ChatAberto" component={ChatAberto} />
      <Stack.Screen name="ChatAdminHeader" component={ChatAdminHeader} />
    </Stack.Navigator>
  );
}
function ConfigStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
      }}>
      <Stack.Screen name="Configurations_" component={Configurations} />
      <Stack.Screen name="DadosPessoais" component={DadosPessoais} />
      <Stack.Screen name="Seguranca" component={Seguranca} />
    </Stack.Navigator>
  );
}
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        options={{
          animation: 'slide_from_left',
        }}
        name="Configurations"
        component={ConfigStack}
      />
      <Stack.Screen name="Shopping" component={Shopping} />
      <Stack.Screen
        name="EmprestimoConsignado"
        component={EmprestimoConsignado}
      />
      <Stack.Screen name="Notificacoes" component={Notificacoes} />
    </Stack.Navigator>
  );
}
// function ContratosTabs() {
//   return (
//     <TopTab.Navigator>
//       <TopTab.Screen name="EmAndamento" component={EmAndamento} />
//       <TopTab.Screen name="Pagos" component={Pagos} />
//     </TopTab.Navigator>
//   );
// }

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: colors.main_green,
          tabBarLabelStyle: tabBarLabelStyle,
          tabBarStyle: tabBarStyle,
          tabBarIcon: ({color, size, focused}) =>
            BottomTab({color, focused, currentRouteName: 'HomeTab'}),
        }}
      />
      <Tab.Screen
        name="ContratosTab"
        component={Contratos}
        options={{
          tabBarLabel: 'Contratos',
          tabBarActiveTintColor: colors.main_green,
          tabBarLabelStyle: tabBarLabelStyle,
          tabBarStyle: tabBarStyle,
          tabBarIcon: ({color, size, focused}) =>
            BottomTab({color, focused, currentRouteName: 'ContratosTab'}),
        }}
      />
      <Tab.Screen
        name="ChatTab"
        component={ChatStack}
        options={{
          tabBarLabel: 'Chat',
          tabBarActiveTintColor: colors.main_green,
          tabBarLabelStyle: tabBarLabelStyle,
          tabBarStyle: tabBarStyle,
          tabBarIcon: ({color, size, focused}) =>
            BottomTab({color, focused, currentRouteName: 'ChatTab'}),
        }}
      />
    </Tab.Navigator>
  );
}
