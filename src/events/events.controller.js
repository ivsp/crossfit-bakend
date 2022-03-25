import {
  retrieveAllCurrentsEventsByEmail,
  retrieveAllPastsEventsByEmail,
} from "./events.model.js";

export const getCurrentsEventsInfoByEmailCtrl = async (req, res) => {
  //lamo al usuario
  const email = req.email;
  try {
    const events = await retrieveAllCurrentsEventsByEmail(email);
    res.status(201).json(events); // paso 2
  } catch (err) {
    console.error(err);
    res
      .status(404)
      .json({ error: "El usuario no tiene dado de alta ningún evento" });
  }
};

export const getPastsEventsInfoByEmailCtrl = async (req, res) => {
  const email = req.email;
  try {
    const events = await retrieveAllPastsEventsByEmail(email);
    res.status(201).json(events); // paso 2
  } catch (err) {
    console.error(err);
    res
      .status(404)
      .json({ error: "El usuario no tiene dado de alta ningún evento" });
  }
};
