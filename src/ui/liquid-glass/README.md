# Liquid glass

Shared visual primitives, independent of navigation and finance data:

- `GlassSurface`: material, focus expansion and spring layout transitions.
- `GlassButton`: a stable 44-point hit target with interactive glass inside.
- `GlassBackdrop`: platform-specific fallback blur behind content.
- `GlassSelectionIndicator`: one spring-driven pill behind stationary tab labels.
  It is solid at rest and turns to glass during touch and navigation movement,
  returning to solid when the spring settles. It follows the actual selected
  route, so prevented navigation never leaves the indicator on a different tab.
- `GlassSelectionTrack`: Gesture Handler pan tracking on the UI thread. Dragging
  starts only inside the oval; movement is clamped to the track. Release selects
  the nearest position (not a velocity-based fling) and only then requests
  navigation. Canceled gestures and prevented navigation snap back. Ordinary taps
  and accessible tab buttons remain available. The app root must be wrapped in
  `GestureHandlerRootView`.

On supported iOS 26+ builds, `expo-glass-effect` supplies the native material and
touch response. Both availability checks must pass. Native touch physics are not
combined with an additional press bounce, and glass/ancestor opacity stays at 1.

Other platforms use a translucent material with edge highlights. Web adds CSS
backdrop blur; older iOS uses Expo BlurView; Android currently uses the translucent
fallback without background refraction. This fallback is not a shader simulation
of Apple's optics. Text and icons render above the background effect.

Reanimated provides fallback press deformation, focus expansion and layout
transitions. Springs honor the system Reduce Motion setting. The native renderer
handles its own accessibility appearance. Keep surrounding header layouts
transparent; apply these primitives only to individual controls.

The module does not fetch data, change filters or handle navigation. Supply those
actions through `GlassButton.onPress` and put existing inputs in `GlassSurface`.

After installing the dependencies, restart Metro so Expo's automatic Worklets
Babel configuration is loaded. Expo Go must match SDK 58; custom development
builds need rebuilding to include the new native dependencies.

References: [Expo GlassEffect](https://docs.expo.dev/versions/v58.0.0/sdk/glass-effect/),
[Expo Reanimated setup](https://docs.expo.dev/versions/v58.0.0/sdk/reanimated/).
