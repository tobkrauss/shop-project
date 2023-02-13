const router = require("express").Router();
const Review = require("../models/Review.model");
const axios = require("axios");

// router.get("/watch/:id", (req, res, next) => {
//   res.render("watch-details");
// });

// get all family by brand name
router.get("/", async (req, res) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://watch-database1.p.rapidapi.com/all-family-by/brandname/Rolex",
      headers: {
        "X-RapidAPI-Key": "322cdd67b9msh825ad01241d6cccp1e397fjsnd3220b54691f",
        "X-RapidAPI-Host": "watch-database1.p.rapidapi.com",
      },
    });
    console.log("getting watch");
    console.log("RESPONSE DATA*****", response.data);
    // res.send(response.data);
    console.log("REQUEST BODY*****", req.body);
    res.render("index", { response: response.data });
  } catch (error) {
    console.error(error);
    res.send("An error occurred while retrieving the data");
  }
});

// get all models from brand and family
router.get("/models", async (req, res) => {
  const family = req.query.family;
  try {
    const response = await axios({
      method: "GET",
      url: `https://watch-database1.p.rapidapi.com/all-models-by/brandname/Rolex/family/${family}`,
      headers: {
        "X-RapidAPI-Key": "322cdd67b9msh825ad01241d6cccp1e397fjsnd3220b54691f",
        "X-RapidAPI-Host": "watch-database1.p.rapidapi.com",
      },
    });
    // res.send(response.data);
    // res.send("watch models will be here");
    console.log(response.data);
    res.render("models", { response: response.data, family: req.query.family });
  } catch (error) {
    console.error(error);
    res.send("An error occurred while retrieving the data");
  }
});

// get specific model
router.get("/models/:family/:model", async (req, res) => {
  const family = req.params.family;
  const model = req.params.model;
  console.log("family", family);
  console.log("model", model);
  try {
    const response = await axios({
      method: "GET",
      url: `https://watch-database1.p.rapidapi.com/all-watches-by/brandname/Rolex/family/${family}/model/${model}`,
      // url: "https://watch-database1.p.rapidapi.com/all-watches-by/brandname/Omega/family/Aqua%20Terra/model/2005.75.00",
      headers: {
        "X-RapidAPI-Key": "322cdd67b9msh825ad01241d6cccp1e397fjsnd3220b54691f",
        "X-RapidAPI-Host": "watch-database1.p.rapidapi.com",
      },
    });
    // console.log("hello from endpoibnt");
    // res.send(response.data);
    // res.send("fetching specific model");
    console.log(response.data);
    res.render("watch-details", { response: response.data });
  } catch (error) {
    console.error(error);
    res.send("An error occurred while retrieving the data");
  }
});

module.exports = router;
