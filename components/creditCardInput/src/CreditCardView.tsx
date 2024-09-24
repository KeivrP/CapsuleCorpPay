import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type ViewStyle,
} from 'react-native';
import FlipCard from 'react-native-flip-card';
import Icons from './Icons';
import { useMemo } from 'react';
import type { CreditCardIssuer } from './useCreditCardForm';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const CARD_SIZE = { width: widthPercentageToDP("80%"), height: 192 };

const s = StyleSheet.create({
  cardContainer: {},
  cardFace: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  cardMagneticStripe: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 30,
    height: 40,
    backgroundColor: '#000',
  },

  baseText: {
    color: '#424242',
  },
  placeholder: {
    color: '#424242',
  },
  focusedField: {
    fontWeight: 'bold',
    color: '#424242',
  },
  number: {
    fontSize: 21,
    position: 'absolute',
    top: 95,
    left: 28,
  },
  name: {
    fontSize: 16,
    position: 'absolute',
    bottom: 20,
    left: 25,
    right: 100,
  },
  expiryLabel: {
    fontSize: 9,
    position: 'absolute',
    bottom: 50,
    left: 218,
  },
  expiry: {
    fontSize: 16,
    position: 'absolute',
    bottom: 20,
    left: 220,
  },
  amexCVC: {
    fontSize: 16,
    position: 'absolute',
    top: 73,
    right: 30,
  },
  cvc: {
    fontSize: 16,
    position: 'absolute',
    top: 80,
    right: 30,
  },
});

interface Props {
  focusedField?: 'name' | 'number' | 'expiry' | 'cvc';
  type?: CreditCardIssuer;
  name?: string;
  number?: string;
  expiry?: string;
  cvc?: string;

  placeholders?: {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
  };
  style?: ViewStyle;

  fontFamily?: string;
  imageFront?: ImageSourcePropType;
  imageBack?: ImageSourcePropType;
}

const CreditCardView = (props: Props) => {
  const {
    focusedField,
    type,
    name,
    number,
    expiry,
    cvc,
    placeholders = {
      number: '•••• •••• •••• ••••',
      name: '',
      expiry: '••/••',
      cvc: '•••',
    },
    imageFront,
    imageBack,
    fontFamily = Platform.select({
      ios: 'Poppins-Regular',
      android: 'Poppins-Regular',
      web: 'Poppins-Regular',
    }),
    style,
  } = props;

  const isAmex = type === 'american-express';
  const shouldShowCardBack = !isAmex && focusedField === 'cvc';

  const cardIcon = useMemo(() => {
    if (type && Icons[type]) return Icons[type];
    return null;
  }, [type]);

  return (
    <View style={[s.cardContainer, CARD_SIZE, style]}>
      <FlipCard
        flipHorizontal
        flipVertical={false}
        friction={10}
        perspective={2000}
        clickable={false}
        flip={shouldShowCardBack}
      >
        <ImageBackground
          style={[CARD_SIZE, s.cardFace]}
          source={imageFront}
        >
          <LinearGradient
            colors={['rgb(202, 0, 0)', 'rgb(0, 33, 78)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[{ borderTopLeftRadius: 10, borderTopRightRadius: 10, position: 'absolute', height: 42, width: '100%', top: 0 }]}
          />

          {!!cardIcon && (
            <Image
              style={[s.icon]}
              source={{ uri: cardIcon }}
            />
          )}

          <Text
            style={[
              s.baseText,
              { fontFamily },
              s.number,
              !number && s.placeholder,
              focusedField === 'number' && s.focusedField,
            ]}
          >
            {!number ? placeholders.number : number}
          </Text>

          <Text
            style={[
              s.baseText,
              { fontFamily },
              s.name,
              !name && s.placeholder,
              focusedField === 'name' && s.focusedField,
            ]}
            numberOfLines={1}
          >
            {!name ? placeholders.name : name.toUpperCase()}
          </Text>

          <Text
            style={[
              s.baseText,
              { fontFamily },
              s.expiryLabel,
              s.placeholder,
              focusedField === 'expiry' && s.focusedField,
            ]}
          >
            MONTH/YEAR
          </Text>
          <Text
            style={[
              s.baseText,
              { fontFamily },
              s.expiry,
              !expiry && s.placeholder,
              focusedField === 'expiry' && s.focusedField,
            ]}
          >
            {!expiry ? placeholders.expiry : expiry}
          </Text>

          {isAmex && (
            <Text
              style={[
          s.baseText,
          { fontFamily },
          s.amexCVC,
          !cvc && s.placeholder,
          focusedField === 'cvc' && s.focusedField,
              ]}
            >
              {!cvc ? placeholders.cvc : cvc}
            </Text>
          )}
        </ImageBackground>

        <ImageBackground
          style={[CARD_SIZE, s.cardFace]}
          source={imageBack}
        >
          <View style={s.cardMagneticStripe} />
          <Text
            style={[
              s.baseText,
              s.cvc,
              !cvc && s.placeholder,
              focusedField === 'cvc' && s.focusedField,
            ]}
          >
            {!cvc ? placeholders.cvc : cvc}
          </Text>
        </ImageBackground>
      </FlipCard>
    </View>
  );
};

export default CreditCardView;
