import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Link, useNavigation } from "@react-navigation/native";
import { Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { useEffect, useState } from "react";
import { NavigationProp } from '@react-navigation/native';
import { btnPressedStyle, btnReleasedStyle, inputStyle } from '@/components/ThemedInputs';
import { useSendLoginForm } from '@/hooks/useSendLoginForm';

export default function Index(): JSX.Element {
  const [pressed, setPressed] = useState<boolean>(false);
  const { loginForm, handleChange, formFilled, setFormFilled, sendLoginForm } = useSendLoginForm({
    username: "",
    password: ""
  });

  const navigation: NavigationProp<any> = useNavigation();

  useEffect(() => {
    if (loginForm.username !== "" && loginForm.password !== "") {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  }, [loginForm])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: "bold", textAlign: "center", color: "#0a7ea4" }}>Welcome!</Text>
        <TextInput onChange={(event) => handleChange(event, "username")} placeholder="Username" style={inputStyle} />
        <TextInput onChange={(event) => handleChange(event, "password")} placeholder="Password" secureTextEntry={true} style={inputStyle} />
        <Button onPress={sendLoginForm} disabled={!formFilled} mode="contained-tonal" style={{ marginTop: 15, ...pressed ? btnPressedStyle : btnReleasedStyle }} onPressIn={() => setPressed(!pressed)} onPressOut={() => setPressed(!pressed)}>Login</Button>
      </View>

      <View style={{ marginTop: 15, gap: 80, display: "flex", flexDirection: "row" }}>
        <Button onPress={() => navigation.navigate('register')}><Text style={{ color: "#0a7ea4", textDecorationLine: "underline" }}>Register</Text></Button>
        <Button onPress={() => navigation.navigate('forgot')}><Text style={{ color: "#0a7ea4", textDecorationLine: "underline" }}>Forgot Password</Text></Button>
      </View>
    </View>
  );
}