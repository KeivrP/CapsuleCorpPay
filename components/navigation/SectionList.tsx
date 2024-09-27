import React from 'react';
import { Dimensions, View, Text, StyleSheet, type TextStyle, type StyleProp } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ThemedText } from '../ThemedText';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { disabledColor, primaryColor } from '@/constants/Colors';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const { width: windowWidth } = Dimensions.get('window');

export type SectionProps = {
  description: string
  img?: any
  textStyles?: StyleProp<TextStyle>
};
export const Section = ({ description, img, textStyles = {} }: SectionProps) => {

  return (
    <View style={styles.container}>
      {img}
      <ThemedText type='title' style={styles.text} >{description}</ThemedText>
    </View>
  );
};

export type SectionsListProps = {
  listRef: React.MutableRefObject<FlatList | null>
  items: SectionProps[]
  onScrollX: (positionX: number) => void
};
export const SectionsList = ({ listRef, items, onScrollX }: SectionsListProps) => {
  return (
    <View style={{ flexGrow: 1 }}>
      <FlatList
        ref={listRef}
        horizontal
        pagingEnabled
        contentInsetAdjustmentBehavior="always"
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        data={items}
        onScroll={(e) => {
          onScrollX(e.nativeEvent.contentOffset.x);
        }}
        renderItem={({ item }) => {
          return (
            <Section description={item.description} img={item.img} textStyles={item.textStyles} />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    textAlign: 'center',
    width: '90%',
    paddingVertical: 92,
    fontFamily: 'Poppins-Bold',
  },
  
});
