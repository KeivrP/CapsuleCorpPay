import React from "react";
import { View, FlatList, StyleSheet, Image } from "react-native";
import BottomModal, { BottomModalRef } from "@/components/BottomSheet";
import { ButtonBrand } from "@/components/button/ButtonBrand";
import { ThemedText } from "@/components/ThemedText";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { Link, useRouter } from "expo-router";

import NfcManager, { Ndef, NfcTech, } from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
NfcManager.start();

interface PaymentNFCProps {
    modalRef: React.RefObject<BottomModalRef>;
}

const PaymentNFCSheet = ({ modalRef }: PaymentNFCProps) => {

    const route = useRouter();

    async function writeNdefMessage(message) {
        let result = false;

        try {
          // STEP 1
          await NfcManager.requestTechnology(NfcTech.NfcA);
      
          const bytes = Ndef.encodeMessage([Ndef.textRecord('Hello NFC')]);

          console.log('Bytes:', bytes);
      
          if (bytes) {
            await NfcManager.ndefHandler.writeNdefMessage(bytes); // STEP 3
            result = true;
          }
        } catch (ex) {
          console.warn(ex);
        } finally {
          // STEP 4
          NfcManager.cancelTechnologyRequest();
        }
      
        return result;
      }

    async function readNdefMessage() {
        try {
            // Comprueba si el NFC está disponible
            await NfcManager.start();
            console.log('NFC disponible');
            // Espera a que se detecte una etiqueta
            await NfcManager.requestTechnology(NfcTech.Ndef);

            console.log('Etiqueta NFC detectada');
            // Lee los datos de la etiqueta
            let tag = await NfcManager.getTag();
            if (!tag) {
                console.error('No NFC tag detected');
                return;
            }
            console.log('Etiqueta NFC:', tag);

            let ndefMessage = tag.ndefMessage;

            console.log('Mensaje NDEF leído:', ndefMessage);

            // Decodifica el mensaje NDEF
            let records = Ndef.decodeMessage( [209, 1, 12, 84, 2, 101, 110, 72, 101, 108, 108, 111, 32, 78, 70, 67]);

            // Extrae el texto del primer registro (puedes ajustar esto según tu formato)
            let textRecord = records[0];
            let text = Ndef.text.decodePayload(textRecord.payload);

            // Muestra el texto leído
            console.log('Texto leído de la etiqueta:', text);
        } catch (error) {
            console.error('Error al leer la etiqueta:', error);
        } finally {
            // Detén la búsqueda de etiquetas
            await NfcManager.cancelTechnologyRequest();
        }
    }


    return (
        <BottomModal snapPoint={1000} ref={modalRef}>
            <View style={styles.contentContainer}>
                <View style={styles.img}>
                </View>

                <View style={styles.text}>
                    <ThemedText type="headerText1">
                        Payment Via NFC
                    </ThemedText>
                    <ThemedText type="signUp" style={{ marginTop: heightPercentageToDP(-2) }}>
                        instantly
                    </ThemedText>
                </View>

                <View style={styles.button}>
                    <ButtonBrand text="Scan a Tag" onPress={readNdefMessage} />
                </View>
                <View style={styles.button}>
                    <ButtonBrand text="Write a Tag" onPress={() => writeNdefMessage("HOLALL")} />
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

export default PaymentNFCSheet;