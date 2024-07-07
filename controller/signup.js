const User = require("../schema/schema");
const { createSecretToken } = require("../helper/TokenGeneration");
const env = require("dotenv")
const bcrypt = require("bcrypt");


const createUser = async (req, res) => {
    try {
        if (
            !(
                req.body.email &&
                req.body.password &&
                req.body.name &&
                req.body.username
            )
        ) {
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ email: req.body.email });


        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
           bcrypt.hash(req.body.password, 10, async (_err, hash )=> {;
            const newUser = new User({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: hash,
                roles: req.body.roles,
            })
            const user = await newUser.save();
            return res.json(user);
        });
      
    } catch (error) {
    }
}
module.exports = createUser;
