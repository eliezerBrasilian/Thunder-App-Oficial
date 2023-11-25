import {View} from 'react-native';
import {ImageIcon} from './ImageIcon';
import {TextContent} from './TextContent';

export function TextSimilarToInputComponent({
  value,
  setValue,
  label,
  placeholderText,
}) {
  return (
    <View style={{marginTop: 40, rowGap: 5}}>
      <TextContent fontWeight="bold">{label}</TextContent>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 5,
          padding: 13,
          flexDirection: 'row',
          columnGap: 10,
        }}>
        <ImageIcon
          size={25}
          source={require('../assets/images/whatsapp.png')}
        />
        <TextContent fontSize={17}>{value}</TextContent>
      </View>
    </View>
  );
}
