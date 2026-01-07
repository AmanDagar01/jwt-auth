import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

// register a new user
export async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        console.log("Registering user:", email);

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exist" });
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

//user login
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        console.log("User login attempt:", email);

        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        // generate JWT token
        const token = jwt.sign(
            {
                id: user._id, email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error", error });
    }
}