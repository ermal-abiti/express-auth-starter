import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult, matchedData } from 'express-validator';
import userModel from '../models/userModel.js';

export const register = async (req, res) => {
    try {
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({
                message: 'Validation Error',
                error: validationResult(req).array(),
            });
        }

        let { email, username, password } = req.body;

        // Check if user exists (by username and email)
        const userByEmail = await userModel.findOne({ email });

        if (userByEmail)
            throw new Error('A user with this email already exists!');

        const userByUsername = await userModel.findOne({ username });
        if (userByUsername)
            throw new Error('A user with this username already exists!');

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate token
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });

        // Create user instance
        const newUser = new userModel({
            email,
            username,
            password: hashedPassword,
        });

        // Register new user
        await newUser.save();

        // Return Response
        return res.status(200).json({
            message: 'User registered successfully',
            token,
        });
    } catch (error) {
        return res.status(400).json({
            message: 'An error occured',
            error: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        // Handle Validation
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({
                message: 'Validation Error',
                error: validationResult(req).array(),
            });
        }

        const { username, password } = req.body;

        // Check username credentials
        const user = await userModel.findOne({ username });

        if (!user) {
            throw new Error('Check credentials!');
        }

        // Check password credentials
        const verifyPassword = await bcrypt.compare(password, user.password);

        if (!verifyPassword) {
            throw new Error('Check credentials!');
        }

        // Generate Token
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });

        // Return Response
        return res.status(200).json({
            token,
        });

    } catch (error) {
        return res.status(400).json({
            message: 'An error occured',
            error: error.message,
        });
    }
};

export const getLoggedUser = async (req, res) => {
    const user = await userModel.findOne({username: req.decoded.username}, { password: 0 });

    if (!user) return res.status(401).json({ message: "Error. User does not exist anymore!"});

    return res.json(user);
}