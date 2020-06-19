import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { errorMsg, status } from '../helpers/status';

dotenv.config();

/**
 * Verify Token
 * @param {object} req
 * @param {object} res
 * @param {ovject} next
 * @returns {Promise<*>} response object
 */
const verifyToken = async (req, res, next) => {
    const { token } = req.header;
    if (!token) {
        errorMsg.error = 'Token not provided';
        return res.status(status.bad).send(errorMsg);
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = {
            email: decoded.email,
            user_id: decoded.user_id,
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            isAdmin: decoded.isAdmin
        };
        next();
    } catch (error) {
        errorMsg.error = 'Authentication Failed';
        return res.status(status.unauthorized).send(errorMsg);
    }
};

export default verifyToken;