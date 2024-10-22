import { ScrollView, Platform, Modal } from "react-native";
import { View, Text, TextInput, Keyboard } from "react-native";
import { Button } from "react-native-paper";
import { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSendRegisterForm } from "@/hooks/useSendRegisterForm";
import {
    btnPressedStyle,
    btnReleasedStyle,
    inputStyle,
} from "@/components/ThemedInputs";

export default function Register(): JSX.Element {
    const [pressed, setPressed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [dateSetted, setDateSetted] = useState(false);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [formFilled, setFormFilled] = useState(false);
    const { formData, msg, setMsg, handleChange, changing, sendRequest } =
        useSendRegisterForm(
            {
                fullname: "",
                username: "",
                date: new Date(),
                email: "",
                password: "",
                confirmPassword: "",
            },
            setShow,
            setDateSetted,
            setDate
        );

    const showDatepicker = (): void => {
        setShow(true);
        setDateSetted(true);
    };

    const changeHandler = (): void => {
        sendRequest();
    };

    useEffect(() => {
        if (
            formData.fullname &&
            formData.username &&
            formData.email &&
            formData.password &&
            formData.confirmPassword &&
            dateSetted
        ) {
            setFormFilled(true);
        } else {
            setFormFilled(false);
        }
    }, [formData, dateSetted]);

    useEffect(() => {
        if (msg) {
            // alert(msg);
            setShowModal(true);
            setMsg(null);
        }
    }, [msg]);

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Modal visible={showModal} animationType="slide">
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            marginBottom: 10,
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "#0a7ea4",
                        }}
                    >
                        Please check your email
                    </Text>
                    <Text style={{ width: 350, fontSize: 16, marginBottom: 10, textAlign: "center", color: "#0a7ea4" }}>
                        we've sent you an email with a 6 digit code to
                        verify your account.
                    </Text>
                    <TextInput
                        aria-label="Enter the code"
                        style={inputStyle}
                        placeholder="Enter the code"
                    />
                </View>
            </Modal>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text
                    style={{
                        fontSize: 24,
                        marginBottom: 10,
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "#0a7ea4",
                    }}
                >
                    New Register
                </Text>
                <TextInput
                    value={formData.fullname}
                    onChange={(event) => handleChange(event, "fullname")}
                    placeholder="Full Name"
                    style={inputStyle}
                />
                <TextInput
                    value={formData.username}
                    onChange={(event) => handleChange(event, "username")}
                    placeholder="Username"
                    style={inputStyle}
                />
                <View>
                    {Platform.OS === "web" ? (
                        // Si estamos en web, usamos un input de tipo date de HTML5
                        <input
                            type="date"
                            onChange={(event) => {
                                const selectedDate = new Date(event.target.value);
                                setDate(selectedDate);
                                changing(event, selectedDate);
                                setDateSetted(true);
                            }}
                            style={{
                                width: 350,
                                height: 60,
                                borderColor: "gray",
                                borderWidth: 1,
                                margin: 10,
                                borderRadius: 5,
                                color: "#767676",
                            }}
                        />
                    ) : (
                        // Si estamos en móvil, usamos el DateTimePicker de react-native
                        <TextInput
                            onPress={showDatepicker}
                            onFocus={Keyboard.dismiss}
                            showSoftInputOnFocus={false}
                            style={{
                                width: 350,
                                height: 60,
                                borderColor: "gray",
                                borderWidth: 1,
                                margin: 10,
                                padding: 10,
                                borderRadius: 5,
                                textAlignVertical: "center",
                                color: "#767676",
                            }}
                        >
                            {!dateSetted
                                ? "Select your date of birth"
                                : date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "2-digit",
                                    year: "numeric",
                                })}
                        </TextInput>
                    )}
                    {show && Platform.OS !== "web" && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={changing}
                        />
                    )}
                </View>
                <TextInput
                    value={formData.email}
                    onChange={(event) => handleChange(event, "email")}
                    placeholder="Email"
                    style={inputStyle}
                />
                <TextInput
                    value={formData.password}
                    onChange={(event) => handleChange(event, "password")}
                    placeholder="Password"
                    secureTextEntry={true}
                    style={inputStyle}
                />
                <TextInput
                    value={formData.confirmPassword}
                    onChange={(event) => handleChange(event, "confirmPassword")}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    style={inputStyle}
                />
                <Button
                    onPress={changeHandler}
                    mode="contained-tonal"
                    disabled={!formFilled}
                    style={{
                        marginTop: 15,
                        ...(pressed ? btnPressedStyle : btnReleasedStyle),
                    }}
                    onPressIn={() => setPressed(!pressed)}
                    onPressOut={() => setPressed(!pressed)}
                >
                    Register
                </Button>
            </View>
        </ScrollView>
    );
}
