const moment = require('moment');
const models = require('../models');
const _status = require('../helpers/status');
const _message = require('../helpers/message');
const validation = require('../helpers/validation');

/**
 * Get All Users
 * @param {*} req
 * @returns {object} 
 */
const getUsers = async (req, res) => {
  const users = await models.Users.findAll()
    .catch((err) => {
      console.log(err);
      _message.error.message = 'An error occurred while operating data';
      return res.status(_status.error).json(_message.error);
    });

  if (users == null) {
    _message.error.message = 'No data';
    return res.status(_status.notfound).json(_message.error);
  }

  _message.success.data = users;
  return res.status(_status.success).json(_message.success);
}

/**
 * Get User by id 
 * @param {int} userId 
 * @returns {object}
 */
const getUserById = async (req, res) => {
  const { userid } = req.params;
  const user = await models.Users.findByPk(userid)
    .catch((err) => {
      _message.error.message = 'An error occurred while operating data';
      return res.status(_status.error).json(_message.error);
    });

  if (user == null) {
    _message.error.message = 'No data';
    return res.status(_status.notfound).json(_message.error);
  }

  _message.success.data = user;
  return res.status(_status.success).json(_message.success);
}

/**
 * Create new User - Sign up 
 * @param {object} newUserInfo 
 * @returns {object}
 */
const createNewUser = async (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  // const createdDate = moment(new Date());
  const hashedPassword = validation.hashPassword(password);

  const [newUser, created] = await models.Users.findOrCreate({
    where: { useremail: email },
    defaults: {
      first_name: first_name,
      last_name: last_name,
      password: hashedPassword
    }
  }).catch((err) => {
    _message.error.message = 'An error occurred while operating data';
    return res.status(_status.error).json(_message.error);
  });

  if (created) {
    _message.error.message = 'Already existed user email';
    return res.status(_status.conflict).json(_message.error);
  }

  const token = validation.generateUserToken(newUser.useremail, newUser.id, newUser.first_name
      , newUser.last_name, newUser.isadmin);

  _message.success.data = { token };

  return res.status(_status.success).json(_message.success);
}

/**
 * Login User 
 * @param {object} userCredential 
 * @returns {object}
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await models.User.findOne({ where: { useremail: email } })
    .catch((err) => {
      _message.error.message = 'An error occurred while operating data';
      return res.status(_status.error).json(_message.error);
    });

  if (user == null) {
    _message.error.message = 'No existed user with the email';
    return res.status(_status.notfound).json(_message.error);
  }

  if (!validation.comparePassword(user.password, password)) {
    _message.error.message = 'Incorrect Password';
    return res.status(_status.bad).json(_message.error);
  }

  const token = validation.generateUserToken(user.useremail, user.id, user.first_name, user.last_name, user.isadmin);

  _message.success.data = { token };
  return res.status(_status.success).json(_message.success);

}

/**
 * Only Admin User
 * update to admin 
 * @param {int} userId 
 * @returns {object}
 */
const updateToAdmin = async (req, res) => {
  const { userid } = req.params;

  const admin = await models.Users.update({ isadmin: true }, {
    where: {
      id: userid
    }
  }).catch((err) => {
    _message.error.message = 'An error occurred while operating data';
    return res.status(_status.error).json(_message.error);
  });

  if (admin == null) {
    _message.error.message = 'There is no updated user';
    return res.status(_status.notfound).json(_message.error);
  }

  _message.success.data = admin;
  return res.status(_status.success).json(_message.success);
}

module.exports = {
  getUsers,
  getUserById,
  createNewUser,
  loginUser,
  updateToAdmin
}
