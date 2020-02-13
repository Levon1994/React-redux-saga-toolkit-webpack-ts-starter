import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import Carousel, { CarouselStatic } from 'react-native-snap-carousel';

import { useAction } from 'utils/hooks';
import { ScreenWidth } from 'utils/helpers';
import { Navigation } from 'types';

import { reviewOnBoarding } from 'modules/reviewOnboarding';

import { SCREENS } from './screenData';
import {
  ScreenContainer,
  ImageContainer,
  ImageWrapper,
  StyledImage,
  Title,
  SubTitle,
  PaginationBox,
  StyledPagination,
  StyledButton,
} from './styled';

interface Props {
  navigation: Navigation;
}

export const OnBoardingScreen: React.FC<Props> = ({ navigation }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carousel = useRef<CarouselStatic<{}>>(null);
  const review = useAction(reviewOnBoarding);

  const isLastSlide = activeSlide === SCREENS.length - 1;
  const nextSlide = () => isLastSlide || carousel.current!.snapToNext();
  const homeNavigation = React.useCallback(() => {
    review();
    navigation.navigate('HomeScreen');
  }, []);

  const renderScreen = ({ item }: { item: { image: string; title: string; text: string } }) => {
    return (
      <ScreenContainer>
        <ImageContainer>
          <ImageWrapper>
            <StyledImage source={item.image} />
          </ImageWrapper>
          <View>
            <Title>{item.title}</Title>
            <SubTitle>{item.text}</SubTitle>
          </View>
        </ImageContainer>
      </ScreenContainer>
    );
  };
  return (
    <View>
      <Carousel
        ref={carousel}
        sliderWidth={ScreenWidth}
        itemWidth={ScreenWidth}
        data={SCREENS}
        renderItem={renderScreen}
        onSnapToItem={(index: React.SetStateAction<number>) => setActiveSlide(index)}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
      />
      <PaginationBox>
        <StyledPagination dotsLength={SCREENS.length} activeDotIndex={activeSlide} />
        <StyledButton
          label={isLastSlide ? 'Get started' : 'Next'}
          onPress={isLastSlide ? homeNavigation : nextSlide}
        />
      </PaginationBox>
    </View>
  );
};
