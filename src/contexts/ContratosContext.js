import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export const ContratoContext = createContext({});

export default function ContratoProvider({children}) {
  /*
  contrato vazio
  */
  const [contratos, setContratos] = useState([]);

  /*
  contratos 
  */

  // const [contratos, setContratos] = useState([
  //   {
  //     id: '1',
  //     nome: 'Maria Edilsa da Silva',
  //     codigo: '2456',
  //     cpf: '123456789',
  //     email: 'maria@maria.com',
  //     createdAt: '23/07/2022',
  //     pago: true,
  //     valor: 2090,
  //     em_analise: false,
  //     aprovado: true,
  //     reprovado: false,
  //     condicao: 'empresario',
  //     estado: 'Minas Gerais',
  //     inss: 'INSS',
  //   },
  //   {
  //     id: '2',
  //     nome: 'Maria Edilsa da Silva',
  //     codigo: '2455',
  //     cpf: '123456789',
  //     email: 'maria@maria.com',
  //     createdAt: '23/07/2022',
  //     pago: false,
  //     valor: 2090,
  //     em_analise: true,
  //     aprovado: false,
  //     reprovado: false,
  //     condicao: 'empresario',
  //     estado: 'Minas Gerais',
  //     inss: 'INSS',
  //   },
  // ]);

  return (
    <ContratoContext.Provider
      value={{
        contratos,
        setContratos,
      }}>
      {children}
    </ContratoContext.Provider>
  );
}
