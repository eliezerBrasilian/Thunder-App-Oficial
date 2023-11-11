import {useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import {View, Image} from 'react-native';
export default function Routes() {
  const {signed, isLoadingApp, user} = useContext(AuthContext);

  if (isLoadingApp) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{height: 100, width: 100}}
          resizeMode="contain"
          source={require('../assets/images/thunder_icon.png')}
        />
      </View>
    );
  } else return signed ? <AppRoutes isAdmin={user.isAdmin} /> : <AuthRoutes />;
}
