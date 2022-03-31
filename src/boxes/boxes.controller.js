import {
  createEventByEmailAndBody,
  modifyEventDataByNameAndBody,
  retrieveAllEventsByEmail,
  retrieveEventInfoByName,
} from "./../events/events.model.js";
import { Public } from "../middleware/file-save.middleware.js";
/**
 * 1. Si el token es correcto y el evento no existe lo creo
 * 2. Devuelvo el evento creado
 *
 */
export const createEventCtrl = async (req, res) => {
  const email = req.email;
  const img = `${Public}${req.file.filename}`;
  const {
    eventStartDate,
    eventEndDate,
    eventLimitPerson,
    clasificationStartDate,
    clasificationEndDate,
    semifinalStartDate,
    semifinalEndDate,
    finalStartDate,
    finalEndDate,
  } = req.body;

  const body = {
    ...req.body,
    file: img,
    eventStartDate: parseInt(eventStartDate),
    eventEndDate: parseInt(eventEndDate),
    eventLimitPerson: parseInt(eventLimitPerson),
    eventJoinPerson: [],
    clasificationStartDate: parseInt(clasificationStartDate),
    clasificationEndDate: parseInt(clasificationEndDate),
    semifinalStartDate: parseInt(semifinalStartDate),
    semifinalEndDate: parseInt(semifinalEndDate),
    finalStartDate: parseInt(finalStartDate),
    finalEndDate: parseInt(finalEndDate),
  };
  const { eventName } = req.body;
  const event = await retrieveEventInfoByName(eventName); //función que busca el evento por nombre
  if (event === null) {
    const newEvent = await createEventByEmailAndBody(email, body);
    res.status(201).json({ ...body, email }); // paso 2
  } else {
    //si existe el evento con ese nombre entonces devuelvo un 409
    res.status(409).json({ error: "El evento ya existe" });
  }
};
/**
 * 1. Si el token es correcto y el evento está creado lo modifico
 * 2. Devuelvo el evento modificado
 */
export const modifyEventCtrl = async (req, res) => {
  const email = req.email;
  const { name } = req.query;
  const img = `${Public}${req.file.filename}`;
  const {
    eventStartDate,
    eventEndDate,
    eventLimitPerson,
    clasificationStartDate,
    clasificationEndDate,
    semifinalStartDate,
    semifinalEndDate,
    finalStartDate,
    finalEndDate,
  } = req.body;

  const body = {
    ...req.body,
    file: img,
    eventStartDate: parseInt(eventStartDate),
    eventEndDate: parseInt(eventEndDate),
    eventLimitPerson: parseInt(eventLimitPerson),
    clasificationStartDate: parseInt(clasificationStartDate),
    clasificationEndDate: parseInt(clasificationEndDate),
    semifinalStartDate: parseInt(semifinalStartDate),
    semifinalEndDate: parseInt(semifinalEndDate),
    finalStartDate: parseInt(finalStartDate),
    finalEndDate: parseInt(finalEndDate),
  };

  const newNAme = body.name;
  const event = await retrieveEventInfoByName(name);
  if (event !== null && event.email === email) {
    await modifyEventDataByNameAndBody(name, body);
    res.status(201).json(body); // paso 3
  } else {
    res.status(404).json({ error: "El evento no existe" });
  }
};

export const getEventsCtrl = async (req, res) => {
  const email = req.email;

  const events = await retrieveAllEventsByEmail(email);
  console.log(events);
  if (events !== null) {
    res.status(201).json(events); // paso 3
  } else {
    res
      .status(404)
      .json({ error: "El usuario no ha dado de alta ningún evento" });
  }
};
