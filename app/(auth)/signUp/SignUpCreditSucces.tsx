import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { ButtonBrand } from "@/components/button/ButtonBrand";
import { ThemedText } from "@/components/ThemedText";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useSession } from "@/context/AuthSession";


const SignUpCreditSucces = () => {

    const route = useRouter();
    const { signIn } = useSession();

    const { token } = useGlobalSearchParams();
    const singUp = () => {
        if (token) {
            signIn(token as string);
            route.push('/(tabs)/home');

        }
    }

    console.log(token, 'token');


    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>

                <Image source={require('../../../components/img/Group35209.png')} style={styles.img} />
            </View>
            <View style={styles.text}>
                <ThemedText type="headerText1">
                    Congratulations
                </ThemedText>
            </View>
            <View style={styles.button}>
                <ButtonBrand text="Get Started" onPress={() => singUp()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    svg: {
        position: 'absolute',
        top: 140,
        left: 90,
        right: 0,
        bottom: -90,
        zIndex: -1,
    },
    img: {
        marginBottom: widthPercentageToDP(5),
        marginLeft: widthPercentageToDP(-8)
    },
    text: {
        alignItems: 'center',
        marginBottom: widthPercentageToDP(5),
    },
    button: {
        marginTop: widthPercentageToDP(5),
    }
});

export default SignUpCreditSucces;
