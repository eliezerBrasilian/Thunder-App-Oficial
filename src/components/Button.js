import {TouchableOpacity, ActivityIndicator} from 'react-native';
import {TextContent} from './TextContent';
export function Button({
  children,
  backgroundColor = '#4397A9', //ou #27A7C0
  fontSize = 18,
  textColor = '#fff',
  width = 150,
  borderRadius = 25,
  padding = 10,
  onClick = () => {},
  isLoading = false,
  fontWeight = 'normal',
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
        <TextContent
          fontWeight={fontWeight}
          fontSize={fontSize}
          color={textColor}>
          {children}
        </TextContent>
      )}
    </TouchableOpacity>
  );
}
