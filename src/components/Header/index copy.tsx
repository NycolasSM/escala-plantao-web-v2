// Next
import Image from "next/image";

// Context
import { useAuthContext } from "../../context/AuthContext";
import { useWindowSize } from "../../context/useWindowSize";

// Components
import UserDropdown from "../UserDropdown";
import Navigation from "./components/Navigation";

// Images
import SabespLogo from "../../assets/Sabesp.svg";
import LocalSigLogo from "../../assets/localsig.png";

// Styles
import { HeaderContainer, HeaderLoginMobile } from "./styles2";

// React Icons
import { BiMenu } from "react-icons/bi";

interface HeaderProps {
  //openMenuMobile: boolean;
  setOpenMenuMobile: (value: boolean) => void;
}

const Header = ({ setOpenMenuMobile }: HeaderProps) => {
  // Context
  // Get width of screen
  const { width } = useWindowSize();
  const { isLogged, userInfo } = useAuthContext();

  return (
    <HeaderContainer>
      {width <= 520 && !isLogged && (
        <HeaderLoginMobile>
          <h1>ESCALA DE PLANTÃO DIGITAL</h1>
        </HeaderLoginMobile>
      )}
      {width <= 520 && isLogged && (
        <>
          <div className='icon'>
            <Image src={LocalSigLogo} alt='Logo da LocalSIG' height={48} width={156} />
          </div>
          <div className='menu-hamburguer'>
            <BiMenu size={50} onClick={() => setOpenMenuMobile(true)} />
          </div>
        </>
      )}
      {width > 520 && (
        <div className='main-container'>
          <div className='image-container'>
            <div className='sabesp-img'>
              <Image src={SabespLogo} alt='Logo da Sabesp' width={42} height={52} />
            </div>
            <div className='localsig-img'>
              <a href='https://localsig.com.br/'>
                <Image src={LocalSigLogo} alt='Logo da LocalSIG' height={45} width={150} />
              </a>
            </div>
          </div>
          <h1>ESCALA DE PLANTÃO DIGITAL</h1>

          {isLogged && <UserDropdown username={userInfo.nome} />}
          {isLogged ? userInfo.setor != "CCO" ? <Navigation /> : null : null}
        </div>
      )}
    </HeaderContainer>
  );
};

export default Header;
