import { NativeSyntheticEvent, TextInputChangeEventData, ScrollView } from "react-native";
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useValidateForm } from '@/hooks/useValidateForm'

interface RegisterForm {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    date: Date;
}

export default function Register(): JSX.Element {
    const { value, getGivenData } = useValidateForm(10, 'Joshua Moreno');
    const allowedNameCharacters = /^[a-zA-Z\s]*$/;
    const allowedUserCharacters = /^[a-zA-Z0-9]*$/;
    const allowedEmailCharacters = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const allowedPasswordCharacters = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const [registerForm, setRegisterForm] = useState<RegisterForm>({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        date: new Date()
    });
    const [pressed, setPressed] = useState<boolean>(false);
    const [dateSetted, setDateSetted] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const [show, setShow] = useState<boolean>(false);
    const [formFilled, setFormFilled] = useState<boolean>(false);

    const btnPressedStyle = {
        borderRadius: 5,
        width: 350,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 5
    };

    const btnReleasedStyle = {
        borderRadius: 5,
        width: 350,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
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

    const changing = (event: any, selectedDate: Date | undefined): void => {
        setShow(false); // Siempre cerramos el DatePicker al seleccionar o cancelar

        // Si se selecciona una fecha, actualizamos
        if (event.type === "set" && selectedDate) {
            setDateSetted(true);
            setDate(selectedDate);
            setRegisterForm({ ...registerForm, date: selectedDate });
        }
    };

    const showDatepicker = (): void => {
        setShow(true);
    };

    const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>, field: string) => {
        const { text } = event.nativeEvent;
        setRegisterForm({ ...registerForm, [field]: text });
    };

    useEffect(() => {
        const { fullname, username, email, password, confirmPassword } = registerForm;
        if (fullname && username && email && password && confirmPassword && dateSetted) {
            setFormFilled(true);
        } else {
            setFormFilled(false);
        }
    }, [registerForm]);

    useEffect(()=>{
        (value) && alert(value);
    }, [value])

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: "bold", textAlign: "center", color: "#0a7ea4" }}>New Register</Text>
                <TextInput onChange={(event) => handleChange(event, "fullname")} placeholder="Full Name" style={inputStyle} />
                <TextInput onChange={(event) => handleChange(event, "username")} placeholder="Username" style={inputStyle} />
                <View>
                    <Text onPress={showDatepicker} style={{ width: 350, height: 60, borderColor: "gray", borderWidth: 1, margin: 10, padding: 10, borderRadius: 5, textAlignVertical: "center", color: "#767676" }}>
                        {!dateSetted ? 'Select your date of birth' :
                            date.toLocaleDateString('en-US', {
                                month: 'short',  // 'short' para tres letras
                                day: '2-digit',  // siempre muestra dos dígitos
                                year: 'numeric'  // año completo
                            })
                        }
                    </Text>
                    {show && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={changing} // Esta función ahora maneja el cancelar correctamente
                        />
                    )}
                </View>
                <TextInput onChange={(event) => handleChange(event, "email")} placeholder="Email" style={inputStyle} />
                <TextInput onChange={(event) => handleChange(event, "password")} placeholder="Password" secureTextEntry={true} style={inputStyle} />
                <TextInput onChange={(event) => handleChange(event, "confirmPassword")} placeholder="Confirm Password" secureTextEntry={true} style={inputStyle} />
                <Button onPress={() => getGivenData()} disabled={!formFilled} mode="contained-tonal" style={{ marginTop: 15, ...(pressed ? btnPressedStyle : btnReleasedStyle) }} onPressIn={() => setPressed(!pressed)} onPressOut={() => setPressed(!pressed)}>Register</Button>
            </View>
        </ScrollView>
    );
}
