import styled, { keyframes } from "styled-components";

const FadeAnimation = keyframes`
    from { transform: translateX(-100%) }
    to { transform: translateX(0) }
`;

export const MenuMobileContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;

    height: 100%;
    width: 100%;

    min-height: 100vh;

    z-index: 2;

    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px); 

    .content {
        display: flex;

        position: absolute;
        top: 0;
        left: 0;

        z-index: 3;

        width: 70%;
        height: 100%;

        background: #fff;
        box-shadow: inset 2rem 3rem 3rem rgb(0 0 0 / 2%);
        
        animation: ${FadeAnimation} 0.5s ease-in-out;
    
        .close-icon {
            cursor: pointer;

            position: absolute;
            right: 1rem;
            top: 1rem;
        };

        .user {
            position: absolute;
            top: 4rem;
            left: 1.5rem;

            width: fit-content;

            .user-informations {
                display: flex;
                align-items: center;
                gap: .5rem;

                margin-bottom: 2rem;

                h1 {
                    font-size: .8rem;
                    font-weight: 400;
                }
            };

            .logout {
                position: absolute;
                left: .3rem;

                cursor: pointer;

                display: flex;
                justify-content: center;
                align-items: center;
                gap: .3rem;
            }
        };
    };
`;