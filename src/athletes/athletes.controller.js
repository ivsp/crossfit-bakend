import {
  createNewAthleteByEmailAndBody,
  modifyAthleteByEmailAndBody,
  retrieveAtheleteByEmail,
} from "./athletes.model.js";

export const createNewAthleteCtrl = async (req, res) => {
  const email = req.email;
  const { body } = req.body;
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
