const express = require("express");
const login = require("../controller/login");
const createUser = require("../controller/signup");
const authenticate = require("../middleware/authenticate");
const updatedUser = require("../controller/updateUser");
const refreshToken = require("../controller/refrestoken");
const deleteUser = require("../controller/deleteUser");
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", login);
router.post("/refresh",refreshToken)
router.get("/logout", (req, res) => {
    res.json({ message: "Logged out" });
});

router.put('/update/:id',authenticate,updatedUser)
router.delete('/delete/:id',authenticate,deleteUser)

module.exports = router;
