import express from "express";
import cors from "cors";
import sequelize from "./config/database";
import userRoutes from "./routes/UserRoutes";
import actorRoutes from "./routes/ActorRoutes";
import actorfilmRoutes from "./routes/ActorFilmRoutes";
import filmRoutes from "./routes/FilmRoutes";
import evaluations from "./routes/EvaluationsRoutes";
import favorites from "./routes/FavoritesRoutes";
<<<<<<< HEAD:src/index.ts
import paymentForms from "./routes/PaymentFormRoutes";
import subscriptions from "./routes/SubscriptionRoutes";
import subscriptionPayment from "./routes/SubscriptionPaymentRoutes";
=======
import login from "./routes/loginRoutes";
import { METHODS } from "http";
>>>>>>> b30aeed798a8d79a4fbc3262b538e7745050ffce:back-end/src/index.ts

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  METHODS: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions)); // Aplica as configurações de CORS

app.use(express.json());


app.use(actorRoutes);
app.use(actorfilmRoutes);
app.use("/api/users", userRoutes);

app.use(filmRoutes);
app.use(evaluations);
app.use(favorites);
app.use(login);

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
