import express from "express";
import sequelize from "./config/database";
import userRoute from "./routes/UserRoutes";
import actorRoutes from "./routes/ActorRoutes";
import actorfilmRoutes from "./routes/ActorFilmRoutes";
import userRoutes from "./routes/UserRoutes";
import filmRoutes from "./routes/FilmRoutes";
import evaluations from "./routes/EvaluationsRoutes";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(express.json());

app.use(userRoute);
app.use(actorRoutes);
app.use(actorfilmRoutes);
app.use(userRoutes);
app.use(filmRoutes);
app.use(evaluations);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("database foi sincronizado com sucesso");
  })
  .catch((error) => {
    console.log("deu zica no bagulho", error);
  });

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
