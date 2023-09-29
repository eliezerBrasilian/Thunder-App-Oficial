import Routes from './src/routes/index.routes';
import {NavigationContainer} from '@react-navigation/native';
import AuthProvider from './src/contexts/AuthContext';
import ContratoProvider from './src/contexts/ContratosContext';
import {AsyncStorageProvider} from './src/contexts/AsyncStorage';
import {StatusBar} from 'react-native';
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AsyncStorageProvider>
          <ContratoProvider>
            <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
            <Routes />
          </ContratoProvider>
        </AsyncStorageProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
