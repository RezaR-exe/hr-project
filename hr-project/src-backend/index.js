import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";
import 'dotenv/config';
const SAPLING_TOKEN = process.env.SAPLING_TOKEN;
const HUGGING_FACE_BART_TOKEN = process.env.HUGGING_FACE_BART_TOKEN;


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
        if (currentlyLoggedEmployeeId === user.rows[0].id) {
          return res.json({ success: true, user: user.rows[0] });
          // console.log("I am employee and the id that I searched for is mine")
          // console.log(user.rows[0])
        } else {
          return res.json ({ success: false, error: "Access denied, how did you get here? contact me for job"})
        }
        
        // console.log("Access denied, how did you get here? contact me for job")
    }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

app.post("/editemployeedata", async (req, res) => {
  const { employeeData, requestedUserId, requestedUserType } = req.body;
  try {
    const user = await db.query('SELECT * FROM employees WHERE id =$1', [employeeData.id]);
    if (user.rows.length > 0) {
      if (requestedUserType === 'manager') {
        console.log("I am manager and I am trying to edit data");
        const fieldsToEdit = [];
        const values = [];
        let paramIndex = 1;
        for (const [key, value] of Object.entries(employeeData)) {
          if (key !== 'id' && value !== undefined) {
            fieldsToEdit.push(`${key} = $${paramIndex}`);
            values.push(value);
            paramIndex++;
          }
        }
        const request = await db.query(`UPDATE employees SET ${fieldsToEdit.join(", ")} WHERE id = $${paramIndex}`, [...values, employeeData.id]);
        return res.json({ success: true, message: "Employee data received and modified." });
      } else if (requestedUserType === 'co-worker') {
        if (requestedUserId === user.rows[0].id) {
          console.log("I am co-worker and I am trying to edit my own data");
          const fieldsToEdit = [];
          const values = [];
          let paramIndex = 1;
          for (const [key, value] of Object.entries(employeeData)) {
            if (key !== 'id' && value !== undefined) {
              fieldsToEdit.push(`${key} = $${paramIndex}`);
              values.push(value);
              paramIndex++;
            }
          }
          const request = await db.query(`UPDATE employees SET ${fieldsToEdit.join(", ")} WHERE id = $${paramIndex}`, [...values, employeeData.id]);
          console.log(request)
          return res.json({ success: true, message: "Employee data received and modified." });
        } else {
          return res.status(403).json({ success: false, message: "Access denied. You can only edit your own data." });
        }
      } else if (requestedUserType === 'employee') {
        if (requestedUserId === user.rows[0].id) {
          console.log("I an employee and I am trying to edit my own data");
          const fieldsToEdit = [];
          const values = [];
          let paramIndex = 1;
          for (const [key, value] of Object.entries(employeeData)) {
            if (key !== 'id' && value !== undefined) {
              fieldsToEdit.push(`${key} = $${paramIndex}`);
              values.push(value);
              paramIndex++;
            }
          }
          const request = await db.query(`UPDATE employees SET ${fieldsToEdit.join(", ")} WHERE id = $${paramIndex}`, [...values, employeeData.id]);
          console.log(request)
          return res.json({ success: true, message: "Employee data received and modified." });
        }
      }

      return res.json({ success: true, message: "Employee data processed." });
    } else {
      return res.status(404).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/submitfeedback", async (req, res) => {
  const { employeeData, feedbackData } = req.body;
  try {
    if (employeeData.user_role === 'co-worker') {
      const response = await db.query('INSERT INTO feedbacks (from_user_id, from_user_email, given_grade, given_feedback) VALUES ($1, $2, $3, $4)', [employeeData.user_id, employeeData.user_email, feedbackData.given_grade, feedbackData.feedback]);
      return res.json({ success: true, message: "Feedback submitted successfully.", feedback: response.rows[0] });
    } else {
      return res.status(403).json({ success: false, message: "Only co-workers can submit feedback." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/submitabsence", async (req, res) => {
  const { absenceType, startDate, endDate, reason, user_id, user_email, user_role } = req.body;
  try {
    if (user_role === 'employee') {
      const response = await db.query('INSERT INTO absences (requested_user_id, requested_user_email, absence_start_date, absence_end_date, absence_type, absence_reason) VALUES ($1, $2, $3, $4, $5, $6)', [user_id, user_email, startDate, endDate, absenceType, reason]);
      console.log(response)
      return res.json({ success: true, message: "Absence submitted successfully.", absence: response.rows[0] });
    } else {
      return res.status(403).json({ success: false, message: "Only employees can submit absences." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

app.post("/fetchabsences", async (req, res) => {
  const { user_id, user_role } = req.body;
  try {
    if (user_role === 'manager') {
      const response = await db.query('SELECT * FROM absences');
      console.log(response)
      return res.json({ success: true, absences: response.rows });
    } else {
      const response = await db.query('SELECT * FROM absences WHERE requested_user_id = $1', [user_id]);
      console.log(response)
      return res.json({ success: true, absences: response.rows });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

app.post("/changeabsencestatus", async (req, res) => {
  const { absence_id, new_status, user_role } = req.body;
  try {
    if (user_role === 'manager') {
      const response = await db.query('UPDATE absences SET status = $1 WHERE id = $2', [new_status, absence_id]);
      console.log(response)
      return res.json({ success: true, message: "Absence status updated successfully." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

// 1. method: sapling ai method
app.post("/paraphrase", async (req, res) => {
  const { text } = req.body;
  try {
    const response = await axios.post("https://api.sapling.ai/api/v1/rephrase", {
      key: SAPLING_TOKEN,
      text,
      mapping: "informal_to_formal"
    })
    return res.json({ result: response.data.results[0].replacement });
  } catch(error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
})

// 2. method: hugging face online api endpoint method, it rephrases worse, more like a summarizer, only endpoint found online
// app.post("/paraphrase", async (req, res) => {
//   const { text } = req.body;
//   try {
//     const response = await axios.post("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
//       inputs: text
//     },
//   {
//     headers: {
//       Authorization: `Bearer ${HUGGING_FACE_BART_TOKEN}`,
//       "Content-Type": "application/json"
//     }
//   })
//     return res.json({ result: response.data[0].summary_text });
//   } catch(error) {
//     console.log(error);
//     return res.status(500).json({ error: error.message });
//   }
// })

// 3. method: local api model with python server, using tuner007 pegasus paraphraser model, works better than the hugging face online endpoint but worse than sapling ai
// app.post("/paraphrase", async (req, res) => {
//   const { text } = req.body;
//   try {
//     const response = await axios.post("http://localhost:5000/paraphrase", {
//       text
//     })
//     return res.json({ result: response.data.result });
//   } catch(error) {
//     console.log(error);
//     return res.status(500).json({ error: error.message });
//   }
// })



app.listen(port, () => {
    console.log("listening to port 8080");
})