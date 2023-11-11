import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminScreen from '../pages/AdminScreen/AdminScreen';
import Menu from '../pages/Menu/Menu';
import Requests from '../pages/Requests/Requests';
const Stack = createNativeStackNavigator();

export default function AppRoutes({isAdmin}) {
  //rota de admin
  if (isAdmin)
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          orientation: 'portrait',
        }}>
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Requests" component={Requests} />
      </Stack.Navigator>
    );
  //rota do cliente
}
