import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../redux/user/userActions";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const clickHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="header">
      <a href="/" className="logo">
        Kontakt
      </a>
      <nav className="navbar">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
      <div className="right-menu">
        <a href="#" className="user">
          {userInfo ? userInfo.Name : ""}
        </a>
        <a href="#" onClick={clickHandler}>signOut</a>
        <div className="fas fa-bars"></div>
      </div>
    </div>
  );
};

export default Header;
