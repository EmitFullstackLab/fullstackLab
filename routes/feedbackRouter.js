// const express = require("express");

// const router = express.Router();

// router.get("/feedback", (req, res) => {
//   const message = req.query.message;
//   console.log("router for feedback working");
//   res.render("feedback.ejs", { message: message });
// });

// //check if there's a user with that id

// router.get("/feedback/:id", (req, res) => {
//   const id = req.params.id;
//   const userId = req.session.user.id_user;
//   const message = `welcome user with id ${userId}`;
//   console.log("User ID from session: ", userId);
//   console.log("Requested ID: ", id);
//   res.render("feedback.ejs", { message: message });
// });

// module.exports = router;
