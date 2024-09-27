import NavbarHome from './components/navbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoansHome from './components/Loans';
import RepaymentChart from './components/RepaymentChart';
import LoanHistoryCard from './components/LoanHistory';

export default function HomeScreen() {

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 25 }}>
      <NavbarHome />
      <LoansHome />
      <RepaymentChart />
      <LoanHistoryCard />
    </SafeAreaView>
  );
}
