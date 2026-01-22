const user = require('../../models/users');
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const login = async (req, res) => {

  const { username, password } = req.body;
    try {
    const foundUser = await user.findOne({ where: { username } });
    if (foundUser) {
      const passwordMatch = await bcrypt.compare(password, foundUser.password);
      if (passwordMatch) {
     const token =  generateToken({id: foundUser.id});
      res.status(200).json({ message: "Login successful", token, role: foundUser.role, userId: foundUser.id });
      } else {
      res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(401).json({ message: "Invalid username" });
    }
} catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = login;