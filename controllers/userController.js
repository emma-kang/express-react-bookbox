// import moment from 'moment';
// import dbQuery from "../database/dbQuery";

// import {
//   hashPassword,
//   comparePassword,
//   generateUserToken
// } from "../helpers/validation";

// import {
//   errorMsg, successMsg, status
// } from "../helpers/status";


// const createNewUser = async (req, res) => {
//   const {
//     email, first_name, last_name, password
//   } = req.body;

//   const createdDate = moment(new Date());
//   const hashedPassword = hashPassword(password);
//   const sql = `INSERT INTO users (useremail, password, firstname, lastname, createddate)
//                values ($1, $2, $3, $4, $5)
//                returning *`;

//   const values = [email, hashedPassword, first_name, last_name, createdDate];

//   try {
//     const {rows} = await dbQuery.query(sql, values);
//     const dbResponse = rows[0];
//     delete dbResponse.password;
//     const token = generateUserToken(dbResponse.email, dbResponse.id,
//       dbResponse.firstname, dbResponse.lastname, dbResponse.isadmin);

//     successMsg.data = dbResponse;
//     successMsg.data.token = token;

//     return res.status(status.created).send(successMsg);

//   } catch (error) {
//     if (error.routine === '_bt_check_unique') {
//       errorMsg.error = 'User with that Email already exist';
//       return res.status(status.conflict).send(errorMsg);
//     }
//     errorMsg.error = 'Operation was not successful';
//     return res.status(status.error).send(errorMsg);
//   }
// };


// const loginUser = async (req, res) => {
//   const {email, password} = req.body;

//   const sql = `SELECT *
//                FROM users
//                WHERE useremail = $1`;
//   try {
//     const {rows} = await dbQuery.query(sql, [email]);
//     const dbResponse = rows[0];
//     if (!dbResponse) {
//       errorMsg.error = 'User with the email does not exist';
//       return res.status(status.notfound).send(errorMsg);
//     }
//     if (!comparePassword(dbResponse.password, password)) {
//       errorMsg.error = 'The password you provided is incorrect';
//       return res.status(status.bad).send(errorMsg);
//     }

//     const token = generateUserToken(dbResponse.useremail, dbResponse.id,
//       dbResponse.firstname, dbResponse.lastname, dbResponse.isadmin);
//     delete dbResponse.password;
//     successMsg.data = dbResponse;
//     successMsg.data.token = token;
//     return res.status(status.success).send(successMsg);
//   } catch (error) {
//     errorMsg.error = 'Operation was not successful';
//     return res.status(status.error).send(errorMsg);
//   }
// };

// const getUsers = async (req, res) => {
//   const sql = `SELECT * from users ORDER By id`;

//   try {
//     const { rows } = await dbQuery.query(sql);
//     const dbResponse = rows;

//     if (dbResponse[0] == undefined) {
//       errorMsg.error = 'There is no stored users in the system';
//       return res.status(status.notfound).send(errorMsg);
//     }

//     successMsg.data = dbResponse;
//     return res.status(status.success).send(successMsg);

//   } catch (error) {
//     errorMsg.error = 'An error occurred while getting user data';
//     return res.status(status.error).send(errorMsg);
//   }
// }

// const getUserById = async (req, res) => {
//   const { userId } = req.params;
//   const sql = `SELECT * from users WHERE id=$1`;

//   try {
//       const { rows } = await dbQuery.query(sql, [userId]);
//       const dbResponse = rows[0];

//       if (!dbResponse) {
//           errorMsg.error = 'User with the id does not exist';
//           return res.status(status.notfound).send(errorMsg);
//       }

//       delete dbResponse.password;
//       successMsg.data = dbResponse;
//       return res.status(status.success).send(successMsg);
//   } catch (error) {
//       errorMsg.error = 'Operation was not successful';
//       return res.status(status.error).send(errorMsg);
//   }
// };

// export {
//   getUsers,
//   getUserById,
//   createNewUser,
//   loginUser
// }