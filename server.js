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
app.use(express.urlencoded({ extended: true })); //code to access form from request in post method

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
  const errormsg = req.query.errormsg;
  console.log(message);
  res.render("register.ejs", {
    message: message,
    isActive: errormsg,
  });
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

    if (userRow.length > 0) {
      const user = userRow[0];

      //match hashed password in db with form password
      const isCorrect = bcrypt.compare(password, user.user_password);
      console.log("same password? ", isCorrect);

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

    // query to check if user already exist with that mail
    const userQuery = `
    SELECT u.id_user, u.user_email, u.user_password
    FROM users u
    WHERE u.user_email = "${email}";
  `;

    // query to look for a student that match user by studNum
    const checkStudNum = `
      SELECT u.id_user, u.user_email, u.user_password 
      FROM users u
      INNER JOIN students s on s.id_student = u.id_user
      WHERE s.student_number = "${studNum}";
    `;

    // query to find student with name/surname match with studNum
    const studentQuery = `
      SELECT s.id_student, s.student_name, s.student_surname, s.student_number
      FROM students s
      WHERE s.student_name = "${name}" AND s.student_surname = "${surname}" AND s.student_number = "${studNum}";
    `;

    //check if user already exist
    const [userRow] = await promiseConnection.execute(userQuery);

    if (userRow.length > 0) {
      return res.redirect(
        "/register?message=that email is already being used&errormsg=true"
      );
    }

    //check if there's user linked with student with that student number
    const [studNumRow] = await promiseConnection.execute(checkStudNum);

    if (studNumRow.length > 0) {
      return res.redirect(
        "/register?message=that student number already has an associated user&errormsg=true"
      );
    }

    const [studentRow] = await promiseConnection.execute(studentQuery);

    if (studentRow.length === 0) {
      return res.redirect(
        "/register?message=no student number matching with that name and surname&errormsg=true"
      );
    }

    //check if password match the confirmPwd
    if (password !== confirmPwd) {
      return res.redirect(
        "/register?message=password didn't match&errormsg=true"
      );
    }

    //if we get here, get the studentId and create the user
    const studentId = studentRow[0].id_student;

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password: ", hashedPassword);
    //create the user
    const createUser = `
        INSERT INTO users(id_user, user_email, user_password)
        VALUES(${studentId}, '${email}', '${hashedPassword}')
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
