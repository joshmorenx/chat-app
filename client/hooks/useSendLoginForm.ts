import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useState, useEffect } from 'react';

interface LoginForm {
    username: string;
    password: string;
}

export function useSendLoginForm(initialForm: LoginForm) {
    const [formFilled, setFormFilled] = useState(false);
    const [loginForm, setLoginForm] = useState(initialForm);
    const validPasswordString: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const validUsernameString: RegExp = /^[a-zA-Z0-9]+$/;

    const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>, field: string) => {
        const { text } = event.nativeEvent;
        setLoginForm({ ...loginForm, [field]: text });
    };

    const sendLoginForm = async () => {
        if (!validPasswordString.test(loginForm.password)) {
            alert("Password is not valid");
            return loginForm;
        }

        if (!validUsernameString.test(loginForm.username)) {
            alert("Username is not valid");
            return loginForm;
        }
    };

    return { loginForm, handleChange, formFilled, setFormFilled, sendLoginForm };
}