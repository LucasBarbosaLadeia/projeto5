import express from "express";
import cors from "cors";
import userRoute from "./routes/UserRoutes";
import actorRoutes from "./routes/ActorRoutes";
import userRoutes from "./routes/UserRoutes";
import filmRoutes from "./routes/FilmRoutes";
import evaluations from "./routes/CommentRoutes";
import favorites from "./routes/FavoritesRoutes";
import login from "./routes/loginRoutes";
import adminRoutes from "./routes/adminRoutes";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  METHODS: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(adminRoutes);
app.use(express.json());
app.use(userRoute);
app.use(actorRoutes);
app.use(filmRoutes);
app.use(userRoutes);
app.use(filmRoutes);
app.use(evaluations);
app.use(favorites);
app.use(login);

export default app;
