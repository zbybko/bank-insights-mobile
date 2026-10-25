import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { GestureDetector, useCompetingGestures, usePanGesture, useTapGesture } from 'react-native-gesture-handler';
import { cancelAnimation, ReduceMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { GlassSelectionIndicator } from './GlassSelectionIndicator';

type Props = {
  index: number;
  count: number;
  itemWidth: number;
  gap: number;
  interacting: boolean;
  style: StyleProp<ViewStyle>;
  children: ReactNode;
  // Return false when navigation is prevented, so the oval returns to its route.
  onSelect: (index: number) => boolean;
};

export function GlassSelectionTrack({ index, count, itemWidth, gap, interacting, style, children, onSelect }: Props) {
  const step = itemWidth + gap;
  const position = useSharedValue(Math.max(index, 0) * step);
  const origin = useSharedValue(0);
  const grabbed = useSharedValue(false);
  const [dragging, setDragging] = useState(false);
  const [touching, setTouching] = useState(false);
  const [snapping, setSnapping] = useState(false);
  const [settledIndex, setSettledIndex] = useState(index);
  const finishSnap = useCallback((target: number) => {
    setSnapping(false);
    setSettledIndex(target);
  }, []);
  const snap = useCallback((target: number) => {
    cancelAnimation(position);
    position.set(withSpring(target * step, {
      damping: 22, stiffness: 260, mass: 0.8, reduceMotion: ReduceMotion.System,
    }, finished => {
      if (finished) scheduleOnRN(finishSnap, target);
    }));
  }, [position, step, finishSnap]);

  useEffect(() => {
    grabbed.set(false);
    snap(Math.max(index, 0));
    return () => cancelAnimation(position);
  }, [index, snap, position, grabbed]);

  function beginDrag() {
    setDragging(true);
    setSnapping(true);
  }
  function finishDrag(target: number, canceled: boolean) {
    setDragging(false);
    setSnapping(true);
    snap(!canceled && onSelect(target) ? target : Math.max(index, 0));
  }

  const pan = usePanGesture({
    activeOffsetX: [-5, 5], failOffsetY: [-14, 14], maxPointers: 1,
    onBegin: event => {
      'worklet';
      // x is relative to the fixed track, including its border and inset.
      grabbed.set(index >= 0 && event.x >= position.get() + 7 && event.x <= position.get() + 7 + itemWidth);
      origin.set(position.get());
    },
    onActivate: () => {
      'worklet';
      if (!grabbed.get()) return;
      cancelAnimation(position);
      scheduleOnRN(beginDrag);
    },
    onUpdate: event => {
      'worklet';
      if (grabbed.get()) position.set(Math.max(0, Math.min((count - 1) * step, origin.get() + event.translationX)));
    },
    onDeactivate: event => {
      'worklet';
      if (!grabbed.get()) return;
      grabbed.set(false);
      const closest = Math.max(0, Math.min(count - 1, Math.round(position.get() / step)));
      scheduleOnRN(finishDrag, closest, event.canceled);
    },
    onFinalize: event => {
      'worklet';
      if (event.canceled && grabbed.get()) {
        grabbed.set(false);
        scheduleOnRN(finishDrag, index, true);
      }
    },
  });
  const tap = useTapGesture({
    maxDistance: 5,
    onBegin: () => {
      'worklet';
      scheduleOnRN(setTouching, true);
    },
    onActivate: event => {
      'worklet';
      const target = Math.max(0, Math.min(count - 1, Math.floor((event.x - 7 + gap / 2) / step)));
      scheduleOnRN(onSelect, target);
    },
    onFinalize: () => {
      'worklet';
      scheduleOnRN(setTouching, false);
    },
  });
  const gesture = useCompetingGestures(pan, tap);

  return <GestureDetector gesture={gesture}>
    <View style={style} collapsable={false}>
      {index >= 0 && <GlassSelectionIndicator position={position} itemWidth={itemWidth}
        liquid={interacting || touching || dragging || snapping || settledIndex !== index}
        pressed={interacting || touching || dragging} />}
      {children}
    </View>
  </GestureDetector>;
}
