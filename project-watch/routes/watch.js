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
        "X-RapidAPI-Key": "50448e6470mshcf846b608d3b6b5p1dd0cfjsn242262d2096e",
        "X-RapidAPI-Host": "watch-database1.p.rapidapi.com",
      },
    });
    console.log("getting watch");
    console.log("RESPONSE DATA*****", response.data);
    // res.send(response.data);
    console.log("REQUEST BODY*****", req.body);
    res.render("apihome", { response: response.data });
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
        "X-RapidAPI-Key": "50448e6470mshcf846b608d3b6b5p1dd0cfjsn242262d2096e",
        "X-RapidAPI-Host": "watch-database1.p.rapidapi.com",
      },
    });
    // res.send(response.data);
    // res.send("watch models will be here");
    res.render("models", { response: response.data });
  } catch (error) {
    console.error(error);
    res.send("An error occurred while retrieving the data");
  }
});

// get specific model
router.get("/models/:id", async (req, res) => {
  const family = req.query.family;
  const model = req.query.model;
  console.log(model);
  try {
    const response = await axios({
      method: "GET",
      url: `https://watch-database1.p.rapidapi.com/all-watches-by/brandname/Rolex/family/${family}/model/${model}`,
      // url: "https://watch-database1.p.rapidapi.com/all-watches-by/brandname/Omega/family/Aqua%20Terra/model/2005.75.00",
      headers: {
        "X-RapidAPI-Key": "50448e6470mshcf846b608d3b6b5p1dd0cfjsn242262d2096e",
        "X-RapidAPI-Host": "watch-database1.p.rapidapi.com",
      },
    });
    // console.log("hello from endpoibnt");
    res.send(response.data);
    // res.send("fetching specific model");
    // res.render("watch-details", { response: response.data });
  } catch (error) {
    console.error(error);
    res.send("An error occurred while retrieving the data");
  }
});

module.exports = router;
