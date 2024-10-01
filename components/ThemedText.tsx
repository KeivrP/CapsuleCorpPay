import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { primaryColor } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'signUp' | 'headerText' | 'subtitle1' | 'headerText1' | 'subtitle2' | 'subtitle3' | 'titleCard' | 'amountText' | 'textPayment';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'signUp' ? styles.signUp : undefined,
        type === 'headerText' ? styles.headerText : undefined,
        type === 'subtitle1' ? styles.subtitle1 : undefined,
        type === 'headerText1' ? styles.headerText1 : undefined,
        type === 'subtitle2' ? styles.subtitle2 : undefined,
        type === 'subtitle3' ? styles.subtitle3 : undefined,
        type === 'titleCard' ? styles.titleCard : undefined,
        type === 'amountText' ? styles.amountText : undefined,  
        type === 'textPayment' ? styles.textPayment : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins-Bold',
    color: primaryColor,

  },
  headerText1: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: primaryColor,

  },
  headerText: {
    color: primaryColor,
    fontSize: 27,
    lineHeight: 48,
    fontFamily: 'Poppins-Regular',

  },
  amountText: {
    color: primaryColor,
    fontSize: 25,
    lineHeight: 24,
    fontWeight: 'semibold',
    fontFamily: 'Poppins-Bold',

  },
  signUp: {
    fontSize: 20,
    lineHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins-Regular',
    color: primaryColor,

  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: primaryColor,

  },
  title: {
    fontSize: 23,
    lineHeight: 28.5,
    color: primaryColor,
    fontFamily: 'Poppins-Bold',


  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    color: primaryColor,


  },
  subtitle1: {
    fontSize: 9,
    lineHeight: 15,
    fontFamily: 'Poppins-Regular',
    color: primaryColor,

  },
  subtitle2: {
    fontSize: 10,
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
    color: primaryColor,

  },
  subtitle3: {
    fontSize: 13,
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
    color: primaryColor,

  },
  titleCard: {
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Poppins-Regular',
    color: primaryColor,

  },
  textPayment: {
    fontSize: 17,
    lineHeight: 24,
    fontFamily: 'Poppins-Bold',
    color: primaryColor,

  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
    fontFamily: 'Poppins-Bold',

  },
});
