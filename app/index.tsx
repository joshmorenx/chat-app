import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Link, useNavigation } from "@react-navigation/native";
import { Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { useEffect, useState } from "react";
import { NavigationProp } from '@react-navigation/native';

interface LoginForm {
  username: string;
  password: string;
}

export default function Index() {
  const [loginForm, setLoginForm] = useState<LoginForm>({ username: "", password: "" });
  const [pressed, setPressed] = useState<boolean>(false);
  const [formFilled, setFormFilled] = useState<boolean>(false);

  const navigation: NavigationProp<any> = useNavigation();

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

  const inputStyle = {
    width: 350,
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5
  };

  const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>, field: string) => {
    const { text } = event.nativeEvent;
    setLoginForm({ ...loginForm, [field]: text });
  };

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
        <Button disabled={!formFilled} mode="contained-tonal" style={{ marginTop: 15, ...pressed ? btnPressedStyle : btnReleasedStyle }} onPressIn={() => setPressed(!pressed)} onPressOut={() => setPressed(!pressed)}>Login</Button>
      </View>

      <View style={{ marginTop: 15, gap: 80, display: "flex", flexDirection: "row" }}>
        <Button onPress={() => navigation.navigate('register')}><Text style={{ color: "#0a7ea4", textDecorationLine: "underline" }}>Register</Text></Button>
        <Button onPress={() => navigation.navigate('forgot')}><Text style={{ color: "#0a7ea4", textDecorationLine: "underline" }}>Forgot Password</Text></Button>
      </View>
    </View>
  );
}