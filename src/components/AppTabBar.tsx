import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import type { ComponentProps } from 'react';
import type { Tabs } from 'expo-router';

import { Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/theme';

type BottomTabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

const items = {
  index: { label: 'Plan', icon: 'calendar-outline' },
  transactions: { label: 'Activity', icon: 'list-outline' },
  insights: { label: 'Insights', icon: 'stats-chart-outline' },
} as const;

export function AppTabBar({ state, emitter, navigateToTab }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const canvas = Math.min(width, 480);
  return <View style={[styles.shell, { width: canvas - 32, left: (width - canvas) / 2 + 16, bottom: Math.max(insets.bottom, 15) }]}>
    {Platform.OS === 'ios' && <BlurView tint="dark" intensity={24} style={StyleSheet.absoluteFill} />}
    {state.routes.map((route, index) => {
      const item = items[route.name as keyof typeof items];
      if (!item) return null;
      const selected = state.index === index;
      return <Pressable key={route.key} onPress={() => {
        const event = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
        if (!selected && !event.defaultPrevented) navigateToTab(route.key);
      }} accessibilityRole="tab" accessibilityLabel={item.label} accessibilityState={{ selected }}
        style={[styles.tab, selected && styles.active]}>
        <Ionicons name={item.icon} size={22} color={selected ? colors.text : colors.muted} />
        <Text style={[styles.label, selected && { color: colors.text }]}>{item.label}</Text>
      </Pressable>;
    })}
  </View>;
}
const styles = StyleSheet.create({
  shell: { position: 'absolute', height: 68, borderRadius: 36, flexDirection: 'row', padding: 6, gap: 5,
    borderWidth: 1, borderColor: 'rgba(203,222,245,0.30)', backgroundColor: 'rgba(29,45,65,0.94)', overflow: 'hidden' },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4, borderRadius: 29 },
  active: { backgroundColor: 'rgba(184,211,239,0.18)' },
  label: { color: colors.muted, fontSize: 10 },
});
