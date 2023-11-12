import {Image} from 'react-native';
export function ImageIcon({
  source = require('../assets/images/login_icon.png'),
  size = 30,
}) {
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
