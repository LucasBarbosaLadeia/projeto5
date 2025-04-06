import sequelize from "./config/database";

import express from "express";

import actorRoutes from "./routes/ActorRoutes";
import userRoutes from "./routes/UserRoutes";
import filmRoutes from "./routes/FilmRoutes";
import evaluations from "./routes/EvaluationsRoutes";
import favorites from "./routes/FavoritesRoutes";
import loginRoutes from "./routes/loginRoutes";


const app = express();
const port = 3000;


const corsOptions = {
  origin: "http://localhost:5173",
  METHODS: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

app.use(express.json());


app.use(actorRoutes);
app.use(filmRoutes);
app.use(userRoutes);
app.use(filmRoutes);
app.use(evaluations);
app.use(favorites);
app.use(loginRoutes);


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

export default app;
