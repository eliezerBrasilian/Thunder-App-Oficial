import {Text, TextInput, View} from 'react-native';
import {s} from './style';
import {colors} from '../../../assets/colors';
import MaskInput from 'react-native-mask-input';
export default function Input({
  label,
  backgroundColor,
  placeholderText,
  placeholderColor,
  value,
  setValue,
  keyboardType = 'default',
  allCaps = 'sentences',
  isPassword = false,
  isMaskInput = false,
  mask,
}) {
  return (
    <View style={s.container}>
      <Text style={s.label}>{label}</Text>
      <View style={[s.inputView, {backgroundColor: backgroundColor}]}>
        {isMaskInput ? (
          <MaskInput
            value={value}
            style={[s.textInput, s.label]}
            placeholder={placeholderText}
            placeholderTextColor={placeholderColor}
            keyboardType={keyboardType}
            onChangeText={(masked, unmasked) => {
              setValue(unmasked); // you can use the unmasked value as well
            }}
            mask={mask}
          />
        ) : (
          <TextInput
            selectionColor={colors.main_blue}
            style={[s.textInput, s.label]}
            placeholder={placeholderText}
            placeholderTextColor={placeholderColor}
            value={value}
            onChangeText={t => setValue(t)}
            keyboardType={keyboardType}
            secureTextEntry={isPassword}
            autoCapitalize={allCaps}
          />
        )}
      </View>
    </View>
  );
}
