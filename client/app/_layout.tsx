import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="login">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ title: '' }}/>
      <Stack.Screen name="forgot" options={{ title: '' }}/>
    </Stack>
  );
}
