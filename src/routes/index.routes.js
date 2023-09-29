import {useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import Splash from '../pages/Splash';

export default function Routes() {
  const {signed, isLoadingApp} = useContext(AuthContext);

  if (isLoadingApp) {
    return <Splash />;
  } else return signed ? <AppRoutes /> : <AuthRoutes />;
}
