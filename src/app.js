import express from "express";
import cors from "cors";
import authRouter from "./auth/auth.router.js";
import usersRouter from "./users/users.router.js";
import { validateAuth } from "./auth/auth.middleware.js";
import boxesRouter from "./boxes/boxes.router.js";
import { validateTypeUserByEmail } from "./boxes/boxes.middleware.js";
import eventsRouter from "./events/events.router.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: "utf-8" }));

app.use("/auth", authRouter); // declaramos el router de autenticación
app.use("/users", validateAuth, usersRouter);
app.use("/boxes", validateAuth, validateTypeUserByEmail, boxesRouter);
app.use("/events/box", validateAuth, eventsRouter);

app.listen(port, () => console.log(`Servidor levantado en el puerto ${port}`));
