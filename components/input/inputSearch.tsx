/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Keyboard, KeyboardAvoidingView, Text, Platform } from 'react-native';
import * as yup from 'yup';
import { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { SearchBar } from './searchBar';
import { primaryColor } from '@/constants/Colors';

interface InputSearchProps {
  onFocusText: (e: boolean) => void;
  onSearch: (search: string) => void;
}

const schema = yup.object({
  search: yup.string().min(3).required('')
});

const FULL_WIDTH = widthPercentageToDP(40);
const REST_WIDTH = widthPercentageToDP(0);

type TSearchForm = { search: string };

export const InputSearch = ({ onFocusText, onSearch: text }: InputSearchProps) => {
  const [isFocus, setFocus] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const onFocus = () => {
    setFocus(true);
    onFocusText(true);
  };
  const onRemoveFocus = () => {
    setFocus(false);
    onFocusText(false);
  };

  const inputStyles = useAnimatedStyle(() => {
    if (isFocus) {
      return {
        width: withSpring(FULL_WIDTH)
      };
    } else {
      return {
        width: withTiming(REST_WIDTH)
      };
    }
  }, [FULL_WIDTH, REST_WIDTH, isFocus]);

  const buttonStyle = useAnimatedStyle(() => {
    if (isFocus) {
      const scale = withSpring(1.1);
      return {
        transform: [{ scale }]
      };
    } else {
      const scale = withTiming(1);
      return {
        transform: [{ scale }]
      };
    }
  }, [FULL_WIDTH, REST_WIDTH, isFocus]);


  const onSearch = ({ search }: TSearchForm) => {
    if (!isFocus) {
      console.log('clik', isFocus)
      onFocus()
    } else {
      Keyboard.dismiss();
      onRemoveFocus();
      text(search);
    }
  };


  const searchHandler = useCallback(() => {
    onSearch({ search: value });
  }, [value]);

  const ErrorInput = () => {
    try {
      schema.validateSync({ search: value });
      return null;
    } catch (error) {
      if (isFocus) {
        return <Text style={styles.helperText}>Ingresa mínimo 3 caracteres para realizar la búsqueda.</Text>; // Muestra el mensaje de error
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      keyboardVerticalOffset={-200}>
      <View>
        <View>
          <SearchBar
            loading={false}
            value={value}
            onBlur={onRemoveFocus}
            onFocus={onFocus}
            onChangeText={(e) => {
              setValue(e);
            }}
            searchHandler={searchHandler}
            style={inputStyles}
          />
          <ErrorInput />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 15,
    borderColor: 'black',
    alignItems: 'center'
  },
  helperText: {
    marginTop: 5,
    color: 'gray',
    fontSize: 9,
    paddingLeft: 10,
    alignContent: 'center'
  }
});
