import { ScrollView } from "react-native";
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSendRegisterForm } from '@/hooks/useSendRegisterForm'
import { btnPressedStyle, btnReleasedStyle, inputStyle } from '@/components/ThemedInputs';

export default function Register(): JSX.Element {
    const [pressed, setPressed] = useState(false);
    const [dateSetted, setDateSetted] = useState(false);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [formFilled, setFormFilled] = useState(false);
    const { formData, msg, setMsg, handleChange, changing, sendRequest } = useSendRegisterForm({
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        date: new Date()
    }, setShow, setDateSetted, setDate);

    const showDatepicker = (): void => {
        setShow(true);
        setDateSetted(true);
    };

    useEffect(() => {
        if (formData.fullname && formData.username && formData.email && formData.password && formData.confirmPassword && dateSetted) {
            setFormFilled(true);
        } else {
            setFormFilled(false);
        }
    }) 

    useEffect(()=>{
        (msg) && alert(msg)
        setMsg('')
    },[msg])

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: "bold", textAlign: "center", color: "#0a7ea4" }}>New Register</Text>
                <TextInput value={formData.fullname} onChange={(event) => (handleChange(event, 'fullname'))} placeholder="Full Name" style={inputStyle} />
                <TextInput value={formData.username} onChange={(event) => (handleChange(event, 'username'))} placeholder="Username" style={inputStyle} />
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
                            onChange={(changing)}
                        />
                    )}
                </View>
                <TextInput value={formData.email} onChange={(event) => (handleChange(event, 'email'))} placeholder="Email" style={inputStyle} />
                <TextInput value={formData.password} onChange={(event) => (handleChange(event, 'password'))} placeholder="Password" secureTextEntry={true} style={inputStyle} />
                <TextInput value={formData.confirmPassword} onChange={(event) => (handleChange(event, 'confirmPassword'))} placeholder="Confirm Password" secureTextEntry={true} style={inputStyle} />
                <Button onPress={sendRequest} mode="contained-tonal" disabled={!formFilled} style={{ marginTop: 15, ...(pressed ? btnPressedStyle : btnReleasedStyle) }} onPressIn={() => setPressed(!pressed)} onPressOut={() => setPressed(!pressed)}>Register</Button>
            </View>
        </ScrollView>
    );
}
