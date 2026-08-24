import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import authRoutes from "./routes/Post/authRoutes.js";
import formRoutes from "./routes/Post/formRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Salut ! Le serveur est bien allumé et t'écoute.");
});

app.use("/auth", authRoutes);
app.use("/form", formRoutes);

app.listen(3000, () => {
  console.log("Serveur démarré avec succès sur http://localhost:3000");
});
