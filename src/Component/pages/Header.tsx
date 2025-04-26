import React from "react"; 
import { useState } from "react";
import "/src/styles/header.css";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="app-header">
      <div className="logo-con">
        <a href="/" aria-label="Back to homepage">
          <h1>Caseworker</h1>
        </a>
      </div>
     

      <nav
        className={isMenuOpen ? "nav-list-con" : "nav-list-con-mobile"}
        aria-label="Main navigation"
      >
        <ul>
          <li>
            <a href="/">Create task</a>
          </li>
          <li>
            <a href="/all-tasks">All tasks</a>
          </li>
        </ul>
      </nav>
      <div className="burger">
        {isMenuOpen ? (
          <CiMenuBurger onClick={toggleMenu} size={25} color="white" aria-label="Open menu" />
        ) : (
          <IoClose onClick={toggleMenu} size={25}  color="white" aria-label="close menu" />
        )}
      </div>
    </header>
  );
}

export default Header;
