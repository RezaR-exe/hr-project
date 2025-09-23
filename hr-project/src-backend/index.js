import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";


const app = express()
app.use(cors())
const port = 8080
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "social",
  password: "Echelon800",
  port: 5432,
});

db.connect();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.listen(port, () => {
    console.log("listening to port 8080");
})