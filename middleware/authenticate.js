const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config();


const authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Token is required" });
    }
    const tokenParts = token.split(' ');
    const actualToken = tokenParts[1];

    try {
        const decoded = jwt.verify(actualToken, process.env.ACCESS_TOKEN_KEY);
        req.user = decoded.id;
        next();
    }
    catch (err) {
        if (err.message == "jwt expired") {
            return res.status(401).json({ message: "Token has expired" });
        }
        return res.status(401).json({ message: "Invalid token" });
    }
}
module.exports = authenticate;
