import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSession } from '@/context/AuthSession';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const route = useRouter();
  const [isPin, setIsPin] = useState(true);
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const { signIn } = useSession();


  const handeSubmit = () => {
    signIn('auth-token');
    route.push('/(tabs)/home')
  }

  const handlePinChange = (text: string, index: number) => {
    if (text.length <= 1) {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);

      if (text.length === 1 && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (index: number) => {
    if (pin[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <LinearGradient
        colors={["#0f065a", "#B2B5DE", "#C8CCE8"]}
        style={styles.gradient}
      >
        {isPin ? (
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Bienvenido</Text>
              <Text style={styles.subtitle}>Configura tu restaurante y empieza a gestionar tus pedidos, inventario y más.</Text>
            </View>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Ingresa el correo"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="#6B7280"
              />

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#6B7280"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Feather
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.signInButton} onPress={handeSubmit}
              >
                <Text style={styles.signInButtonText}>Iniciar </Text>
              </TouchableOpacity>

            </View>
          </View>) : (
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>¡Hola de nuevo!</Text>
              <Text style={styles.subtitle}>Ingresa tu PIN para acceder a tu panel de control.</Text>
            </View>

            <View style={styles.pinContainer}>
              {pin.map((digit, index) => (
                <TextInput
                  key={index.toPrecision(1)}
                  ref={ref => inputRefs.current[index] = ref}
                  style={styles.pinInput}
                  maxLength={1}
                  keyboardType="numeric"
                  secureTextEntry
                  value={digit}
                  onChangeText={(text) => handlePinChange(text, index)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                      handleBackspace(index);
                    }
                  }}
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={handeSubmit}
              style={[
                styles.signInButton,
                pin.every(digit => digit !== '') ? styles.signInButton : {}
              ]}
              disabled={!pin.every(digit => digit !== '')}
            >
              <Text style={styles.signInButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
      <TouchableOpacity style={styles.floatingButton} onPress={() => { setIsPin(!isPin) }}>
        <Feather name="key" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#333333',
  },
  form: {
    gap: 16,
  },
  input: {
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 16,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 14,
  },

  signInButton: {
    backgroundColor: '#FF6B6B',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },



  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 40,
  },
  pinInput: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },

  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
});