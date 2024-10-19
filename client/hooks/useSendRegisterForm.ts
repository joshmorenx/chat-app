import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface RegisterForm {
    fullname: string;
    username: string;
    date: Date;
    email: string;
    password: string;
    confirmPassword: string;
}

type setState<T> = React.Dispatch<React.SetStateAction<T>>
type eventType = NativeSyntheticEvent<TextInputChangeEventData> | any

export function useSendRegisterForm(initialForm: RegisterForm, setShow: setState<boolean>, setDateSetted: setState<boolean>, setDate: setState<Date>) {
    const [formData, setFormData] = useState(initialForm)
    const validEmailString: RegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const validPasswordString: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const validUsernameString: RegExp = /^[a-zA-Z0-9]+$/;
    const validFullNameString: RegExp = /^[a-zA-Z ]+$/;
    const [msg, setMsg] = useState(null)
    const apiUrl = process.env.EXPO_PUBLIC_API_URL

    const handleChange = (event: eventType | any, value: string) => {
        const { text } = event.nativeEvent
        setFormData({ ...formData, [value]: text })
    }

    const changing = (event: any, selectedDate: Date | undefined): void => {
        setShow(false); // Siempre cerramos el DatePicker al seleccionar o cancelar

        // Si se selecciona una fecha, actualizamos
        if (event.type === "set" && selectedDate) {
            setDateSetted(true);
            setDate(selectedDate);
            setFormData({ ...formData, date: selectedDate });
        }

        // Si se cancela la fecha
        if (event.type === "dismissed") {
            setDateSetted(false);
            setFormData({ ...formData, date: new Date() });
        }

        // Si aun no se ha seleccionado una fecha
        if (!selectedDate) {
            setFormData({ ...formData, date: new Date() });
        }
    };

    const sendRequest = async () => {
        if (!validFullNameString.test(formData.fullname)) {
            alert("Name is not valid");
            return;
        }

        if (!validUsernameString.test(formData.username)) {
            alert("Username is not valid");
            return;
        }

        if (!validEmailString.test(formData.email)) {
            alert("Email is not valid");
            return;
        }

        if (!validPasswordString.test(formData.password)) {
            alert("Password is not valid");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        await axios.post(`${apiUrl}/api/register`, {
            userData: formData
        }).then((response) => {
            setMsg(response.data.msg);
            console.log(response.data);
        }).catch((error) => {
            setMsg(error.response.data.error);
        })
    }

    return { formData, msg, setMsg, handleChange, changing, sendRequest }
}