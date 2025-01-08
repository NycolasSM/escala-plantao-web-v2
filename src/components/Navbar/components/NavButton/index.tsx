import Link from "next/link";
import React, { ReactElement } from "react";

import { Item } from "./styles";

type Props = {
  navLink: string;
  icon?: ReactElement;
  initials: string;
  name: string;
  hasHightlight: boolean;
  style?: any;
};

const NavButton: React.FC<Props> = ({ navLink, icon, initials, name, hasHightlight, style }) => {
  return (
    <Link href={navLink} style={style}>
      <Item hasHightlight={hasHightlight} data-tooltip-id="my-tooltip" data-tooltip-content={name} >
        {icon}
      </Item>
    </Link>
  );
};

export default NavButton;
