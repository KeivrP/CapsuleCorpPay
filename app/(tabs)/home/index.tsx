import React, { useEffect, useState } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import Wave from '@/assets/images/Onda.svg';
import HowUse from '@/assets/images/instructions.svg';
import How2Use from '@/assets/images/How2_use.svg';
import NewSale from '@/assets/images/new_sale.svg';
import ShowOrder from '@/assets/images/show-order.svg';
import { useLocalSearchParams } from 'expo-router';
import Notification from '@/assets/images/noticias.svg'
import Back from '@/assets/images/back_button.svg'
import Ilustration from '@/assets/images/ilustraçoes.svg'
import UseBackground from '@/assets/images/Use_background.svg'
import Use2Background from '@/assets/images/Use2_background.svg'
import Frase1 from '@/assets/images/frase1.svg'
import Frase2 from '@/assets/images/frase2.svg'
import Frase3 from '@/assets/images/frase3.svg'
import Frase4 from '@/assets/images/frase4.svg'
import Frase5 from '@/assets/images/frase5.svg'
import Frase6 from '@/assets/images/frase6.svg'
import Frase7 from '@/assets/images/frase7.svg'
import WaveStorage from '@/assets/images/wave-storage.svg';
import styled from 'styled-components';
import WaiterDashboard from '@/components/home/dashboard-operator';
import { useSession } from '@/context/AuthSession';
import AdminDashboard from '@/components/home/admin-dashboard';

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

export default function HomeScreen() {
  const [clientId, setClientId] = useState<string | null>(null);
  const { name } = useLocalSearchParams();
  const [isHowUseVisible, setIsHowUseVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userKind, setUserKind] = useState<string | null>(null);
  const { signOut } = useSession();




  const slides = userKind === 'armazenador' ? [
    { background: <Use2Background />, frase: <Frase5 /> },
    { background: <Use2Background />, frase: <Frase6 /> },
    { background: <Use2Background />, frase: <Frase7 /> },
  ] : [
    { background: <UseBackground />, frase: <Frase1 /> },
    { background: <UseBackground />, frase: <Frase2 /> },
    { background: <UseBackground />, frase: <Frase3 /> },
    { background: <UseBackground />, frase: <Frase4 /> },
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

  return (
    <ScrollView>
      <HomeScreenContainer>
        {/* Cabeçalho */}
        <HeaderContainer>
          <Alltext>
            {false ? (
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
            {false ? <WaveStorage /> : <Wave />}
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
          {true ? <AdminDashboard /> : <WaiterDashboard />}
        </Container>
      </HomeScreenContainer>

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

            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Como usar o Tá Entregue</Text>
            {slides[currentSlide].background}
            {slides[currentSlide].frase}

            <ButtonContainer>
              <NavigationButton userKind={userKind} onPress={handlePrevious} disabled={currentSlide === 0}>
                <NavigationButtonText>Anterior</NavigationButtonText>
              </NavigationButton>
              <NavigationButton userKind={userKind} onPress={handleNext} disabled={currentSlide === slides.length - 1}>
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
})
  `
  flex-direction: row;
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
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled(View)`
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  align-items: center;
  margin-top: 10px;
`;

const CloseButton = styled(TouchableOpacity)`
  align-self: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
`;

const NavigationButton = styled(TouchableOpacity) <{ userKind: string | null }>`
  background-color: ${({ userKind }) => (userKind === 'armazenador' ? '#16488D' : '#DB3319')};
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

