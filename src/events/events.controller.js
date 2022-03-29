import {
  addUserToaEventByNameAndEmail,
  deletePastsEventsInfoByEmailAndName,
  retrieveAllCurrentsEvents,
  retrieveAllCurrentsEventsByEmail,
  retrieveAllPastsEventsByEmail,
  retrieveEventInfoByName,
} from "./events.model.js";

export const getCurrentsEventsInfoByEmailCtrl = async (req, res) => {
  //lamo al usuario
  const email = req.email;
  try {
    const events = await retrieveAllCurrentsEventsByEmail(email);
    res.status(202).json(events); // paso 2
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

export const deletePastsEventsInfoByEmailAndNameCtrl = async (req, res) => {
  const email = req.email;
  const { eventName } = req.body;
  try {
    const event = await deletePastsEventsInfoByEmailAndName(email, eventName);
    if (event.acknowledged) res.status(201).json(event); // paso 2
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "No se ha encontrado ningún evento" });
  }
};

export const getCurrentEventsInfoCtrl = async (req, res) => {
  try {
    const events = await retrieveAllCurrentsEvents();
    if (events !== null) res.status(201).json(events); // paso 2
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "No se ha encontrado ningún evento" });
  }
};

export const addUserToaEventByEmailAndEvNameCtrl = async (req, res) => {
  try {
    const email = req.email;
    const { eventName } = req.body;
    const newPerson = [email];
    const event = await retrieveEventInfoByName(eventName);

    if (event !== null) {
      const newUSer = await addUserToaEventByNameAndEmail(eventName, email);
      if (newUSer !== null) {
        const newArr = event.eventJoinPerson.concat(newPerson);
        const updateJoinPerson = {
          eventJoinPerson: newArr,
        };
        res.status(201).json({ ...event, ...updateJoinPerson }); // devuelve el evento actualizado
      } else {
        res
          .status(409)
          .json({ error: "El usuario ya se ha apuntado a este evento" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "No se ha encontrado ningún evento" });
  }
};
