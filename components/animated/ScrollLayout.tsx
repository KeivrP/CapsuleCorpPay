import React from 'react';
import { ScrollView, type ScrollViewProps, StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
export const ScrollLayout = ({
  style,
  contentContainerStyle,
  ...props
}: ScrollViewProps) => {
  return (
    <ScrollView
      style={[styles.container, style]}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: heightPercentageToDP(4),
    backgroundColor: '#fff'
  },
  contentContainer: {
    backgroundColor: '#fff'
  }
});
