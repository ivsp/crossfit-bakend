import { retrieveUserInfoByEmail } from "../users/users.model.js";

export const validateUserByEmail = async (req, res, next) => {
  const email = req.email;
  const user = await retrieveUserInfoByEmail(email);
  if (user.type === "user") {
    next();
  } else {
    res
      .status(403)
      .json({ error: "no tiene permisos para apuntrse a un evento" });
  }
};
