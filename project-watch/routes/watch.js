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
        "X-RapidAPI-Key": "7a4c9182dfmshf3d7c7d3a24a10ep1f5694jsn1a57f9c142ed",
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
        "X-RapidAPI-Key": "7a4c9182dfmshf3d7c7d3a24a10ep1f5694jsn1a57f9c142ed",
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
router.get("/models?model", async (req, res) => {
  const family = req.query.family;
  const model = req.query.model;
  try {
    const response = await axios({
      method: "GET",
      url: `https://watch-database1.p.rapidapi.com/all-watches-by/brandname/Rolex/family/${family}/model/${model}`,
      headers: {
        "X-RapidAPI-Key": "7a4c9182dfmshf3d7c7d3a24a10ep1f5694jsn1a57f9c142ed",
        "X-RapidAPI-Host": "watch-database1.p.rapidapi.com",
      },
    });
    // res.send(response.data);
    // res.send("fetching specific model");
    res.render("watch-details", { response: response.data });
  } catch (error) {
    console.error(error);
    res.send("An error occurred while retrieving the data");
  }
});

module.exports = router;
