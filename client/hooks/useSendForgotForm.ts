import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useState, useEffect } from 'react';

interface ForgotForm {
    emailOrUsername: string;
}

export function useSendForgotForm(initialForm: ForgotForm) {
    const [forgotForm, setForgotForm] = useState(initialForm);
    const [formFilled, setFormFilled] = useState(false);
    const validUsernameString: RegExp = /^[a-zA-Z0-9]+$/;
    const validEmailString: RegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>, field: string) => {
        const { text } = event.nativeEvent;
        setForgotForm({ ...forgotForm, [field]: text });
    };

    const sendForgotForm = async () => {
        if (!validEmailString.test(forgotForm.emailOrUsername) && !validUsernameString.test(forgotForm.emailOrUsername)) {
            alert("Email or username is not valid");
            return forgotForm;
        }
    }

    return { forgotForm, handleChange, formFilled, setFormFilled, sendForgotForm };
}