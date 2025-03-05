// @ts-nocheck

// Next - React
import { ReactNode, useState } from "react";

// React icons
import { BiUserCircle } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";

// Components
import DropdownItem from "../DropdownItem";

// Library
import { motion } from "framer-motion";

// Context
import { useWindowSize } from "../../context/useWindowSize";

// Styles
import { UserContainer } from "./styles";
import { useAuthContext } from "../../context/AuthContext";

type UserDropdownType = {
  username: string;
};

function UserDropdown({ username, ...props }: UserDropdownType) {
  const [open, setOpen] = useState(false);

  const { isLogged, userInfo } = useAuthContext();

  return (
    <UserContainer {...props} onClick={() => setOpen(!open)}>
      <div className='content'>
        <BiUserCircle
          style={{
            width: "3rem",
            height: "2rem",
            color: "fff",
            cursor: "pointer",
          }}
        />
        <p>{username}</p>

        {open ? (
          <RiArrowDropDownLine
            style={{
              width: "3rem",
              height: "2rem",
              color: "fff",
              cursor: "pointer",
              transform: "rotate(180deg)",
            }}
          />
        ) : (
          <RiArrowDropDownLine
            style={{
              width: "3rem",
              height: "2rem",
              color: "fff",
              cursor: "pointer",
              transform: "rotate(0deg)",
            }}
            onClick={() => setOpen(!open)}
          />
        )}
      </div>
      {open && (
        <>
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: -60 }} transition={{ delay: 0.1 }}>
            <DropdownItem option={"Sair"} />
          </motion.div>
          {/* {userInfo.setor != 'CCO' ? (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: -64 }}
              transition={{ delay: 0.1 }}
            >
              <DropdownItem option={'Cadastrar Usuário'} />
            </motion.div>
          ) : null} */}
        </>
      )}
    </UserContainer>
  );
}

export default UserDropdown;
