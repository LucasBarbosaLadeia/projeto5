import express from "express";
import cors from "cors";
import sequelize from "./config/database";
import userRoutes from "./routes/UserRoutes";
import actorRoutes from "./routes/ActorRoutes";
import actorfilmRoutes from "./routes/ActorFilmRoutes";
import filmRoutes from "./routes/FilmRoutes";
import evaluations from "./routes/EvaluationsRoutes";
import favorites from "./routes/FavoritesRoutes";
import paymentForms from "./routes/PaymentFormRoutes";
import subscriptions from "./routes/SubscriptionRoutes";
import subscriptionPayment from "./routes/SubscriptionPaymentRoutes";
import loginRoutes from "./routes/loginRoutes";
import { METHODS } from "http";


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

app.use("/api", filmRoutes);
app.use(evaluations);
app.use(favorites);
app.use("/api", loginRoutes);

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
