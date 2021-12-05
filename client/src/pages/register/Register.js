import React from "react";
import "./Register.scss";

const Register = () => {
  return (
    <div className="register">
      <div className="register__box">
        <div className="register__heading">Register</div>
        <form className="register__form">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" placeholder="Enter Email" />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
          />
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            id="password2"
            placeholder="Confirm password"
          />
          <span>
            Have an Account? <a href="#">Login</a>
          </span>
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
};

export default Register;
