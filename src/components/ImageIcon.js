import {Image} from 'react-native';
export function ImageIcon({source, size = 30}) {
  return (
    <Image
      source={source}
      style={{
        height: size,
        width: size,
      }}
    />
  );
}
