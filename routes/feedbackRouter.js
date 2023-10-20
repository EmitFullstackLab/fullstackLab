const express = require("express");
const app = express();

const router = express.Router();

// router.get("/", (req, res) => {
//   console.log("router for feedback working");
//   res.render("/feeback.ejs");
// });

router.get("/", (req, res) => {
  const message = req.query.message;
  console.log("router for feedback working");
  res.render("feedback.ejs", { message: message });
});

router.get("/:id", (req, res) => {
  console.log("need the session id");
});

module.exports = router;
