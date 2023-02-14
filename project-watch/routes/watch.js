const router = require("express").Router();
const Review = require("../models/Review.model");
const axios = require("axios");
const Watch = require("../models/Watch.model");

// creating a new watch
// const watch = new Watch({
//   brand: "Rolex",
//   model: "Daytona",
//   caseMaterial: "18kt yellow gold",
//   bandMaterial: "Oysterflex",
//   price: 30000,
// });

// watch
//   .save()
//   .then((data) => {
//     console.log("HOORAY YOU HAVE A NEW WATCH");
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log("OH NO WATCH ERRORSS");
//     console.log(e);
//   });

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

const arr = [
  {
    brand: "Rolex",
    model: "Daytona",
    description: "Classic sports",
    caseMaterial: "18kt yellow gold",
    bandMaterial: "Oysterflex",
    price: 30000,
    water_resistance: "100 meters",
    image:
      "https://www.rueschenbeck.de/media/catalog/product/cache/1/image/2500x/040ec09b1e35df139433887a97daa66f/m/1/m116500ln-0002__1-modelpage_front_facing_landscape.png",
  },
  {
    brand: "Patek Philippe",
    model: "Nautilus",
    description: "Elegant diver",
    caseMaterial: "18kt white gold",
    bandMaterial: "leather",
    price: 80000,
    water_resistance: "60 meters",
    image:
      "https://www.rueschenbeck.de/media/catalog/product/cache/1/small_image/500x/9df78eab33525d08d6e5fb8d27136e95/5/7/5712-1A-001__0-Soldat.jpg",
  },
  {
    brand: "Audemars Piguet",
    model: "Royal Oak",
    description: "Iconic luxury",
    caseMaterial: "18kt rose gold",
    bandMaterial: "steel",
    price: 50000,
    water_resistance: "50 meters",
    image:
      "https://chronexttime.imgix.net/V/0/V00200713/V00200713_1.jpg?w=570&ar=1:1&auto=format&fm=jpg&q=55&usm=50&usmrad=1.5&dpr=1&trim=color&fit=fill&auto=compress&bg=FFFFFF",
  },
  {
    brand: "IWC",
    model: "Portuguese",
    description: "Refined dress",
    caseMaterial: "18kt red gold",
    bandMaterial: "leather",
    price: 25000,
    water_resistance: "30 meters",
    image: "https://www.iwc.com/content/dam/rcq/iwc/19/79/91/9/1979919.png",
  },
  {
    brand: "Jaeger-LeCoultre",
    model: "Master Ultra Thin",
    description: "Sophisticated simplicity",
    caseMaterial: "18kt white gold",
    bandMaterial: "leather",
    price: 18000,
    water_resistance: "50 meters",
    image:
      "https://cdn2.chrono24.com/images/uhren/images_70/s3/11590370_xxl_v1562095443340.jpg",
  },
  {
    brand: "Breguet",
    model: "Classique",
    description: "Timeless elegance",
    caseMaterial: "18kt yellow gold",
    bandMaterial: "leather",
    price: 35000,
    water_resistance: "30 meters",
    image:
      "https://www.breguet.com/sites/default/files/styles/page_collection_retina/public/gardetemps/variante/soldat/7137BBY59VU.jpg?itok=fpruljWj",
  },
];

//create many watches

// Delete all
Watch.deleteMany()
  .then(() => {
    console.log("WATCHES DELETED!");
  })
  .catch((err) => console.log(err));

// Insert the documents using insertMany()
Watch.insertMany(arr)
  .then(() => {
    console.log("WATCHES SEEDED SUCCESS");
  })
  .catch((err) => console.log(err));
// console.log("HELLO FROM SEEDS!");

// Find all watches
router.get("/", async (req, res) => {
  const allWatches = await Watch.find();
  console.log(allWatches);
  // res.send("fetchin all watches!");
  res.render("index", { allWatches });
});

module.exports = router;
