const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//@desc Register a new user
//@route Post/api/auth/register
//@acess Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hashed Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Return user data with JWT 
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

//@desc Login user
//@route Post/api/auth/login
//@acess Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

//@desc Get user profile
//@route Post/api/auth/profile
//@acess Private(Requires JWT)
const getUserProfile = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authorized" });
    }
    res.status(200).json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        profileImageUrl: req.user.profileImageUrl || null
    });
};

module.exports = {registerUser,loginUser,getUserProfile};