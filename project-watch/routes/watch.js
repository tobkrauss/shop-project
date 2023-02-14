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
router.get("/watches", async (req, res) => {
  const allWatches = await Watch.find();
  console.log(allWatches);
  // res.send("fetchin all watches!");
  res.render("index", { allWatches });
});

// Get specific watch
router.get("/watches/:id", async (req, res) => {
  const watchID = req.params.id;
  const watch = await Watch.findById(watchID);
  console.log(watch);
  // res.send("fething watchs!");
  res.render("watch-details", watch);
});

module.exports = router;

//render celeb detail page
// router.get("/celebs/:id", (req, res, next) => {
//   const celebId = req.params.id;
//   Celeb.findById(celebId)
//     .then((celebsFromDB) => {
//       console.log(celebsFromDB);
//       res.render("celebs/detail", { celeb: celebsFromDB });
//     })
//     .catch((err) => next(err));
// });
