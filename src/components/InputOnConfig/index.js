import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';

export default function InputOnConfig({
  placeholderText,
  value,
  setValue,
  isPassword = false,
  onlyRead = true,
}) {
  const [showPassword, setShowPassword] = useState(true);
  if (onlyRead)
    return (
      <View style={[s.container, {flexDirection: 'column', columnGap: 5}]}>
        <Text style={[s.label, {alignSelf: 'flex-start', fontWeight: '400'}]}>
          {placeholderText}
        </Text>
        <View style={s.textView}>
          <Text style={{color: '#1D1D1D', fontSize: 17, fontWeight: '500'}}>
            {value}
          </Text>
        </View>
      </View>
    );
  else {
    return (
      <View style={{rowGap: 10}}>
        <Text style={s.label}>{placeholderText}</Text>
        <View style={[s.textView, s.container]}>
          <TextInput
            selectionColor={colors.main_blue}
            style={[s.textInput, s.label]}
            placeholder={placeholderText}
            placeholderTextColor={colors.placeholder_input}
            value={value}
            onChangeText={t => setValue(t)}
            secureTextEntry={showPassword}
          />
          {value != '' && (
            <TouchableOpacity
              onPress={function () {
                setShowPassword(!showPassword);
                isPassword = false;
              }}
              style={s.icon}>
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  label: {
    fontSize: 17,
    color: '#000',
  },
  inputView: {
    padding: 8,
    borderRadius: 8,
  },
  textView: {
    padding: 10,
    justifyContent: 'center',
    borderRadius: 9,
    borderColor: '#F2F2F2',
    borderWidth: 1,
    width: '100%',
  },
  textInput: {
    fontSize: 19,
    flex: 1,
    color: '#000',
  },
  icon: {
    marginRight: 20,
  },
});
