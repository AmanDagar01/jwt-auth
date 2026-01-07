import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log("Verifying token:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ messsage: "unauthorized: No token" });
    }
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Fixed typo
        req.user = decoded;
        console.log("Token verified successfully");
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

export default verifyToken;