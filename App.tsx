import { StatusBar } from 'expo-status-bar';
import { TransactionsScreen } from './src/screens/TransactionsScreen';

export default function App() {
  return (
    <>
      <TransactionsScreen />
      <StatusBar style='auto' />
    </>
  );
}
