const mysql = require("mysql2");

//create new mysql connection (variables on .env.local)
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "lab-fullstack",
  port: 3307,
});

//connect to mysql db
connection.connect((error) => {
  if (error) {
    console.error("error connecting to mysql database:", error);
  } else {
    console.log("connected to mysql db");
  }
});

//close mysql connection
connection.end();
