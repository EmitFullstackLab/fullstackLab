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

/*--------------------------------*/

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const surname = req.body.surname;
  const studNum = req.body.studNum;
  const password = req.body.password;
  const confirmPwd = req.body.confirmPwd;

  const insertStudentQ = `
    INSERT INTO students(student_name, student_surname, student_number) 
    values('${name}', '${surname}', '${studNum}')
  `;

  if (password === confirmPwd) {
    const addStudent = connection.query(insertStudentQ, (err, res) => {
      try {
        console.log(res);
        console.log("student added");
      } catch (error) {
        console.log("err: ", err);
      }
    });

    if (addStudent) {
      res.redirect("/login");
    } else {
      console.log("something went wrong when adding a student");
    }
  }
});

// app.post("login", async (req, res) => {});

// connection.query(getAllStudentsQ, (err, res) => {
//   try {
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/register", async (req, res) => {
//   const password = req.body.password;
//   const confirmPwd = req.body.confirmPwd;
//   if (password === confirmPwd) {
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       users.push({
//         id: Date.now().toString(),
//         email: req.body.email,
//         name: req.body.name,
//         surname: req.body.surname,
//         studNum: req.body.studNum,
//         password: hashedPassword,
//       });
//       res.redirect("/login");
//     } catch (error) {
//       console.log(error);
//       res.redirect("/register");
//     }
//   } else {
//     console.log("password didn't match");
//   }

//   console.log(users);
// });

app.listen(3000);

const getAllStudentsQ = "select * from students";

// connection.query(getAllStudentsQ, (err, res) => {
//   try {
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// });

/**
 * USEFUL LOGS:
 *  console.log("email is: ", email);
    console.log("name is: ", name);
    console.log("surname is: ", surname);
    console.log("studNum is: ", studNum);
    console.log("password is: ", password);
 */
