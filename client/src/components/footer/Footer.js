import React from "react";
import "./Footer.scss";
const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();
  return <div className="footer">&copy; copyright {year} kontakt</div>;
};

export default Footer;
