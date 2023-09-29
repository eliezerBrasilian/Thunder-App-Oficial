import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useState} from 'react';

const AsyncStorageContext = createContext();

export const useAsyncStorage = () => {
  return useContext(AsyncStorageContext);
};

export const AsyncStorageProvider = ({children}) => {
  async function updatingTrackingId(trackingId) {
    try {
      const userData = await AsyncStorage.getItem('@userData');
      if (userData !== null) {
        const data = JSON.parse(userData);
        data.qred_tracking_id = trackingId;
        await AsyncStorage.setItem('@userData', JSON.stringify(data));
        console.log('Atributo qred_tracking_id atualizado com sucesso!');
      } else {
        console.log('Chave não encontrada no AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o atributo do objeto:', error);
    }
  }
  return (
    <AsyncStorageContext.Provider
      value={{
        updatingTrackingId,
      }}>
      {children}
    </AsyncStorageContext.Provider>
  );
};
