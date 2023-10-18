/*------BCRYPT CONFIG------*/
const bcrypt = require("bcrypt");

/*------ENVIRONMENT CONFIG------*/
require("dotenv").config();
const HOST = process.env.MYSQL_HOST;
const DATABASE = process.env.MYSQL_DATABASE;
const PORT = process.env.MYSQL_PORT;
const USER = process.env.MYSQL_USER;
const PASSWORD = process.env.MYSQL_PASSWORD;

/*------EXPRESS + EJS CONFIG------*/
const express = require("express");
const app = express();
app.set("view engine", "ejs"); //use ejs engine to display pages (in view directory)
app.use(express.static("public")); //set visibility to public for css files
app.use(express.urlencoded({ extended: false })); //code to access form from request in post method

/*------MYSQL CONFIG------*/
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  port: PORT,
  database: DATABASE,
});

const promiseConnection = connection.promise();

/*--------------------------------*/

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/message", (req, res) => {
  const message = req.query.message;
  res.render("message.ejs", { message: message });
});

app.get("/register", (req, res) => {
  const message = req.query.message;
  res.render("register.ejs", { message: message });
});

app.get("/login", (req, res) => {
  const message = req.query.message;
  res.render("login.ejs", { message: message });
});

app.get("/admin", (req, res) => {
  const message = req.query.message;
  res.render("admin.ejs", { message: message });
});

app.get("/admin_login", (req, res) => {
  const message = req.query.message;
  res.render("admin_login.ejs", { message: message });
});

app.get("/feedback", (req, res) => {
  const message = req.query.message;
  res.render("feedback.ejs", { message: message });
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    //query to get user with email
    const userQuery = `
    SELECT u.id_user, u.user_email, u.user_password 
    FROM users u
    WHERE u.user_email = "${email}";
  `;

    const [userRow] = await promiseConnection.execute(userQuery); // Await the query

    if (userRow.affectedRows > 0) {
      const user = userRow[0];

      if (user.user_password === password) {
        console.log("user found: ", user);
        res.redirect("/feedback"); // Redirect to feedback on successful login
      } else {
        console.log(`Wrong password for user ${email}`);
      }
    } else {
      console.log(`User with email ${email} not found`);
    }
  } catch (error) {
    console.log("Error executing query:", error);
  }
});

app.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const surname = req.body.surname;
    const studNum = req.body.studNum;
    const password = req.body.password;
    const confirmPwd = req.body.confirmPwd;

    // query to check if user already exist
    const userQuery = `
    SELECT u.id_user, u.user_email, u.user_password
    FROM users u
    WHERE u.user_email = "${email}";
  `;

    // query to find student with those parameter
    const studentQuery = `
    SELECT s.id_student, s.student_name, s.student_surname, s.student_number
    FROM students s
    WHERE s.student_name = "${name}" AND s.student_surname = "${surname}" AND s.student_number = "${studNum}";
  `;

    const [userRow] = await promiseConnection.execute(userQuery);

    //check if user already exist
    if (userRow.length > 0) {
      const user = userRow[0];
      console.log("user: ", user);
      return res.redirect(`/register?that email is already being used`);
      // return res.redirect("/register?message=user already exists");
    }

    const [studentRow] = await promiseConnection.execute(studentQuery);

    console.log("studentRow", studentRow);
    //check if password match the confirmPwd
    if (password !== confirmPwd) {
      console.log("sorry the password didn't match");
      return res.redirect("/register?message=password didn't match");
    }

    console.log("studentRow:", studentRow);
    console.log("userRow:", userRow);

    //get the studentId
    const studentId = studentRow[0].id_student;

    //create the user
    const createUser = `
        INSERT INTO users(id_user, user_email, user_password)
        VALUES(${studentId}, '${email}', '${password}')
      `;
    const [createdRow] = await promiseConnection.execute(createUser);

    if (createdRow.affectedRows > 0) {
      console.log("user created");
      return res.redirect("/login");
    }
  } catch (error) {
    console.log("Error executing query:", error);
  }
});

app.listen(3000);
