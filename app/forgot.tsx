import { Link, useNavigation } from "@react-navigation/native";
import { Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { useState } from "react";

export default function Forgot() {
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
                <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: "bold", textAlign: "center", color: "#0a7ea4" }}>Reset your password</Text>
                <Text style={{ width: 350, fontSize: 16, marginBottom: 10, textAlign: "center", color: "#0a7ea4" }}>Enter your email or username and we'll send you a link to reset your password.</Text>
                <TextInput placeholder="type your email or username" style={{ width: 350, height: 60, borderColor: "gray", borderWidth: 1, margin: 10, padding: 10, borderRadius: 5 }} />
                <Button mode="contained-tonal" style={{ marginTop: 15, ...pressed ? btnPressedStyle : btnReleasedStyle }} onPressIn={() => setPressed(!pressed)} onPressOut={() => setPressed(!pressed)}>Send recovery email</Button>
            </View>
        </View>
    );
}