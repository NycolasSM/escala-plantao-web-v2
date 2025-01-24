import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { InputContainer } from "./styles";

type InputProps = {
    id: string;
    type: string;
    placeholder: string;
    value: string;
    labelName: string;
    onChange: (value: any) => void;
};

const Input = ({ id, type, placeholder, value, labelName, onChange }: InputProps) => {
    const { setErrorMessage } = useAuthContext();

    return (
        <InputContainer>
            <label htmlFor={id}>{labelName}</label>
            <input
                maxLength={labelName === "Login:" ? 6 : 20}
                required
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setErrorMessage(null); onChange(e.target.value) }}
            />
        </InputContainer>
    );
}

export default Input;