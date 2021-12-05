import sql from "mssql";
import { v4 as uuidv4 } from "uuid";
import catchAsync from "express-async-handler";
import config from "./../DBConfig.js";

const contactController = {
  getAllContacts: catchAsync(async (req, res) => {
    if (req.user.UserID === req.params.userID) {
      const pool = await sql.connect(config);
      const contacts = await pool
        .request()
        .query(
          `SELECT * FROM Contacts WHERE UserID= (SELECT UserID from Users WHERE UserID='${req.user.UserID}')`
        );
      res.status(200).json(contacts.recordset);
    } else {
      return res.status(401).json("Not authenticated");
    }
  }),
  getContact: catchAsync(async (req, res) => {
    if (req.user.UserID === req.params.userID) {
      const pool = await sql.connect(config);
      const contact = await pool
        .request()
        .query(
          `SELECT * FROM Contacts WHERE ContactID='${req.params.contactID}'`
        );
      res.status(200).json(contact.recordset[0]);
    } else {
      return res.status(401).json("Not authenticated");
    }
  }),
  CreeateContact: catchAsync(async (req, res) => {
    if (req.user.UserID === req.params.userID) {
      const pool = await sql.connect(config);
      const contacts = await pool
        .request()
        .query(
          `INSERT INTO Contacts VALUES('${req.body.ContactID}','${req.body.Name}', '${req.body.Email}','${req.body.Phone}', '${req.body.Facebook}', '${req.body.Instagram}', '${req.body.Twitter}','${req.user.UserID}')`
        );
      res.status(200).json("Contact Added!");
    } else {
      return res.status(401).json("Not authenticated");
    }
  }),
  updateContact: catchAsync(async (req, res) => {
    if (req.user.UserID === req.params.userID) {
      const pool = await sql.connect(config);
      const contact = await pool.request().query(
        `UPDATE Contacts SET 
          ${`Name='${req.body.Name}'`},
          ${`Email='${req.body.Email}'`},
          ${`Phone='${req.body.Phone}'`},
          ${`Facebook='${req.body.Facebook}'`},
          ${`Instagram='${req.body.Instagram}'`},
          ${`Twitter='${req.body.Twitter}'`}
                     WHERE ContactID='${req.params.contactID}'`
      );
      res.status(200).json(`${contact.rowsAffected} row updated`);
    } else {
      return res.status(401).json("Not authenticated");
    }
  }),
  deleteContact: catchAsync(async (req, res) => {
    if (req.user.UserID === req.params.userID) {
      const pool = await sql.connect(config);
      const contact = await pool
        .request()
        .query(
          `DELETE FROM Contacts WHERE ContactID='${req.params.contactID}'`
        );
      res.status(204).json(`${contact.rowsAffected} row deleted`);
    } else {
      return res.status(401).json("Not authenticated");
    }
  }),
};

export default contactController;
