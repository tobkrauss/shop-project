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
    console.log(response.data);
    // res.send(response.data);
    res.render("apihome", { response: response.data });
  } catch (error) {
    console.error(error);
    res.send("An error occurred while retrieving the data");
  }
});

// get specific model
router.get("/watch/:id", async (req, res) => {
  try {
    const response = await axios({
      method: "GET",
      //   url: "https://watch-database1.p.rapidapi.com/all-watches-by/brandname/Omega/family/Aqua%20Terra/model/2005.75.00",
      url: "https://watch-database1.p.rapidapi.com/all-watches-by/brandname/Rolex/family/Submariner/model/116610ln-0001",
      headers: {
        "X-RapidAPI-Key": "ff6f56c567msha90eb6c0f5e2b84p1d6a07jsn2353546b7e8e",
        "X-RapidAPI-Host": "watch-database1.p.rapidapi.com",
      },
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.send("An error occurred while retrieving the data");
  }
});

module.exports = router;
