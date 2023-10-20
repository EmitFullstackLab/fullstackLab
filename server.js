/*------BCRYPT CONFIG------*/
const bcrypt = require("bcrypt");
const { log } = require("console");

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
const feedbackRouter = require("./routes/feedbackRouter");
app.use("/feedback", feedbackRouter);
app.set("view engine", "ejs"); //use ejs engine to display pages (in view directory)
app.use(express.static("public")); //set visibility to public for css files
app.use(express.static("js")); //set visibility to public for css files
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

app.get("/register", (req, res) => {
  const { message, errormsg } = req.query;
  console.log(message);
  res.render("register.ejs", {
    message: message,
    isActive: errormsg,
  });
});

app.get("/login", (req, res) => {
  const { message, errormsg } = req.query;
  console.log(message);
  res.render("login.ejs", {
    message: message,
    isActive: errormsg,
  });
});

app.get("/admin_login", (req, res) => {
  const message = req.query.message;
  res.render("admin_login.ejs", { message: message });
});

// app.get("/feedback", (req, res) => {
//   const message = req.query.message;
//   res.render("feedback.ejs", { message: message });
// });

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

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
      const isCorrect = await bcrypt.compare(password, user.user_password);
      console.log("same password? ", isCorrect);

      if (isCorrect) {
        console.log("user found: ", user);
        res.redirect("/feedback"); // Redirect to feedback on successful login
      } else {
        return res.redirect(
          "/login?message=password didn't match&errormsg=true"
        );
      }
    } else {
      return res.redirect(
        "/login?message=no user with that email found&errormsg=true"
      );
    }
  } catch (error) {
    console.log("Error executing query:", error);
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email, name, surname, studNum, password, confirmPwd } = req.body;

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

/*

    ___
   /   \   |     |  |         |
  |     |  |     |  |         |
  |     |  |     |  |      \  |  /
  |    \|  |     |  |       \ | /
   \___/\   \___/   |        \|/


  funzioni di login e rigistrazione dell'admin

  modificato il reindirizzamento alla pagina /admin

  copia e modifica qusta parte sotto nel tuo codice main

  login admin non ancora funzionante
  
  ↓
  ↓
  ↓

*/

app.get("/admin", async (req, res) => {
  try {
    const message = req.query.message;

    // query di tutte le materie
    const subjectsQuery = `
      SELECT sj.id_subject, sj.subject_name 
      FROM subjects sj
      ORDER BY sj.subject_name;
    `;

    const [subjectsRow] = await promiseConnection.execute(subjectsQuery); // Await the query

    // query di tutti i feedback
    const feedbacksQuery = `
      SELECT fb.id_feedback, fb.feedback_text, fb.feedback_rating, CONCAT(s.student_name, " " ,s.student_surname) as student_name_surname, fb.feedback_date, sj.subject_name
      FROM subjects sj
      INNER JOIN feedbacks fb on fb.id_subject = sj.id_subject
      INNER JOIN users u ON u.id_user = fb.id_user
      INNER JOIN students s ON s.id_student = u.id_user
      ORDER BY DATE_FORMAT(fb.feedback_date, '%Y-%m') DESC;
    `;

    const [feedbacksRow] = await promiseConnection.execute(feedbacksQuery); // Await the query

    // query di tutte le materie
    const subjectsAveragesQuery = `
      SELECT AVG(fb.feedback_rating), fb.feedback_date, sj.id_subject
      FROM subjects sj
      INNER JOIN feedbacks fb on fb.id_subject = sj.id_subject
      WHERE sj.id_subject = 1
      GROUP BY sj.subject_name, fb.feedback_date;
   `;

    const [subjectsAveragesRow] = await promiseConnection.execute(
      subjectsAveragesQuery
    ); // Await the query

    console.log([feedbacksRow]);
    console.log([subjectsRow]);
    console.log([subjectsAveragesRow]);

    res.render("admin.ejs", {
      message: message,
      feedbacks: [feedbacksRow],
      subjects: [subjectsRow],
      subjectsAverages: [subjectsAveragesRow],
    });
  } catch (error) {
    console.log("Error executing query:", error);
  }
});

app.post("/addAdmin", async (req, res) => {
  try {
    const username = req.body.admin_username;
    const password = req.body.password;
    const confirmPwd = req.body.confirmPwd;
    console.log("submitted");

    //query to get admin with username
    const adminUserQuery = `
    SELECT a.idadmin, a.admin_username, a.admin_password 
    FROM admins a
    WHERE a.admin_username = "${username}";
  `;

    //check if admin already exist
    const [adminUserRow] = await promiseConnection.execute(adminUserQuery);

    if (adminUserRow.length > 0) {
      return res.redirect(
        "/admin?message=that ausername is already being used&errormsg=true&section=add-admin"
      );
    }

    //check if password match the confirmPwd
    if (password !== confirmPwd) {
      return res.redirect(
        "/admin?message=password didn't match&errormsg=true&section=add-admin"
      );
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password: ", hashedPassword);
    //create the admin
    const createAdminUser = `
        INSERT INTO admins(admin_username, admin_password)
        VALUES('${username}', '${hashedPassword}')
      `;
    const [createdRow] = await promiseConnection.execute(createAdminUser);

    if (createdRow.affectedRows > 0) {
      console.log("admin user created");
      return res.redirect("/admin");
    }
  } catch (error) {
    console.log("Error executing query:", error);
  }
});

app.post("/adminLogin", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    //query to get admin with username
    const adminUserQuery = `
    SELECT a.idadmin, a.admin_username, a.admin_password 
    FROM admins a
    WHERE a.admin_username = "${username}";
  `;

    const [adminUserRow] = await promiseConnection.execute(adminUserQuery); // Await the query
    console.log([adminUserRow]);
    if (adminUserRow.length > 0) {
      const adminUser = adminUserRow[0];

      //match hashed password in db with form password
      const isCorrect = bcrypt.compare(password, adminUser.admin_password);
      console.log("same password? ", isCorrect);

      if (adminUser.admin_password === password) {
        console.log("admin user found: ", adminUser);
        res.redirect("/admin"); // Redirect to feedback on successful login
      } else {
        console.log(`Wrong password for admin user ${username}`);
      }
    } else {
      console.log(`Admin user with username ${username} not found`);
    }
  } catch (error) {
    console.log("Error executing query:", error);
  }
});

app.listen(3000);
