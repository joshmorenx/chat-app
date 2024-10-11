import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { useEffect, useState } from "react";
import { btnPressedStyle, btnReleasedStyle, inputStyle } from '@/components/ThemedInputs';
import { useSendForgotForm } from '@/hooks/useSendForgotForm';

export default function Forgot(): JSX.Element {
    const [pressed, setPressed] = useState<boolean>(false);
    const { forgotForm, handleChange, formFilled, setFormFilled, sendForgotForm } = useSendForgotForm({
        emailOrUsername: ""
    });

    useEffect(() => {
        setFormFilled(!!forgotForm.emailOrUsername);
    }, [forgotForm]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: "bold", textAlign: "center", color: "#0a7ea4" }}>Reset your password</Text>
                <Text style={{ width: 350, fontSize: 16, marginBottom: 10, textAlign: "center", color: "#0a7ea4" }}>Enter your email or username and we'll send you a link to reset your password.</Text>
                <TextInput onChange={(event) => handleChange(event, "emailOrUsername")} placeholder="type your email or username" style={inputStyle} />
                <Button onPress={sendForgotForm} disabled={!formFilled} mode="contained-tonal" style={{ marginTop: 15, ...pressed ? btnPressedStyle : btnReleasedStyle }} onPressIn={() => setPressed(!pressed)} onPressOut={() => setPressed(!pressed)}>Send recovery email</Button>
            </View>
        </View>
    );
}