// @ts-nocheck

import { DropdownItemContainer } from "./styles";
import { BiLogOut } from "react-icons/bi";
import { MdPersonAddAlt } from "react-icons/md";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useAuthContext } from "../../context/AuthContext";

type DropdownItemProps = {
  option: string;
};

function DropdownItem({ option }: DropdownItemProps) {
  const Router = useRouter();
  const { setIsLogged } = useAuthContext();

  function handleLogout() {
    removeSession();
    setIsLogged(false);
    Router.push("/");
  }

  async function removeSession() {
    let win = window.open(
      "https://localsig.com/escalas/logout.php",
      "windowname",
      "width=1,height=1,left=1,top=1,toolbar=no,status=no"
    );
    setTimeout(function () {
      win!.close();
    }, 70);
  }

  if (option === "Sair") {
    return (
      <DropdownItemContainer onClick={handleLogout}>
        <BiLogOut
          style={{
            width: "2.1rem",
            height: "1.1rem",
            color: "#fff",
            cursor: "pointer",
          }}
        />
        <p>{option}</p>
      </DropdownItemContainer>
    );
  }

  return (
    <DropdownItemContainer
      onClick={() =>
        window.open("https://localsig.com.br/escalas_users", "_blank")!.focus()
      }
    >
      <MdPersonAddAlt
        style={{
          width: "2.4rem",
          height: "1.4rem",
          color: "#fff",
          cursor: "pointer",
        }}
      />
      <p>{option}</p>
    </DropdownItemContainer>
  );
}

export default DropdownItem;
