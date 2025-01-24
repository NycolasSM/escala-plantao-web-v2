import styled from "styled-components";

export const InputContainer = styled.div`
        display: flex;
        flex-direction: column;

        label {
            font-weight: 300;
            font-size: 1rem;
        }

         input { 
            padding: 0.8rem;
            background: #f6f6f6;
            border-radius: 2px;
            outline: none;
            border: 0;
            box-shadow: inset 1px 1px 4px 2px rgba(0, 0, 0, 0.06);
            margin-bottom: 1rem;
        };

        @media (max-width: 520px) {
            label {
                display: none;
            };

            input {
                padding: 1.3rem;
            };
        }

`;