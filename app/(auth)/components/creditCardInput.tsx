import { ButtonBrand } from '@/components/button/ButtonBrand';
import { CreditCardFormField, CreditCardFormData, CreditCardView, LiteCreditCardInput } from '@/components/creditCardInput/src';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Platform,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';



const s = StyleSheet.create({

    cardView: {
        alignSelf: 'center',
        margin: 30,


    },
    cardInput: {
        borderRadius: 16,
        marginTop: heightPercentageToDP(2),
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    infoContainer: {
        margin: 20,
        padding: 20,
        backgroundColor: '#dfdfdf',
        borderRadius: 5,
    },
    info: {
        fontFamily: Platform.select({
            ios: 'Poppins-Regular',
            android: 'Poppins-Regular',
            web: 'Poppins-Regular',
        }),
    },
    button: {
        marginTop: widthPercentageToDP(15),
    }
});

export default function CreditCard() {

    const route = useRouter();

    const Procede = () => {  
        route.push('/(auth)/signUp/SignUpCreditSucces');
    }

    const [focusedField, setFocusedField] = useState<CreditCardFormField>();

    const [formData, setFormData] = useState<CreditCardFormData>();

    return (
        <>

            <CreditCardView
                name={formData?.values.name}
                focusedField={focusedField}
                number={formData?.values.number}
                expiry={formData?.values.expiry}
                cvc={formData?.values.cvc}
                style={s.cardView}
            />

            

            <LiteCreditCardInput
                autoFocus
                style={s.cardInput}
                onChange={setFormData}
                onFocusField={setFocusedField}
            />

            <View style={s.button}>
                <ButtonBrand text="Proceed" onPress={() => Procede()} disabled={!formData?.valid} />
            </View>

        </>
    );
}
