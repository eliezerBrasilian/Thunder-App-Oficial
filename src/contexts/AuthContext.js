import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import bcrypt from 'react-native-bcrypt';
import axios from 'axios';
import qs from 'qs';
export const AuthContext = createContext({});

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isLoadingAuth, setLoadingAuth] = useState(false);
  const [isLoadingApp, setLoadingApp] = useState(true);

  useEffect(() => {
    getLatelyQredToken();
    loadData();
  }, []);

  async function getLatelyQredToken() {
    try {
      const userData = await AsyncStorage.getItem('@userData');
      if (userData !== null) {
        let qredToken = await getQredToken();
        console.log('qred token: ' + qredToken);

        const data = JSON.parse(userData);
        data.qredToken = qredToken;
        //Salvando o objeto atualizado no AsyncStorage
        await AsyncStorage.setItem('@userData', JSON.stringify(data));

        console.log('qredToken atualizado com sucesso!');
      } else {
        console.log('Chave não encontrada no AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o atributo do objeto:', error);
    }
  }
  async function loadData() {
    setLoadingApp(true);
    try {
      const ud = await AsyncStorage.getItem('@userData');

      if (ud) {
        const userData = JSON.parse(ud);
        console.log(userData);
        setUser(userData);
        setProfilePhoto(userData.profilePhoto);
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
  async function registerOnFirestore(
    user_id,
    name,
    birthday_date,
    email,
    phone,
    cpf,
    password,
  ) {
    try {
      await firestore()
        .collection('users')
        .doc(user_id)
        .set({
          isAdmin: false,
          name: name,
          email: email,
          createdAt: firestore.FieldValue.serverTimestamp(),
          profilePhoto: null,
          birthDay: birthday_date,
          phone: phone,
          cpf: cpf,
          password: password,
          user_id: user_id,
          cnpj: '',
          receita_anual: 0,
          faturamento_mensal: 0,
          nome_empresa: '',
          cargo: '',
          montante_solicitado: 0,
          qred_tracking_id: '',
        })
        .then(async () => {
          console.log('user created');
          await createPersonalizedChatRoom(profilePhoto, name, user_id);
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
    setLoadingAuth(true);

    const cpfAlreadyExists = await getUserFromCPF(cpf);
    if (cpfAlreadyExists != null) {
      setLoadingAuth(false);
      return 407;
    } else console.log('CPF status: ' + cpfAlreadyExists);

    const hashedPassword = await criptographPassword(password);
    console.log(hashedPassword);
    if (hashedPassword == '') return;
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const isUserCreated = registerOnFirestore(
        response.user.uid,
        name,
        birthday_date,
        email,
        phone,
        cpf,
        hashedPassword,
      );
      return isUserCreated ? 200 : 500;
    } catch (error) {
      if (error.code == 'auth/invalid-email') return 400;
      else if (error.code == 'auth/weak-password') return 411;
      else if (error.code === 'auth/email-already-in-use') return 406;
      else console.log(error.code);
    } finally {
      setLoadingAuth(false);
    }
  }

  function writeUserData(data) {
    console.log(data);
    setProfilePhoto(data.profilePhoto);
    AsyncStorage.setItem('@userData', JSON.stringify(data));
    // loadData();
    setUser(data);
  }

  async function verifyPassword(plainPassword, hashedPassword) {
    try {
      // Compara a senha digitada (plainPassword) com o hash armazenado no banco de dados (hashedPassword)
      const isPasswordValid = await new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
      console.log(isPasswordValid);
      return isPasswordValid;
    } catch (error) {
      console.error('Erro na verificação da senha:', error);
      return false;
    }
  }

  async function getUserFromCPF(cpf) {
    try {
      const usersRef = await firestore().collection('users');
      const querySnapshot = await usersRef.where('cpf', '==', cpf).get();

      // Verifica se o usuário com o CPF informado não existe
      if (querySnapshot.empty) {
        return null;
      }
      // Extrai o primeiro documento (usuário) da consulta
      const userDoc = querySnapshot.docs[0];
      const user = userDoc.data();
      return user;
    } catch (error) {
      return '';
    }
  }

  const getQredToken = async () => {
    try {
      const data = qs.stringify({
        grant_type: 'client_credentials',
        client_id: 'ficash-sandbox-svc',
        client_secret: '29f6133c-9314-42d3-a358-fa00513b4a33',
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://partner-api-sandbox.qred.com.br/v1/auth',
        headers: {
          'x-api-key': 'Itm5tXJAVHahuBU5LRj8C4gVEb0TPzbb4WaYkWvJ',
          'Content-Type': 'application/x-www-form-urlencoded', // Set the content type
        },
        data: data,
      };

      const response = await axios(config);
      // console.log(JSON.stringify(response.data));
      //console.log('TOKEN: ' + response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.log(
        'AuthContext.js - getQredToken() - ' +
          JSON.stringify(error.response.data.message),
      );
    }
  };

  async function login(cpf, inputPassword) {
    setLoadingAuth(true);

    const user = await getUserFromCPF(cpf);
    if (user == null) {
      console.log('user is null');
      setLoadingAuth(false);
      return 404;
    }

    const passwordCorrect = await verifyPassword(inputPassword, user.password);

    if (passwordCorrect) console.log('Senha correta, usuário autenticado!');
    else {
      setLoadingAuth(false);
      return 406;
    }

    //get qred_token
    let qredToken = await getQredToken();
    console.log('qred token: ' + qredToken);

    try {
      console.log('user data: ' + JSON.stringify(user));
      user.localPassword = inputPassword;
      user.qredToken = qredToken;
      writeUserData(user);
    } catch (error) {
      if (error.code == 'auth/invalid-email') return 400;
      else if (error.code == 'auth/user-not-found') return 404;
      else if (error.code == 'auth/wrong-password') return 406;
      else if (error.code == 'auth/too-many-requests') return 504;
      console.log('Erro: ' + error);
    } finally {
      setLoadingAuth(false);
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
        signUp,
        profilePhoto,
        setProfilePhoto,
        isLoadingAuth,
        setLoadingAuth,
        signOut,
        loadData,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
