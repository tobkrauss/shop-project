const express = require("express");
const { isLoggedin } = require("../middleware/route-guard");
const router = express.Router();

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

router.get("/profile", isLoggedin, (req, res, next) => {
  const user = req.session.user
  res.render("profile", {user});
});

module.exports = router;
