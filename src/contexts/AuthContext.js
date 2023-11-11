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

<<<<<<< HEAD
  async function login(credential, credentialPassword) {
    console.log(credential, credentialPassword);
=======
  async function createPersonalizedChatRoom(profilePhoto, name, user_id) {
    await firestore()
      .collection('messages')
      .doc(user_id)
      .collection('chat-room')
      .add({
        is_suport: false,
        is_system: true,
        profile_photo: null,
        text: 'Bem vindo(a) ao Chat',
        picture: null,
        createdAt: firestore.FieldValue.serverTimestamp(),
        file: '',
      })
      .then(() => {
        console.log('chat started');

        firestore()
          .collection('messages')
          .doc(user_id)
          .set({
            created_at: firestore.FieldValue.serverTimestamp(),
            last_message: 'Chat automático criado!',
            nome_chat: name,
            profile_photo: profilePhoto,
            file: '',
          })
          .then(() => {
            console.log('dados da ultima mensagem criados');
          })
          .catch(e => {
            console.log(
              'não foi possivel criar dados da ultima mensagem: e' + e,
            );
          });
      })
      .catch(e => {
        console.log('chat was not started: ' + e);
      });
  }

  //fix this
  async function registerOnFirestore(
    userId,
    name,
    birthday_date,
    email,
    phone,
    cpf,
    password,
  ) {
    try {
      const user = {
        nome: name,
        email: email,
        cpf: cpf,
        criadoEm: firestore.FieldValue.serverTimestamp(),
        fotoUrl: null,
        dataNascimento: birthday_date,
        senha: password,
        telefone: phone,
        status: 'cliente', //admin, agente
        uid: userId,
      };
      await firestore()
        .collection('usuarios')
        .doc(userId)
        .set(user)
        .then(async () => {
          console.log('user created');
          await createPersonalizedChatRoom(profilePhoto, name, userId);
        });

      return true;
    } catch (error) {
      console.log('error on creating user - registerOnFirestore: ' + error);
      return false;
    }
  }

  async function criptographPassword(password) {
    const saltRounds = 1; // Número de salt rounds (quanto maior, mais lenta a função, mas mais segura)
    try {
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
      return hashedPassword;
    } catch (e) {
      return '';
    }
  }
  async function signUp(name, birthday_date, email, phone, cpf, password) {
>>>>>>> c18a55245d230d1f9bc4da7212753a3624bb7db5
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

<<<<<<< HEAD
    if (querySnapshot.empty) return null;
    else {
=======
  async function getUserFromCPF(cpf) {
    try {
      const usersRef = firestore().collection('usuarios');
      const querySnapshot = await usersRef.where('cpf', '==', cpf).get();

      // Verifica se o usuário com o CPF informado não existe
      if (querySnapshot.empty) {
        return null;
      }
>>>>>>> c18a55245d230d1f9bc4da7212753a3624bb7db5
      // Extrai o primeiro documento (usuário) da consulta
      const userDoc = querySnapshot.docs[0];
      const user = userDoc.data();
      return user;
<<<<<<< HEAD
=======
    } catch (error) {
      return '';
    }
  }

  async function login(cpf, inputPassword) {
    console.log(cpf, inputPassword);

    setLoadingAuth(true);

    const user = await getUserFromCPF(cpf);
    if (user == null) {
      console.log('user is null');
      setLoadingAuth(false);
      return 404;
    }

    const passwordCorrect = await verifyPassword(inputPassword, user.senha);

    if (passwordCorrect) console.log('Senha correta, usuário autenticado!');
    else {
      setLoadingAuth(false);
      return 406;
    }

    try {
      console.log('user data: ' + JSON.stringify(user));
      user.localPassword = inputPassword;
      writeUserData(user);
    } catch (error) {
      if (error.code == 'auth/invalid-email') return 400;
      else if (error.code == 'auth/user-not-found') return 404;
      else if (error.code == 'auth/wrong-password') return 406;
      else if (error.code == 'auth/too-many-requests') return 504;
      console.log('Erro: ' + error);
    } finally {
      setLoadingAuth(false);
>>>>>>> c18a55245d230d1f9bc4da7212753a3624bb7db5
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
