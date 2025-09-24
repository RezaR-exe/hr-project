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

app.post("/employeedata", async (req, res) => {
  const {employeeId, userType, currentlyLoggedEmployeeId} = req.body;
  try {
    const user = await db.query('SELECT * FROM employees WHERE id =$1', [employeeId]);
    if (user.rows.length > 0 ) {
      if (userType === 'manager') {
        return res.json({ success: true, user: user.rows[0] });
        // console.log("I am manager")
        // console.log(user.rows[0])
      } else if (userType === 'co-worker') {
        if (currentlyLoggedEmployeeId === user.rows[0].id) {
          return res.json({ success: true, user: user.rows[0] });
          // console.log("I am co-worker and the id that I searched for is mine")
          // console.log(user.rows[0])
        } else {
          return res.json({ success: true, user: { first_name: user.rows[0].first_name, last_name: user.rows[0].last_name, work_email: user.rows[0].work_email } });
          // console.log("I am co-worker and the id that I searched for is NOT mine")
          // console.log( { first_name: user.rows[0].first_name, last_name: user.rows[0].last_name, work_email: user.rows[0].work_email })
        }
      } else if (userType === 'employee') {
        return res.json ({ success: false, error: "Access denied, how did you get here? contact me for job"})
        // console.log("Access denied, how did you get here? contact me for job")
    }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})



app.listen(port, () => {
    console.log("listening to port 8080");
})