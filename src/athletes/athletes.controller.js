import {
  createNewAthleteByEmailAndBody,
  modifyAthleteByEmailAndBody,
  retrieveAtheleteByEmail,
  retrievellAthleteEventsByEmail,
} from "./athletes.model.js";

export const createNewAthleteCtrl = async (req, res) => {
  const email = req.email;
  const body = req.body;
  const athlete = await retrieveAtheleteByEmail(email);
  if (athlete === null) {
    //creo el nuevo usuario
    await createNewAthleteByEmailAndBody(email, body);
    res.status(201).json({
      email,
      events: [body],
    });
  } else {
    const newArrEvents = [body];
    //athlete.events hago push con el nuevo body
    await modifyAthleteByEmailAndBody(email, body);
    const newObjEvents = {
      //añado el objeto al array de eventos
      events: athlete.events.concat(newArrEvents),
    };

    res.status(201).json({
      ...athlete,
      ...newObjEvents,
    }); //devuelvo el documento con la nueva informacion
  }
};

export const getAllAthleteEventsByEmailCtrl = async (req, res) => {
  //lamo al usuario
  const email = req.email;
  try {
    const athlete = await retrievellAthleteEventsByEmail(email);
    res.status(202).json(athlete.events); // paso 2
  } catch (err) {
    console.error(err);
    res
      .status(404)
      .json({ error: "El usuario no se ha apuntado a ningun evento" });
  }
};
