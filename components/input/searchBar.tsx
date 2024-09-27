import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  type TextInputProps,
  Keyboard,
  View,
  ActivityIndicator
} from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated from 'react-native-reanimated';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { primaryColor } from '@/constants/Colors';

const TextInputAnimated = Animated.createAnimatedComponent(TextInput);
const TouchAnimated = Animated.createAnimatedComponent(TouchableOpacity);

interface Props extends TextInputProps {
  searchHandler: () => void
  loading: boolean
}

export const SearchBar = ({
  searchHandler,
  value,
  loading,
  onChangeText,
  style,
  onFocus,
  onBlur,
}: Props): JSX.Element => {

  function onHideKeyboard() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    searchHandler();
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[style, styles.containerInputBar]}>
        <TextInputAnimated
          onFocus={onFocus}
          onBlur={onBlur}
          defaultValue={value}
          onChangeText={onChangeText}
          style={styles.textInput}
          placeholderTextColor={'gray'}
          onSubmitEditing={onHideKeyboard} // Add this line to handle the Enter key press
        />
        <TouchAnimated
          style={[styles.buttonSearch]}
          onPress={() => {
            onHideKeyboard();
            onFocus();
          }}
        >
          {loading
            ? (
              <ActivityIndicator />
            )
            : (
              <FontAwesome name="search" style={styles.buttonIcon} />
            )}
        </TouchAnimated>
      </Animated.View>
    </View>
  );
};
const RATIO = hp(6);

const styles = StyleSheet.create({
  container: {

  },
  containerInputBar: {
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderColor: 'gray',
    maxHeight: hp(5.9),
    width: '60%',
  },
  textInput: {
    paddingLeft: 15,
    fontWeight: '500',
    fontSize: 12,
    color: 'gray',
    flex: 1
  },
  buttonSearch: {
    backgroundColor: 'transparent',
    width: RATIO,
    height: RATIO,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonIcon: {
    color: primaryColor,
    fontSize: 18,
    fontWeight: '900'
  }
});
