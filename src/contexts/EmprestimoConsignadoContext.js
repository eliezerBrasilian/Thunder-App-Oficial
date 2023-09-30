import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import {AuthContext} from './AuthContext';

const EmprestimoConsignadoContext = createContext();

export const useEmprestimoConsignado = () => {
  return useContext(EmprestimoConsignadoContext);
};

export const EmprestimoConsignadoProvider = ({children}) => {
  const {user} = useContext(AuthContext);
  const user_id = user?.user_id;
  const nome = user?.name;
  const telefone = user?.phone;
  const email = user?.email;
  const cpf = user?.cpf;

  async function fazerSolicitacaoEmprestimoConsignado(
    estado_uf,
    convenio,
    estado_do_pedinte,
  ) {
    const data = {
      nome: nome,
      cpf: cpf,
      email: email,
      user_id: user_id,
      telefone: telefone,
      estado_uf: estado_uf,
      convenio: convenio,
      estado_do_pedinte: estado_do_pedinte,
    };
    try {
      const response = await axios.post(
        'http://192.168.100.31:8686/emprestimo-consignado/',
        data,
      );
      await updateDataOnFirestore(
        user_id,
        estado_uf,
        convenio,
        estado_do_pedinte,
      );
      return true;
    } catch (error) {
      console.log(
        'error EMPRESTIMOcONSIGNADOCONTEXT - fazerEmprestimoConsignado(): ',
        error,
      );
      return false;
    }
  }

  async function updateDataOnFirestore(
    user_id,
    estado_uf,
    convenio,
    estado_do_pedinte,
  ) {
    const emprestimo_consignado = {
      estado_uf: estado_uf,
      convenio: convenio,
      estado_do_pedinte: estado_do_pedinte, //aposentado...
      status: true, //solicitou
    };
    await firestore()
      .collection('users')
      .doc(user_id)
      .update({
        emprestimo_consignado: emprestimo_consignado,
      })
      .then(() => {
        console.log('campos  atualizados no firestore');
      })
      .catch(e => {
        console.log('erro au atualizar campos: ' + e);
      });
  }
  return (
    <EmprestimoConsignadoContext.Provider
      value={{fazerSolicitacaoEmprestimoConsignado}}>
      {children}
    </EmprestimoConsignadoContext.Provider>
  );
};
