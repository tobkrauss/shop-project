const router = require("express").Router();
const Review = require("../models/Review.model");
const axios = require("axios");

// router.get("/watch/:id", (req, res, next) => {
//   res.render("watch-details");
// });

// get images
// router.get("/images", async (req, res) => {
//   try {
//     const response = await axios({
//       method: "GET",
//       url: "https://watch-database1.p.rapidapi.com/watch-media-links-by-id/91894",
//       headers: {
//         "X-RapidAPI-Key": "322cdd67b9msh825ad01241d6cccp1e397fjsnd3220b54691f",
//         "X-RapidAPI-Host": "watch-database1.p.rapidapi.com",
//       },
//     });
//     console.log("getting watch image");
//     console.log("IMAGE DATA:", response.data[0]);
//     res.render("index", { images: response.data[0], families: null });
//   } catch (err) {
//     console.log(err);
//     res.send("An error occurred while retrieving the data");
//   }
// });

// get all family by brand name
router.get("/", async (req, res) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://watch-database1.p.rapidapi.com/all-family-by/brandname/Rolex",
      headers: {
        "X-RapidAPI-Key": "84609c3e3cmsh9e8bf88dc9f07c4p13d3c4jsnd5f87bc53621",
        "X-RapidAPI-Host": "watch-database1.p.rapidapi.com",
      },
    });
    console.log("GETTING WATCH FAMILY!!!!");
    res.render("index", { images: null, families: response.data });
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
        "X-RapidAPI-Key": "bf9fdb77dcmshd6868a03eb6d050p1b91d0jsn5b18fc60f300",
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
    const responseData = await axios({
      method: "GET",
      url: `https://watch-database1.p.rapidapi.com/all-watches-by/brandname/Rolex/family/${family}/model/${model}`,
      headers: {
        "X-RapidAPI-Key": "84609c3e3cmsh9e8bf88dc9f07c4p13d3c4jsnd5f87bc53621",
        "X-RapidAPI-Host": "watch-database1.p.rapidapi.com",
      },
    });
    console.log("RESPONSE DATA BELOW!!!!");
    console.log(responseData.data);
    console.log(responseData.data[0].id);
    const id = responseData.data[0].id;

    const responseImg = await axios({
      method: "GET",
      url: `https://watch-database1.p.rapidapi.com/watch-media-links-by-id/${id}`,
      headers: {
        "X-RapidAPI-Key": "84609c3e3cmsh9e8bf88dc9f07c4p13d3c4jsnd5f87bc53621",
        "X-RapidAPI-Host": "watch-database1.p.rapidapi.com",
      },
    });
    console.log(responseImg);
    console.log(responseImg.data[0]);
    const url = responseImg.data[0];
    console.log(url);

    res.render("watch-details", { watch: responseData.data, image: url });

    // res.render("watch-details", {
    //   watch: responseData.data,
    // });

    // console.log("getting watch image");
    // console.log("IMAGE DATA:", responseImg.data[0]);
    // res.render("watch-details", { image: responseImg.data[0] });
  } catch (error) {
    console.error(error);
    res.send("An error occurred while retrieving the data");
  }
});

// get images
// router.get("/models/:family/:model", async (req, res) => {
//   const id = req.query.id;
//   console.log("*****IDENTIFCATION BELOW!!!*****");
//   console.log(id);
//   try {
//     const response = await axios({
//       method: "GET",
//       url: `https://watch-database1.p.rapidapi.com/watch-media-links-by-id/${id}`,
//       headers: {
//         "X-RapidAPI-Key": "bf9fdb77dcmshd6868a03eb6d050p1b91d0jsn5b18fc60f300",
//         "X-RapidAPI-Host": "watch-database1.p.rapidapi.com",
//       },
//     });
//     console.log("getting watch image");
//     console.log("IMAGE DATA:", response.data[0]);
//     res.render("watch-details", { image: response.data[0], watch: null });
//   } catch (err) {
//     console.log(err);
//     res.send("An error occurred while retrieving the data");
//   }
// });

module.exports = router;
