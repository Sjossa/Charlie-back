import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((er) => {
  if (er) {
    console.log(er);
  } else {
    console.log("Vous etes connecter");
  }
});
