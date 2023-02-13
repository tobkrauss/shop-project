const router = require("express").Router()
const Review = require("../models/Review.model")

router.get("/watch/:id", (req, res, next) => {
    res.render("watch-details")
  })





  module.exports = router