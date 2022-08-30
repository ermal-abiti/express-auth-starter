import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const authGuard = async (req, res, next) => {
    try {
        if (
            !req.headers.authorization ||
            req.headers.authorization.split(' ')[0] != 'Bearer'
        ) {
            return res
                .status(401)
                .json({ message: 'Authorization Error. Invalid token!' });
        }

        // Get token from Authorization header
        const token = req.headers.authorization.split(' ')[1];

        // Verify and Decode jwt payload
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Include username into req.decoded from decoded payload
        req.decoded = { username: payload.username };

        // check if user exists in database
        const checkUser = await userModel.findOne({
            username: req.decoded.username,
        });

        if (!checkUser)
            return res
                .status(401)
                .json({
                    message: 'Authentication Error! User does not exist!',
                });

        // Continue
        next();
    } catch (error) {
        return res.status(500).json({
            message: 'An error occured',
            error: error.message,
        });
    }
};
