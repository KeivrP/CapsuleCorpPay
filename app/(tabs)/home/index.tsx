import React, { useState, Suspense } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

import Wave from '@/assets/images/Onda.svg';
import NewSale from '@/assets/images/new_sale.svg';
import ShowOrder from '@/assets/images/show-order.svg';
import Back from '@/assets/images/back_button.svg'

import WaveStorage from '@/assets/images/wave-storage.svg';
import styled from 'styled-components';
import WaiterDashboard from '@/components/home/dashboard-operator';
import { useSession } from '@/context/AuthSession';
import AdminDashboard from '@/components/home/admin-dashboard';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import OrderScreen from '@/app/payment';
import Invoice from '@/app/payment/invoice';

interface User {
  id?: string;
  email?: string;
  name?: string;
  phone?: string;
  location?: string;
}

export interface PackageHistoryItem {
  id: string;
  status: string;
  client_id: string;
  creation_date: any;
  arrival_date: any;
  delivery_actions: { [key: string]: { action: string; timestamp: any; notification_action?: string; } };
  accepted?: boolean;
  code: string;
  icon: string;
  address: string;
  client_name: string;
  sensitive: boolean;
  weight: 'light' | 'medium';
  order_name: string;
  storage_code: string;
}

export default function MainScreen3({navigation}: {navigation: any}) {
  const [isHowUseVisible, setIsHowUseVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { signOut } = useSession();
  const route = useRouter();

  const [isAdmin, setIsAdmin] = useState(false);

  const slides = [
    { background: <OrderScreen /> },
    { background: <Invoice />, },

  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const toggleUserRole = () => {
    setIsAdmin(prev => !prev);
  };

  return (
    <ScrollView>
      <HomeScreenContainer>
        {/* Cabeçalho */}
        <HeaderContainer>
          <Alltext>
            {isAdmin ? (
              <>
                <HeaderText>
                  Hola  <UserName style={{ color: '#16488D' }}>Keiver</UserName>
                </HeaderText>
                <SubtitleText>Este Dashboard es para administrador</SubtitleText>
              </>
            ) : (
              <>
                <HeaderText>
                  Hola  <UserName>Keiver</UserName>
                </HeaderText>
                <SubtitleText>Este Dashboard es para operador</SubtitleText>
              </>
            )}
          </Alltext>
          <WaveContainer>
            {isAdmin ? <WaveStorage /> : <Wave />}
          </WaveContainer>
        </HeaderContainer>

        <Container>
          <ActionsSection>
            <View style={{ paddingBottom: 5, gap: 15, flexDirection: 'row' }}>

              <TouchableOpacity
                onPress={() => setIsHowUseVisible(true)}
                activeOpacity={1}>
                <HowUseContainer>
                  <NewSale />
                </HowUseContainer>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={signOut}
                activeOpacity={1}>
                <HowUseContainer>
                  <ShowOrder />
                </HowUseContainer>
              </TouchableOpacity>
            </View>
          </ActionsSection>
          {/* <ActionsText>SubTitle</ActionsText> */}
          <Suspense fallback={
            <LoadingContainer>
              <ActivityIndicator size="large" color="#DB3319" />
              <LoadingText>Cargando dashboard...</LoadingText>
            </LoadingContainer>
          }>
            {isAdmin ? <AdminDashboard /> : <Invoice />}
          </Suspense>
        </Container>
      </HomeScreenContainer>

      {/* Botón flotante para cambiar rol */}
      <FloatingButton onPress={toggleUserRole}>
        <Ionicons
          name={isAdmin ? "person-outline" : "business-outline"}
          size={24}
          color="white"
        />
      </FloatingButton>

      <Modal
        visible={isHowUseVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsHowUseVisible(false)}
      >
        <ModalContainer>
          <ModalContent>
            <CloseButton onPress={() => setIsHowUseVisible(false)}>
              <Back />
            </CloseButton>

            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Nuevo servicio</Text>
            {slides[currentSlide].background}

            <ButtonContainer>
              <NavigationButton userKind={""} onPress={handlePrevious} disabled={currentSlide === 0}>
                <NavigationButtonText>Anterior</NavigationButtonText>
              </NavigationButton>
              <NavigationButton userKind={""} onPress={handleNext} disabled={currentSlide === slides.length - 1}>
                <NavigationButtonText>Próximo</NavigationButtonText>
              </NavigationButton>
            </ButtonContainer>
          </ModalContent>
        </ModalContainer>
      </Modal>

      {/* Modal de como usar */}
    </ScrollView>
  );
}

// Styled-components para estilização
const HomeScreenContainer = styled(View)`
  flex: 1;
  background-color: #0f065a;
`;

const HeaderContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: -15px;
`;

const HeaderText = styled(Text)`
  color: #f2f2f2;
  font-size: 28px;
  font-weight: 700;
  margin-top: 15px;
`;

const SubtitleText = styled(Text)`
  font-size: 10px;
  color: #ccc;
  margin-bottom: 10px;
`;

const UserName = styled(Text)`
  color: #DB3319;
`;

const WaveContainer = styled(View)`
  align-items: flex-end;
  margin-top: 12px;
`;

const Container = styled(View)`
  flex: 1;
  padding: 30px;
  background-color: #f5f5f5;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  margin-top: -7px;
`;





const ActionsText = styled(Text)`
  font-size: 20px;
  color: black;
  margin-top: 20px;
  font-weight: bold;
`;

const ActionsSection = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 10,
  },
})`  flex-direction: row;
`;

const Alltext = styled(View)`
  margin: 17px;
margin-top: 30px;
  margin-left: 40px;
  flex: 1;
;`

const HowUseContainer = styled(View)`
  width: 329px;
  height: 127px;
  border-radius: 20px;
  overflow: hidden; 
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  background-color: #f5f5f5;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  elevation: 5;
;`

const ModalContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled(View)`
  width: 95%;
  height: 95%;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  align-items: center;
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
`;

const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  position: absolute;
  bottom: 20px;
`;

const NavigationButton = styled(TouchableOpacity) <{ userKind: string | null }>`
  background-color: ${({ userKind }) => (userKind === 'armazenador' ? '#16488D' : '#0f065a')};
  padding: 15px;
  border-radius: 50px;
  width: 25%;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const NavigationButtonText = styled(Text)`
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
`;

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LoadingText = styled(Text)`
  margin-top: 10px;
  color: #666;
  font-size: 16px;
`;

const FloatingButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 100px;
  right: 20px;
  background-color: #DB3319;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

