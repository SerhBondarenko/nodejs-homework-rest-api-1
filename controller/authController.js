const service = require("../service/authService");

const registrationController = async (req, res, next) => {
  const { email, password } = req.body;
  const userEmail = await service.getUser({ email });
  if (userEmail) {
    return res.status(409).json({
      message: "Email is already in use",
      code: 409,
      data: "Conflict",
    });
  }
  try {
    const user = await service.addUser({ email, password });
    res.status(201).json({
      message: "Registration successful",
      code: 201,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await service.getUser({ email });
  if (!user || !user.validPassword(password)) {
    return res.status(401).json({
      message: "Email or password is wrong",
      code: 401,
      data: "Unauthorized",
    });
  }
  const token = await service.addToken({ user });
  const { subscription } = user;
  return res.json({
    message: "Success",
    code: 200,
    token,
    user: { email, subscription },
  });
};

const logoutController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await service.getUserById(_id);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    await service.removeToken(_id);
    return res.status(204).json('No Content');
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { _id, email, subscription } = req.user;
    const user = await service.getUserById(_id);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    return res.json({
      message: "Success",
      code: 200,
      user: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const { email, subscription } = req.body;
    const user = await service.updateSubscriptionByEmail({
      email,
      subscription,
    });
    res.json({ message: "Updated", code: 200, data: { user } });
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  try {
    const avatarURL = await service.changeAvatar(_id, {
      tempUpload,
      originalname,
    });
    return res.status(200).json({ avatarURL });
  } catch (error) {
    service.unlinkPath({ tempUpload });
    next(error);
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
};
