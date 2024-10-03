import { Link, useNavigation } from "@react-navigation/native";
import { Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { useState } from "react";

export default function Index() {
  const [pressed, setPressed] = useState<boolean>(false);
  const navigation: any = useNavigation(); // Obtén el objeto de navegación

  const btnPressedStyle = {
    borderRadius: 5,
    width: 350,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 5
  };

  const btnReleasedStyle = {
    borderRadius: 5,
    width: 350,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: "bold", textAlign: "center", color: "#0a7ea4" }}>Welcome!</Text>
        <TextInput placeholder="Username" style={{ width: 350, height: 60, borderColor: "gray", borderWidth: 1, margin: 10, padding: 10, borderRadius: 5 }} />
        <TextInput placeholder="password" secureTextEntry={true} style={{ width: 350, height: 60, borderColor: "gray", borderWidth: 1, margin: 10, padding: 10, borderRadius: 5 }} />
        <Button mode="contained-tonal" style={{ marginTop: 15, ...pressed ? btnPressedStyle : btnReleasedStyle }} onPressIn={() => setPressed(!pressed)} onPressOut={() => setPressed(!pressed)}>Login</Button>
      </View>
      <View style={{ marginTop: 15, gap: 80, display: "flex", flexDirection: "row" }}>
        <Button onPress={() => navigation.navigate({ name: "register" })}><Text style={{ color: "#0a7ea4", textDecorationLine: "underline" }}>Register</Text></Button>
        <Button onPress={() => navigation.navigate({ name: "forgot" })}><Text style={{ color: "#0a7ea4", textDecorationLine: "underline" }}>Forgot Password</Text></Button>
      </View>
    </View>
  );
}