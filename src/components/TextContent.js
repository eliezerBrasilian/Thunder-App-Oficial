import {Text, TouchableOpacity} from 'react-native';
export function TextContent({
  children,
  color = '#000',
  fontSize = 17,
  fontWeight = 'normal',
  numberOfLines = undefined,
  clickable = false,
  onClick = () => {},
}) {
  if (clickable) {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={onClick}>
        <Text
          numberOfLines={numberOfLines}
          style={{color: color, fontSize: fontSize, fontWeight: fontWeight}}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  } else
    return (
      <Text
        numberOfLines={numberOfLines}
        style={{color: color, fontSize: fontSize, fontWeight: fontWeight}}>
        {children}
      </Text>
    );
}
