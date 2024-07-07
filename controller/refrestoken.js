
const { createSecretToken } = require("../helper/TokenGeneration");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../schema/schema")
const dotenv = require("dotenv");


dotenv.config();


const refreshToken = async (req, res) => {

    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Refresh token is required" });
    }
    const tokenParts = token.split(' ');
    const actualToken = tokenParts[1];

    try {
        const decoded = jwt.verify(actualToken, process.env.REFRESH_TOKEN_KEY);
        const newToken = createSecretToken({ id: decoded._id, role: decoded.role }, process.env.REFRESH_TOKEN_KEY, process.env.REFRESH_TOKEN_EXPIRY);
        res.json({ newToken })
    
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
 
}
module.exports = refreshToken