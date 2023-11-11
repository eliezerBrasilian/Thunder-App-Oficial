import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {Utils} from '../utils/Utils';
export const AuthContext = createContext({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isLoadingAuth, setLoadingAuth] = useState(false);
  const [isLoadingApp, setLoadingApp] = useState(true);
  const [isLoadingPhoto, setLoadingPhoto] = useState(false);
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoadingApp(true);
    try {
      const ud = await AsyncStorage.getItem('@userData');

      if (ud) {
        const userData = JSON.parse(ud);
        console.log(userData);
        setUser(userData);
        setProfilePhoto(userData.profile_photo);
      }
    } catch (error) {
      console.log(`error - AuthContext - loadData(): ${error}`);
    } finally {
      setLoadingApp(false);
    }
  }
  function signOut() {
    AsyncStorage.clear()
      .then(() => {
        setUser(null);
        console.log('saiu');
      })
      .catch(e => {
        console.log(e);
      });
  }

  async function login(credential, credentialPassword) {
    console.log(credential, credentialPassword);
    setLoadingAuth(true);
    const credentialStatus = await getCredentialStatus(
      credential,
      credentialPassword,
    );

    if (
      credentialStatus === 'invalid-credential' ||
      credentialStatus === 'invalid-credential-password'
    ) {
      Utils.showToast('Credenciais inválidas');
    } else {
      let user = await getUserFromCredential(credential);
      writeUserDataOnDevice(user);
    }
  }

  async function getCredentialStatus(credential, credentialPassword) {
    const credentialIsValid = await credentialIsCorrect(credential);

    const credentialPasswordIsValid = await credentialPasswordIsCorrect(
      credential,
      credentialPassword,
    );

    if (!credentialIsValid) return 'invalid-credential';
    else if (credentialIsValid && !credentialPasswordIsValid)
      return 'invalid-credential-password';
    else {
      return 'user-is-valid';
    }
  }

  async function credentialIsCorrect(credential) {
    const querySnapshot = await firestore()
      .collection('Users')
      .where('credential', '==', credential)
      .get();
    if (querySnapshot.empty) return false;
    else return true;
  }
  async function credentialPasswordIsCorrect(credential, credentialPassword) {
    const querySnapshot = await firestore()
      .collection('Users')
      .where('credential', '==', credential)
      .where('credentialPassword', '==', credentialPassword)
      .get();
    if (querySnapshot.empty) return false;
    else return true;
  }

  function writeUserDataOnDevice(data) {
    console.log(data);

    AsyncStorage.setItem('@userData', JSON.stringify(data));
    setUser(data);
  }

  async function getUserFromCredential(credential) {
    const querySnapshot = await firestore()
      .collection('Users')
      .where('credential', '==', credential)
      .get();

    if (querySnapshot.empty) return null;
    else {
      // Extrai o primeiro documento (usuário) da consulta
      const userDoc = querySnapshot.docs[0];
      const user = userDoc.data();
      return user;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        isLoadingApp,
        setLoadingApp,
        login,
        profilePhoto,
        setProfilePhoto,
        isLoadingAuth,
        setLoadingAuth,
        signOut,
        isLoadingPhoto,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
