import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, type ComponentProps } from 'react';
import type { Tabs } from 'expo-router';

import { Pressable, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/theme';
import { GlassSelectionTrack } from '../ui/liquid-glass';

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
  const [interacting, setInteracting] = useState(false);
  const routes = state.routes.filter(route => route.name in items);
  const selectedIndex = routes.findIndex(route => route.key === state.routes[state.index]?.key);
  // 1pt border + 6pt inset on each side, with two 5pt gaps.
  const itemWidth = (canvas - 32 - 14 - (routes.length - 1) * 5) / routes.length;
  function selectTab(index: number) {
    const route = routes[index];
    if (!route) return false;
    const event = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
    if (event.defaultPrevented) return false;
    if (state.routes[state.index]?.key !== route.key) navigateToTab(route.key);
    return true;
  }
  return <GlassSelectionTrack index={selectedIndex} count={routes.length} itemWidth={itemWidth} gap={5}
    interacting={interacting} onSelect={selectTab}
    style={[styles.shell, { width: canvas - 32, left: (width - canvas) / 2 + 16, bottom: Math.max(insets.bottom, 15) }]}>
    {routes.map((route, index) => {
      const item = items[route.name as keyof typeof items];
      if (!item) return null;
      const selected = state.routes[state.index]?.key === route.key;
      return <Pressable key={route.key} pointerEvents="none" onPress={() => selectTab(index)}
        onPressIn={() => setInteracting(true)} onPressOut={() => setInteracting(false)}
        role="tab" accessibilityRole="tab" accessibilityLabel={item.label} accessibilityState={{ selected }}
        style={styles.tab}>
        <Ionicons name={item.icon} size={22} color={selected ? colors.text : colors.muted} />
        <Text style={[styles.label, selected && { color: colors.text }]}>{item.label}</Text>
      </Pressable>;
    })}
  </GlassSelectionTrack>;
}
const styles = StyleSheet.create({
  shell: { position: 'absolute', height: 68, borderRadius: 36, flexDirection: 'row', padding: 6, gap: 5,
    borderWidth: 1, borderColor: 'rgba(203,222,245,0.22)', backgroundColor: '#1d2d41' },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4, borderRadius: 29 },
  label: { color: colors.muted, fontSize: 10 },
});
