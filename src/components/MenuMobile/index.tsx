// Next 
import { useRouter } from "next/router";

// React icons
import { IoMdClose } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { RiLogoutBoxLine } from "react-icons/ri";

// Styles
import { MenuMobileContainer } from "./styles";

// Context
import { useAuthContext } from "../../context/AuthContext";
import { useWindowSize } from "../../context/useWindowSize";
import { useEffect } from "react";

interface MenuMobileProps {
    openMenuMobile: boolean;
    setOpenMenuMobile: (value: boolean) => void;
};

function MenuMobile({ openMenuMobile, setOpenMenuMobile }: MenuMobileProps) {

    const { userInfo, setIsLogged } = useAuthContext();
    const { width } = useWindowSize();

    const Router = useRouter();

    function handleLogout() {
        setOpenMenuMobile(false);
        setIsLogged(false);
        Router.push("/");
    };

    useEffect(() => {
        if (openMenuMobile) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        };

    }, [openMenuMobile]);

    return (
        <>
            {openMenuMobile && (
                <MenuMobileContainer>
                    <div className="content">
                        <IoMdClose
                            className="close-icon"
                            size={37}
                            onClick={() => setOpenMenuMobile(false)}
                        />
                        <div className="user">
                            <div className="user-informations">
                                <BiUserCircle className="user-icon" size={40} />
                                <h1>{userInfo.nome}</h1>
                            </div>

                            <div className="logout" onClick={handleLogout}>
                                <RiLogoutBoxLine size={30} />
                                <p>Sair</p>
                            </div>

                        </div>

                    </div>
                </MenuMobileContainer>
            )}
        </>
    );
};

export default MenuMobile;