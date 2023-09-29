import {View, Text, Image} from 'react-native';
import {s} from './style';
import {useMemo} from 'react';
export default function Bubble({data}) {
  console.log(data);
  const isSystem = useMemo(() => {
    return data.is_system;
  }, [data]);
  return isSystem ? (
    <Text style={s.chatSystemText}>{data.text}</Text>
  ) : (
    <View style={[s.bubble, data.is_suport ? s.bubbleLeft : s.bubbleRight]}>
      {data?.file !== '' && data?.file !== undefined ? (
        <View style={{rowGap: 20}}>
          <Image source={{uri: data.file}} style={{height: 120, width: 120}} />
          {data.text !== '' && <Text style={s.bubbleText}>{data.text}</Text>}
        </View>
      ) : (
        data.text !== '' && <Text style={s.bubbleText}>{data.text}</Text>
      )}
    </View>
  );
}
