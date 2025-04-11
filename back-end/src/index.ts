import app from "./app";
import sequelize from "./config/database";

const port = 3000;

// Conexão com o banco de dados
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });

// Inicialização do servidor
app.listen(port, () => {
  console.log("Server is running on port", port);
});
