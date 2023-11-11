import {createNativeStackNavigator} from '@react-navigation/native-stack';
<<<<<<< HEAD
import HomeScreen from '../pages/HomeScreen/HomeScreen';
import Login from '../pages/Login/Login';
import Contratar from '../pages/Contratar/Contratar';
=======
import OnBoarding from '../pages/OnBoarding';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp';
import Second from '../pages/SignUp/second';
>>>>>>> c18a55245d230d1f9bc4da7212753a3624bb7db5
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
