import React, {useRef, useEffect, useState} from 'react';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  useWindowDimensions,
  Image,
} from 'react-native';
import {colors} from '../../assets/colors';

const Cards = () => {
  const data = [
    {
      key: '1',
      path: require('../../assets/images/capital_giro_banner.png'),
    },
    {
      key: '2',
      path: require('../../assets/images/capital_giro_banner.png'),
    },
    {
      key: '3',
      path: require('../../assets/images/capital_giro_banner.png'),
    },
  ];

  const scrollX = useRef(new Animated.Value(0)).current;
  const {width: windowWidth} = useWindowDimensions();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % data.length;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
    }, 3000); // Mudar para o intervalo desejado (em milissegundos)

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={s.container}>
      <FlatList
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.key}
        renderItem={({item}) => <Card data={item} width={windowWidth} />}
        horizontal
        snapToInterval={windowWidth} // Define a largura de cada item na FlatList
        decelerationRate={'normal'}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        pagingEnabled
        scrollEventThrottle={16}
      />
      <View style={s.expandingDotContainer}>
        <ExpandingDot
          data={data}
          lineHeight={4}
          expandingDotWidth={10}
          scrollX={scrollX}
          inActiveDotOpacity={0.6}
          dotStyle={{
            width: 10,
            height: 10,
            borderColor: colors.main_green,
            borderWidth: 1,
            borderRadius: 5,
            marginHorizontal: 5,
          }}
          activeDotColor={colors.main_green}
          inActiveDotColor="#fff"
        />
      </View>
    </View>
  );
};

function Card({data, width}) {
  return (
    <Image
      source={data.path}
      style={[s.image, {height: 150, width: width - 20}]}
      resizeMode="cover"
    />
  );
}

const s = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    overflow: 'hidden',
    height: 190,
    width: '100%',
  },

  image: {
    borderRadius: 10,
    marginTop: 3,
  },
  expandingDotContainer: {position: 'absolute', bottom: -7},
});

export default Cards;
