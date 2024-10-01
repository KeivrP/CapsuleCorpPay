
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';


const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Aquí puedes implementar la lógica de búsqueda, por ejemplo, enviar una solicitud a un servidor
    console.log('Texto a buscar:', searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Bank "
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
              <FontAwesome name="search" size={20} style={{ color: '#A0A0A0'}} />
              </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: heightPercentageToDP('1.5%'),
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#eeeeee',
    flex: 1,
    fontSize: 13,
    color: '#A0A0A0',
    marginRight: 10,
  },
});

export default SearchBar;