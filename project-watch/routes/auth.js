const router = require("express").Router()
const User = require("../models/User.model")
const bcrypt = require("bcryptjs")

router.get("/auth/signup", (req, res, next) => {
  res.render("signup")
})

router.post("/auth/signup", (req, res, next) => {
  const { username, password } = req.body

  // Validation
  // Check if the username is empty
  if (username === "") {
    res.render("signup", { message: "Username cannot be empty" })
    return
  }

  if (password.length < 8) {
    res.render("signup", { message: "Password has to be minimum 8 characters" })
    return
  }

  // Validation passed
  // Check if username is already taken
  User.findOne({ username })
    .then(userFromDB => {
      if (userFromDB !== null) {
        res.render("signup", { message: "Username is already taken" })
      } else {
        // Username is available
        const salt = bcrypt.genSaltSync()
        console.log(salt)
        const hash = bcrypt.hashSync(password, salt)
        console.log(hash)

        // Create the user
        User.create({ username: username, password: hash })
          .then(createdUser => {
            console.log(createdUser)
            res.redirect("/auth/login")
          })
          .catch(err => {
            next(err)
          })
      }
    })
})

router.get("/auth/login", (req, res, next) => {
  res.render("login")
})

router.post("/auth/login", (req, res, next) => {
  const { username, password } = req.body

  User.findOne({ username })
    .then(userFromDB => {
      if (userFromDB === null) {
        // User not found in database => show login form
        res.render("login", { message: "This username does not exist. If you don't have an account, yet, signup first" })
        return
      }

      // User found in database
      // Check if password from input matches hashed password from database
      if (bcrypt.compareSync(password, userFromDB.password)) {
        // Password is correct => Login user
        // req.session is an object provided by express-session
        req.session.user = userFromDB
        res.redirect("/profile")
      } else {
        res.render("login", { message: "Wrong credentials" })
        return
      }
    })
})

router.get("/auth/logout", (req, res, next) => {
    //Logout user
    req.session.destroy()
    res.redirect("/")
})



module.exports = router