import jwt from "jsonwebtoken";

export const checkisAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded JWT:", decoded); // Debugging step
        if (!decoded.id) {
            return res.status(401).json({ message: "Invalid token structure" });
        }

        // Directly assign decoded.id to req.user
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(401).json({ message: "Token is not valid" });
    }
};
