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
  database: "employees",
  password: "Echelon800",
  port: 5432,
});

db.connect();

app.get('/importemployees', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM employees');
    res.json(result.rows);
  } catch(error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const {email, password} = req.body.userObject
  try {
    const account = await db.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    if (account.rows.length > 0) {
      res.json({ success: true, user: account.rows[0] });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  

})


app.listen(port, () => {
    console.log("listening to port 8080");
})