import React from 'react';
import {
  Text,
  View,
  Animated,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view';
import {styles} from './style';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import {strings} from '../../assets/strings';
import {colors} from '../../assets/colors';
import Footer from './Footer';
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export default function OnBoarding() {
  const width = Dimensions.get('window').width;
  const ref = React.useRef<PagerView>(null);
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [0, INTRO_DATA.length];

  const currentPage = React.useRef<number>(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        const nextPage = (currentPage.current + 1) % INTRO_DATA.length;
        ref.current.setPage(nextPage);
        currentPage.current = nextPage;
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
  ).interpolate({
    inputRange,
    outputRange: [0, INTRO_DATA.length * width],
  });

  const onPageScroll = React.useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        },
      ),
    [],
  );

  return (
    <View style={styles.container}>
      <AnimatedPagerView
        initialPage={0}
        ref={ref}
        style={styles.PagerView}
        onPageScroll={onPageScroll}>
        {INTRO_DATA.map(({key, title, img, descricao}) => (
          <View key={key} style={styles.center}>
            <Image
              source={img}
              style={styles.img}
              resizeMode="contain"
              resizeMethod="resize"
            />
            <Text style={[styles.title, {width: '100%'}]}>{title}</Text>
            <Text style={[styles.title, styles.description]}>{descricao}</Text>
            <View>
              <ExpandingDot
                key={key}
                activeDotColor={colors.slider_line}
                inActiveDotColor={colors.placeholder_input}
                data={INTRO_DATA}
                expandingDotWidth={30}
                //@ts-ignore
                scrollX={scrollX}
                inActiveDotOpacity={0.6}
                dotStyle={{
                  width: 15,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 5,
                }}
                containerStyle={{
                  top: 20,
                }}
              />
            </View>
          </View>
        ))}
      </AnimatedPagerView>
      <Footer />
    </View>
  );
}
const INTRO_DATA = [
  {
    key: '1',
    title: strings.ficash_simples,
    img: require('../../assets/images/imagem1.png'),
    descricao: strings.simplifique,
  },
  {
    key: '2',
    title: strings.emprestimo_rapido,
    img: require('../../assets/images/imagem2.png'),
    descricao: strings.simule_seu_emprestimo_de,
  },
  {
    key: '3',
    title: strings.seguro,
    img: require('../../assets/images/imagem3.png'),
    descricao: strings.regulamentado,
  },
];
