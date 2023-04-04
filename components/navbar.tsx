import MobileMenu from "./mobilemenu";
import NavBarItem from "./navbaritem";
import {BsChevronDown} from 'react-icons/bs'
import { useCallback, useState } from "react";

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] =useState(false);
    const toggleMobileMenu = useCallback (() => {
        setShowMobileMenu((prev) => !prev);
    }, [showMobileMenu]);
    
  return (
    <nav className="w-full fixed z-40">
      <div
        className="
        px-4
        md:px-16
        py-6
        flex
        flex-row
        items-center
        transition
        duration-500
        bg-zinc-900
        bg-opacity-90
        "
      >
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="logo" />
        <div
          className="
        flex-row
        ml-8
        gap-7
        hidden
        lg:flex
        "
        >
          <NavBarItem label="Home" />
          <NavBarItem label="series" />
          <NavBarItem label="Films" />
          <NavBarItem label="New and Popular" />
          <NavBarItem label="My List" />
          <NavBarItem label="Browse by languages" />
        </div>
        <div
        onClick={toggleMobileMenu}
          className="
        lg:hidden
        flex
        flex-row
        items-center
        gap-2
        ml-8
        cursor-pointer
        relative
        "
        >
        <p 
        className="text-sm text-white">Browse</p>
        <BsChevronDown className="text-white text-sm transition" />
        <MobileMenu
        visible={showMobileMenu}
        
        />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
