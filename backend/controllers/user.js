const User = require("../models/user");

exports.getUserById = async(req, res, next, id) => {
    try {
        const user = await User.findById(id).exec();
        console.log(user)
        if (!user) {
            return res.status(400).json({ error: "No User found" });
        }
        req.profile = user;
        next();
    } catch (err) {
        return res
        console.log(err)
            .status(400)
            .json({ error: err.message || "Error retrieving user" });
    }
};