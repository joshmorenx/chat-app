import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useState, useEffect } from 'react';

interface RegisterForm {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    date: Date;
}

type setState<T> = React.Dispatch<React.SetStateAction<T>>

export function useSendRegisterForm(initialForm: RegisterForm, setShow: setState<boolean>, setDateSetted: setState<boolean>, setDate: setState<Date>) {
    const [formData, setFormData] = useState(initialForm)

    const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>, value: string) => {
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

    return { formData, handleChange, changing }
}