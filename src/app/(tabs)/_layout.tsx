import { Tabs } from 'expo-router';
import { AppTabBar } from '../../components/AppTabBar';
import { colors } from '../../theme/theme';

export default function TabsLayout() {
  return <Tabs tabBar={props => <AppTabBar {...props} />} screenOptions={{
    headerShown: false, sceneStyle: { backgroundColor: colors.background },
  }}>
    <Tabs.Screen name="index" options={{ title: 'Plan' }} />
    <Tabs.Screen name="transactions" options={{ title: 'Activity' }} />
    <Tabs.Screen name="insights" options={{ title: 'Insights' }} />
  </Tabs>;
}
