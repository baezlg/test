import sql from "mssql";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import catchAsync from "express-async-handler";
import jwt from "jsonwebtoken";
import config from "./../DBConfig.js";

const authController = {
  register: catchAsync(async (req, res) => {
    const pool = await sql.connect(config);
    const newUser = await pool
      .request()
      .query(
        `INSERT INTO Users VALUES ('${uuidv4()}', '${req.body.Name}', '${
          req.body.Email
        }', '${await bcrypt.hash(req.body.Password, 10)}')`
      );
    if (!newUser) {
      res.status(500).json("Server error");
    }
    res.status(201).json("User Created!");
  }),
  login: catchAsync(async (req, res, next) => {
    const pool = await sql.connect(config);
    const user = await pool
      .request()
      .query(`SELECT * FROM Users WHERE Email='${req.body.Email}'`);
    if (user.rowsAffected > 0) {
      const validatePassword = await bcrypt.compare(
        req.body.Password,
        user.recordset[0].Password
      );
      if (!validatePassword) {
        res.status(500).json("Wrong email or password");
      } else {
        const { Password, ...others } = user.recordset[0];
        const token = jwt.sign({ UserID: others.UserID }, "secret key", {
          expiresIn: "5d",
        });
        res.status(200).json({ ...others, token });
      }
    } else {
      res.status(500).json("Wrong email or password");
    }
  }),
  getUser: catchAsync(async (req, res) => {
    if (req.user.UserID === req.params.id) {
      const pool = await sql.connect(config);
      const user = await pool
        .request()
        .query(`SELECT * FROM Users WHERE UserID='${req.params.id}'`);
      const { Password, ...info } = user.recordset[0];
      res.status(200).json(info);
    } else {
      return res.status(401).json("Not authenticated");
    }
  }),
};

export default authController;
