import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import userRoute from "./routes/UserRoutes";
import actorRoutes from "./routes/ActorRoutes";
import filmRoutes from "./routes/FilmRoutes";
import evaluations from "./routes/CommentRoutes";
import favorites from "./routes/FavoritesRoutes";
import login from "./routes/loginRoutes";

const app = express();

const corsOptions = {
  origin: "http://localhost",
  METHODS: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", userRoute);

app.use("/api", actorRoutes);
app.use("/api", filmRoutes);
app.use("/api", evaluations);
app.use("/api", favorites);
app.use("/api", login);

export default app;
