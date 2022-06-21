const passport = require("passport");

const authMiddelware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        message: "Unauthorized",
        code: 401,
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = {
  authMiddelware,
};
