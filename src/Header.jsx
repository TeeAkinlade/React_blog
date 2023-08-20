import React from "react";
import { FaMobileAlt, FaTabletAlt } from 'react-icons/fa'

const Header = ({ title, width }) => {

  return (
    <header className="Header">
        <h1>{title}</h1>
        { width < 768 ? <FaMobileAlt />
          : <FaTabletAlt />
        }
    </header>
  )
};

export default Header;
