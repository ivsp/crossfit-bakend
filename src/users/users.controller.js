import {
  logoutUser,
  modifyUserDataByEmailAndBody,
  retrieveUserInfoByEmail,
} from "./users.model.js";

export const getUserInfo = async (req, res) => {
  // llamo al usuario
  try {
    const user = await retrieveUserInfoByEmail(req.email);
    res.json(user); // deveulvo la info del usuario
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

/**
 * 1. Verificar que el token JWT es el correcto y obtener el email del usuario
 *  a.1 Se realiza en el middleware de autenticacion
 * 2. Si el token es correcto y el usuario existe, recupero la info del usuario y la modifico
 * 3. Devuelvo el usuario
 */
export const logoutCtrl = async (req, res) => {
  const email = req.email;
  const user = await retrieveUserInfoByEmail(email);
  if (user !== null) {
    // paso 2
    // existe el usuario con esas condiciones
    //le cambio el estado de logged a NO
    await logoutUser(email);
    res.status(201).json({
      user_logged: user.logged,
    }); // paso 3
  } else {
    res.sendStatus(404).json({ error: "El usuario no existe" });
  }
};

/**
 * 1. Verificar que el token JWT es el correcto y obtener el email del usuario
 *  a.1 Se realiza en el middleware de autenticacion
 * 2. Si el token es correcto y el usuario existe, recupero la info del usuario y la modifico
 * 3. Devuelvo el usuario
 */
export const modifyDataCtrl = async (req, res) => {
  const email = req.email;
  const body = req.body;
  const user = await retrieveUserInfoByEmail(email);
  if (user !== null) {
    // paso 2
    // existe el usuario con esas condiciones
    //le modifico los datos que me manda en el body
    await modifyUserDataByEmailAndBody(email, body);

    res.status(201).json(user); // paso 3
  } else {
    res.sendStatus(404).json({ error: "El usuario no existe" });
  }
};
