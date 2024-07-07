const User = require("../schema/schema")
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { createSecretToken } = require("../helper/TokenGeneration");

dotenv.config();


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email || password)) {
            return res.status(400).json({ message: "All input fields are required" });
        }


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Please enter  a valid email address" });
        }

        if (!(await bcrypt.compare(password, user?.password))) {
            return res.status(404).json({ message: "Invalid credentials" });
        }
        const token = createSecretToken({ id: user._id, role: user.roles[0] }, process.env.ACCESS_TOKEN_KEY, process.env.ACCESS_TOKEN_EXPIRY);
        const refreshToken = createSecretToken({ id: user._id, role: user.roles[0] }, process.env.REFRESH_TOKEN_KEY, process.env.REFRESH_TOKEN_EXPIRY);
        res.json({ email, id: user._id, password, token, refreshToken });

    }
    catch (err) {
        res.json({ message: err })
    }




}
module.exports = login;

