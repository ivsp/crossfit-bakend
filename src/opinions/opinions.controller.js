import {
  createNewTestimonie,
  retrieveTestimonieByEmail,
} from "./opinions.model.js";

export const createNewTertimonieCtrl = async (req, res) => {
  const email = req.email;
  const { testimonie } = req.body;
  console.log(testimonie);
  try {
    const opinions = await retrieveTestimonieByEmail(email);
    console.log(opinions);
    if (opinions === null) {
      //const opinion =
      await createNewTestimonie(email, testimonie);

      res.status(201).json({ userName: email, testimonie });
    } else {
      res.status(409).json({ error: "El usuario ya ha dejado una opinion" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
