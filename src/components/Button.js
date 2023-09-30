import {TouchableOpacity, ActivityIndicator} from 'react-native';
import {TextContent} from './TextContent';
import {colors} from '../assets/colors';
export function Button({
  title,
  backgroundColor = colors.main_blue,
  fontSize,
  textColor = '#fff',
  width = undefined,
  borderRadius = 10,
  padding = 10,
  onClick = undefined,
  isLoading = false,
}) {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        backgroundColor: backgroundColor,
        padding: padding,
        width: width,
        borderRadius: borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {isLoading ? (
        <ActivityIndicator color={'#fff'} size={20} />
      ) : (
        <TextContent fontSize={fontSize} color={textColor} title={title} />
      )}
    </TouchableOpacity>
  );
}
