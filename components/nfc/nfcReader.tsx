import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Animated, TextInput, Image, ScrollView } from 'react-native';
import NfcManager, { NfcTech, NfcEvents, TagEvent, Ndef } from 'react-native-nfc-manager';
import { Ionicons } from '@expo/vector-icons';

export default function NFCReaderWriter() {
  const [isNfcEnabled, setIsNfcEnabled] = useState(false);
  const [tagData, setTagData] = useState(null);
  const [inputData, setInputData] = useState('');
  const [animationValue] = useState(new Animated.Value(1));
  const [blockData, setBlockData] = useState([]);

  useEffect(() => {
    const initNFC = async () => {
      try {
        const supported = await NfcManager.isSupported();
        if (supported) {
          await NfcManager.start();
          setIsNfcEnabled(true);
        }
      } catch (err) {
        console.log('Error al inicializar NFC:', err);
        Alert.alert('Error', 'No se pudo inicializar NFC');
      }
    };

    initNFC();

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };
  }, []);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(animationValue, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const readNFC = async () => {
    animateButton();
    try {
      await NfcManager.cancelTechnologyRequest();
      await NfcManager.requestTechnology(NfcTech.MifareClassic);
      const tag = await NfcManager.getTag();

      if (tag) {
        setTagData(tag);
        Alert.alert('Éxito', 'Tag NFC leído correctamente');

        // Leer bloques de la tarjeta
        const blocks = [];
        for (let i = 0; i < 16; i++) { // Suponiendo 16 bloques
          try {
            const block = await NfcManager.mifareClassicHandler.readBlock(i);
            blocks.push({ block: i, data: block });
          } catch (err) {
            console.warn(`Error al leer bloque ${i}:`, err);
          }
        }
        setBlockData(blocks);
      }
    } catch (ex) {
      console.warn('Error en lectura NFC:', ex);
      Alert.alert('Error', 'Error al leer el tag NFC');
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  const writeNFC = async (type) => {
    animateButton();
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const message = type === 'classic' 
        ? Ndef.textRecord(`Classic: ${inputData}`) 
        : Ndef.textRecord(`Ultralig: ${inputData}`);

      const bytes = Ndef.encodeMessage([message]);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        Alert.alert('Éxito', `Mensaje ${type} escrito correctamente`);
      }
    } catch (ex) {
      console.warn(`Error en escritura NFC (${type}):`, ex);
      Alert.alert('Error', `Error al escribir en el tag NFC (${type}). Por favor, verifica que el tag sea compatible.`);
    } finally {
      NfcManager.cancelTechnologyRequest();
    };
  };

  if (!isNfcEnabled) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>NFC no está disponible en este dispositivo</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.header}>
      <Ionicons name="radio-outline" size={80} color="#2196F3" />
      <Text style={styles.userName}>Lector/Escritor NFC</Text>
      <Text style={styles.userSubtitle}>Esta herramienta te permite leer y escribir etiquetas NFC.</Text>
    </View>

      <TextInput
        style={styles.input}
        placeholder="Ingresa el texto para escribir"
        placeholderTextColor="#aaa"
        value={inputData}
        onChangeText={setInputData}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton} onPress={readNFC}>
          <Ionicons name="radio-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Leer NFC</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => writeNFC('classic')}>
          <Ionicons name="pencil-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Escribir Classic</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => writeNFC('ultralig')}>
          <Ionicons name="flash-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Escribir Ultralig</Text>
        </TouchableOpacity>
      </View>

      {tagData && (
        <View style={styles.dataCard}>
          <Text style={styles.dataTitle}>Datos del Tag NFC:</Text>
          <View style={styles.dataContent}>
            <Ionicons name="document-text-outline" size={20} color="#4CAF50" />
            <Text style={styles.dataText}>ID: {tagData.id}</Text>
          </View>
          <View style={styles.dataContent}>
            <Ionicons name="git-branch-outline" size={20} color="#4CAF50" />
            <Text style={styles.dataText}>TechTypes: {tagData.techTypes.join(', ')}</Text>
          </View>
          {tagData.ndefMessage && (
            <View style={styles.dataContent}>
              <Ionicons name="reader-outline" size={20} color="#4CAF50" />
              <Text style={styles.dataText}>Payload: {Ndef.text.decodePayload(new Uint8Array(tagData.ndefMessage[0]?.payload))}</Text>
            </View>
          )}
        </View>
      )}

      {blockData.length > 0 && (
        <View style={styles.dataCard}>
          <Text style={styles.dataTitle}>Datos de los Bloques:</Text>
          {blockData.map((block, index) => (
            <View key={index} style={styles.dataContent}>
              <Ionicons name="cube-outline" size={20} color="#FF9800" />
              <Text style={styles.dataText}>Bloque {block.block}: {block.data}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f5f7',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userSubtitle: {
    fontSize: 14,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    color: '#333',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
  },
  dataCard: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  dataContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dataText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
});
