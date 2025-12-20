const user = require('../../models/users');
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;
    try {
    const foundUser = await user.findOne({ where: { username } });
    if (foundUser) {
      const passwordMatch = await bcrypt.compare(password, foundUser.password);
      if (passwordMatch) {
      res.status(200).json({ message: "Login successful", user: foundUser });
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