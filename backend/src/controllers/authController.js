const { createUser, loginUser } = require("../services/authService");

exports.register = async (req, res) => {
  try {
    await createUser(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { token, role } = await loginUser(req.body);
    res.status(200).json({ token, role });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

