import React from "react";
import { View, FlatList, StyleSheet, Image } from "react-native";
import BottomModal, { BottomModalRef } from "@/components/BottomSheet";
import { ButtonBrand } from "@/components/button/ButtonBrand";
import { ThemedText } from "@/components/ThemedText";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

interface CreditSignUpProps {
    modalRef: React.RefObject<BottomModalRef>;
}

const CreditSignUp = ({ modalRef }: CreditSignUpProps) => {

    return (
        <BottomModal snapPoint={1000} ref={modalRef}>
            <View style={styles.contentContainer}>
                <View style={styles.img}>
                    <Image source={require('../../../components/img/Group35229.png')} />
                </View>

                <View style={styles.text}>
                    <ThemedText type="headerText1">
                        Sign Up Via Credit
                    </ThemedText>
                    <ThemedText type="signUp" style={{ marginTop: heightPercentageToDP(-2) }}>
                        Sign up instantly
                    </ThemedText>
                </View>

                <View style={styles.button}>
                    <ButtonBrand text="Sign Up" />
                </View>

            </View>

        </BottomModal>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        alignContent: 'center',
        alignItems: 'center',

    },
    img: {
        marginLeft: widthPercentageToDP(-8)
    },
    text: {
        alignContent: 'center',
        alignItems: 'center',
        marginTop: widthPercentageToDP(5),

    },
    button: {
        marginTop: widthPercentageToDP(15),
    }
});

export default CreditSignUp;