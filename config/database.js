import mysql from "mysql2";

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: true,
  },
});

db.connect((er) => {
  if (er) {
    console.error("Erreur de connexion :", er);
  } else {
    console.log("Vous êtes connecté à la base de données TiDB !");
  }
});
