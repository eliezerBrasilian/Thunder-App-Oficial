import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from '../pages/OnBoarding';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Second from '../pages/SignUp/second';
const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
      }}>
      <Stack.Screen name="onBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Second" component={Second} />
    </Stack.Navigator>
  );
}
