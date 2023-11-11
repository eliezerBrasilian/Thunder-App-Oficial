import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../pages/HomeScreen/HomeScreen';
import Login from '../pages/Login/Login';
import Contratar from '../pages/Contratar/Contratar';
const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Contratar" component={Contratar} />
    </Stack.Navigator>
  );
}
