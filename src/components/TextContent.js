import {Text} from 'react-native';
export function TextContent({title, color = '#000', fontSize = 17}) {
  return <Text style={{color: color, fontSize: fontSize}}>{title}</Text>;
}
