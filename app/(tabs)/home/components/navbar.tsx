import { InputSearch } from '@/components/input/inputSearch';
import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const NavbarHome = () => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>

                <Image
                    source={{ uri: "https://avatar.iran.liara.run/public/41" }} // Reemplaza con la ruta de tu imagen
                    style={styles.avatar}
                />
                <View style={{ flexDirection: 'column', padding: 0, margin: 0 }}>
                    <ThemedText type='subtitle2' >Hello</ThemedText>
                    <ThemedText type='defaultSemiBold' style={{ marginTop: heightPercentageToDP(-1) }}>Keiver</ThemedText>
                </View>
            </View>
            <View style={{ flex: 1, marginLeft: widthPercentageToDP('25%') }}>
                <InputSearch onFocusText={(e) => console.log(e)} onSearch={(e) => console.log(e)} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    avatar: {
        width: 53,
        height: 53,
        borderRadius: 20,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default NavbarHome;