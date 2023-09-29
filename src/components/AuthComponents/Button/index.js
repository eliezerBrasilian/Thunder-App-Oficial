import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {s} from './style';
import {useContext} from 'react';
import {AuthContext} from '../../../contexts/AuthContext';
export default function Button({title, onclick, backgroundColor = ''}) {
  const {isLoadingAuth} = useContext(AuthContext);
  return (
    <TouchableOpacity
      onPress={onclick}
      style={
        backgroundColor == ''
          ? s.btnContainer
          : [s.btnContainer, {backgroundColor: backgroundColor}]
      }>
      {isLoadingAuth ? (
        <ActivityIndicator color="#fff" size={26} />
      ) : (
        <Text style={s.btnText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
