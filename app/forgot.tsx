import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { useEffect, useState } from "react";

interface ForgotForm {
    emailOrUsername: string;
}

export default function Forgot() {
    const [forgotForm, setForgotForm] = useState<ForgotForm>({ emailOrUsername: "" });
    const [pressed, setPressed] = useState<boolean>(false);
    const [formFilled, setFormFilled] = useState<boolean>(false);

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
        setForgotForm({ ...forgotForm, [field]: text });
    }

    useEffect(() => {
        setFormFilled(!!forgotForm.emailOrUsername);
    }, [forgotForm]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: "bold", textAlign: "center", color: "#0a7ea4" }}>Reset your password</Text>
                <Text style={{ width: 350, fontSize: 16, marginBottom: 10, textAlign: "center", color: "#0a7ea4" }}>Enter your email or username and we'll send you a link to reset your password.</Text>
                <TextInput onChange={(event) => handleChange(event, "emailOrUsername")} placeholder="type your email or username" style={inputStyle} />
                <Button disabled={!formFilled} mode="contained-tonal" style={{ marginTop: 15, ...pressed ? btnPressedStyle : btnReleasedStyle }} onPressIn={() => setPressed(!pressed)} onPressOut={() => setPressed(!pressed)}>Send recovery email</Button>
            </View>
        </View>
    );
}