import { retrieveUserInfoByEmail } from "../users/users.model.js";

export const validateTypeUserByEmail = async (req, res, next) => {
  const email = req.email;
  const user = await retrieveUserInfoByEmail(email);
  if (user.type === "box") {
    next();
  } else {
    res.status(403).json({ error: "no tiene permisos para crear un evento" });
  }
};
