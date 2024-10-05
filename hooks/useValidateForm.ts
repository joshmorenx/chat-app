import { useState } from 'react';

interface validateForm {
    value: String
    getGivenData: () => void
}

export function useValidateForm(id: Number, name: String): validateForm {
    const [value, setValue] = useState<String>('')

    function getGivenData(): void {
        setValue(`user's data id: ${id}, name: ${name}`)
    }

    return { value, getGivenData }
}