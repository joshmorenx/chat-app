import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

interface RegisterForm {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    date: Date;
}

export default function Register(): JSX.Element {
    const [registerForm, setRegisterForm] = useState<RegisterForm>({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        date: new Date()
    })
    const [pressed, setPressed] = useState<boolean>(false);
    const [dateSetted, setDateSetted] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const [show, setShow] = useState<boolean>(false);
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

    const changing = (event: any, selectedDate: Date | undefined): void => {
        const currentDate: Date = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const showDatepicker = (): void => {
        setDateSetted(true);
        setShow(true);
    };

    const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>, field: string) => {
        const { text } = event.nativeEvent;
        setRegisterForm({ ...registerForm, [field]: text });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: "bold", textAlign: "center", color: "#0a7ea4" }}>New Register</Text>
            <TextInput onChange={(event) => handleChange(event, "fullname")} placeholder="Full Name" style={{ width: 350, height: 60, borderColor: "gray", borderWidth: 1, margin: 10, padding: 10, borderRadius: 5 }} />
            <TextInput onChange={(event) => handleChange(event, "username")} placeholder="Username" style={{ width: 350, height: 60, borderColor: "gray", borderWidth: 1, margin: 10, padding: 10, borderRadius: 5 }} />
            <View>
                <Text onPress={() => showDatepicker()} style={{ width: 350, height: 60, borderColor: "gray", borderWidth: 1, margin: 10, padding: 10, borderRadius: 5, textAlignVertical: "center", color: "#767676" }} >{!dateSetted ? ('Select your date of birth') : date.toLocaleDateString()}</Text>
                {show && (
                    <>
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={changing}
                        />
                    </>
                )}
            </View>
            <TextInput onChange={(event) => handleChange(event, "email")} placeholder="Email" style={{ width: 350, height: 60, borderColor: "gray", borderWidth: 1, margin: 10, padding: 10, borderRadius: 5 }} />
            <TextInput onChange={(event) => handleChange(event, "password")} placeholder="Password" secureTextEntry={true} style={{ width: 350, height: 60, borderColor: "gray", borderWidth: 1, margin: 10, padding: 10, borderRadius: 5 }} />
            <TextInput onChange={(event) => handleChange(event, "confirmPassword")} placeholder="Confirm Password" secureTextEntry={true} style={{ width: 350, height: 60, borderColor: "gray", borderWidth: 1, margin: 10, padding: 10, borderRadius: 5 }} />
            <Button mode="contained-tonal" style={{ marginTop: 15, ...pressed ? btnPressedStyle : btnReleasedStyle }} onPressIn={() => setPressed(!pressed)} onPressOut={() => setPressed(!pressed)}>Login</Button>
        </View>
    );
}