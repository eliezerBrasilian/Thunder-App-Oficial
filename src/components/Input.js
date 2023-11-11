import {TextInput, View} from 'react-native';
import {TextContent} from './TextContent';
import MaskInput, {Masks} from 'react-native-mask-input';
import {colors} from '../assets/colors';
export function Input({
  value,
  setValue,
  label,
  placeholderText,
  maskedInput = false,
}) {
  return (
    <View style={{marginTop: 40, rowGap: 5}}>
      <TextContent fontWeight="bold">{label}</TextContent>
      <View
        style={{
          borderRadius: 12,
          borderColor: '#4397A9',
          width: '100%',
          borderWidth: 1,
          paddingHorizontal: 5,
        }}>
        {maskedInput ? (
          <MaskInput
            keyboardType="number-pad"
            mask={Masks.BRL_PHONE}
            placeholder={placeholderText}
            placeholderTextColor={colors.placeholder_input}
            onChangeText={t => setValue(t)}
            value={value}
            style={{color: '#000', fontSize: 17}}
          />
        ) : (
          <TextInput
            placeholder={placeholderText}
            placeholderTextColor={colors.placeholder_input}
            onChangeText={t => setValue(t)}
            value={value}
            style={{color: '#000', fontSize: 17}}
            autoCapitalize="none"
          />
        )}
      </View>
    </View>
  );
}
