const router = require("express").Router();
const Review = require("../models/Review.model");
const axios = require("axios");
const Watch = require("../models/Watch.model");
const Cart = require("../models/Cart.model");

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

//create many watches

let arr = [
  {
    brand: "Rolex",
    model: "Daytona",
    price: 29000,
    caseMaterial: "18 ct gold",
    bandMaterial: "Oysterflex",
    waterResistance: 100,
    movement: "Perpetual, mechanical, self-winding",
    features: ["Chronograph", "Cerachrom bezel", "Triplock winding crown"],
    imageUrl:
      "https://www.rueschenbeck.de/media/catalog/product/cache/1/image/2500x/040ec09b1e35df139433887a97daa66f/m/1/m116500ln-0002__1-modelpage_front_facing_landscape.png",
    description:
      "The Rolex Daytona is a classic sports watch that has been a favorite of collectors for decades. Its iconic design and reliable mechanical movement make it a must-have for any watch enthusiast.",
  },
  {
    brand: "Patek Philippe",
    model: "Nautilus",
    price: 70000,
    caseMaterial: "18 ct rose gold",
    bandMaterial: "Leather",
    waterResistance: 120,
    movement: "Caliber 324 SC, automatic",
    features: ["Date", "Sweep seconds hand", "Fold-over clasp"],
    imageUrl:
      "https://www.rueschenbeck.de/media/catalog/product/cache/1/image/450x450/9df78eab33525d08d6e5fb8d27136e95/5/7/5712R-001__0-Soldat.jpg",
    description:
      "The Patek Philippe Nautilus is a true icon of luxury watchmaking. Its distinctive octagonal case and elegant design have made it one of the most sought-after watches in the world.",
  },
  {
    brand: "Audemars Piguet",
    model: "Royal Oak",
    price: 55000,
    caseMaterial: "18 ct pink gold",
    bandMaterial: "Bracelet",
    waterResistance: 50,
    movement: "Selfwinding Manufacture Calibre 3120",
    features: ["Date", "Sapphire crystal", "Octagonal bezel"],
    imageUrl: "https://cdn-products.chronext.com/V/5/V50416/V50416_1_det.png",
    description:
      "The Audemars Piguet Royal Oak is one of the most iconic luxury watches ever made. Its innovative design and high-quality materials make it a favorite of watch collectors around the world.",
  },
  {
    brand: "Cartier",
    model: "Tank",
    price: 25000,
    caseMaterial: "18 ct pink gold",
    bandMaterial: "Alligator leather",
    waterResistance: 30,
    movement: "Calibre 1847 MC, automatic",
    features: [
      "Roman numeral hour markers",
      "Sapphire crystal",
      "Crown set with a synthetic blue spinel",
    ],
    imageUrl:
      "https://medias.collectorsquare.com/images/products/387685/00pp-montre-cartier-tank-francaise-en-acier-ref-2384-vers-2003.jpg",
    description:
      "The Cartier Tank is a classic dress watch that has been popular for over a century. Its rectangular case and elegant design make it a timeless piece that is perfect for any occasion.",
  },
  {
    brand: "IWC",
    model: "Portugieser",
    price: 12000,
    caseMaterial: "Stainless steel",
    bandMaterial: "Alligator leather",
    waterResistance: 30,
    movement: "Calibre 82200, automatic",
    features: [
      "Arabic numeral hour markers",
      "Sapphire crystal",
      "Power reserve display",
    ],
    imageUrl:
      "https://www.rueschenbeck.de/media/catalog/product/cache/1/image/450x450/9df78eab33525d08d6e5fb8d27136e95/I/W/IW371606__0-Soldat.jpg",
    description: "The IWC Portugieser is a classic dress watch",
  },
  {
    brand: "Jaeger-LeCoultre",
    model: "Reverso Classic Small Duetto",
    price: 10800,
    caseMaterial: "Stainless steel",
    bandMaterial: "Alligator leather",
    waterResistance: 30,
    movement: "Calibre 844, manual",
    features: ["Small seconds", "Double-sided dial", "Sapphire crystal"],
    imageUrl:
      "https://cdn2.chrono24.com/images/uhren/25338105-1n7vn6pr766jwmt3dltf8bjl-ExtraLarge.jpg",
    description:
      "The Jaeger-LeCoultre Reverso is a classic Art Deco-style watch that features a unique reversible case. The small Duetto model has two dials, one on each side of the case, making it a versatile choice for any occasion.",
  },
  {
    brand: "Omega",
    model: "Seamaster Aqua Terra",
    price: 5000,
    caseMaterial: "Stainless steel",
    bandMaterial: "Stainless steel",
    waterResistance: 150,
    movement: "Co-Axial Master Chronometer 8900, automatic",
    features: ["Date", "Screw-in crown", "Anti-magnetic"],
    imageUrl:
      "https://www.omegawatches.com/media/catalog/product/cache/a5c37fddc1a529a1a44fea55d527b9a116f3738da3a2cc38006fcc613c37c391/o/m/omega-seamaster-aqua-terra-150m-23110422103003-l.png",
    description:
      "The Omega Seamaster Aqua Terra is a versatile and reliable watch that is equally at home in the office or out on the water. Its anti-magnetic properties make it a favorite of scientists and engineers.",
  },
  {
    brand: "Hublot",
    model: "Big Bang Unico",
    price: 25000,
    caseMaterial: "Sapphire crystal",
    bandMaterial: "Rubber",
    waterResistance: 100,
    movement: "HUB1242, automatic",
    features: ["Chronograph", "Skeleton dial", "Power reserve indicator"],
    imageUrl:
      "https://www.hublot.com/sites/default/files/styles/watch_item_desktop_1x_scale_no_crop_600_6000_/public/2021-06/big-bang-unico-titanium-ceramic-44-mm-soldier-shot.png?itok=Iv1TMU94",
    description:
      "The Hublot Big Bang Unico is a bold and innovative watch that features a case made entirely of sapphire crystal. Its skeleton dial and chronograph functions make it a favorite of watch enthusiasts and collectors.",
  },
  {
    brand: "Vacheron Constantin",
    model: "Overseas Dual Time",
    price: 28500,
    caseMaterial: "Stainless steel",
    bandMaterial: "Rubber",
    waterResistance: 150,
    movement: "Calibre 5110 DT, automatic",
    features: ["Dual time zone", "Date", "Power reserve indicator"],
    imageUrl:
      "https://www.vacheron-constantin.com/dam/rcq/vac/16/23/88/5/1623885.png.transform.vacproddetails.png",
    description:
      "The Vacheron Constantin Overseas Dual Time is a luxurious and versatile watch that is perfect for the frequent traveler. Its dual time zone function and robust construction make it a favorite of watch enthusiasts and collectors alike.",
  },
  {
    brand: "IWC",
    model: "Portofino Hand-Wound Moon Phase",
    price: 12800,
    caseMaterial: "18K red gold",
    bandMaterial: "Alligator leather",
    waterResistance: 30,
    movement: "Caliber 59800, manual",
    features: [
      "Moon phase display",
      "Small seconds",
      "Power reserve of 8 days",
    ],
    imageUrl:
      "https://www.juwelier-vogl.de/cdn/2000x2000/1/e/0/e/1e0e2a54424d4e48ec04be080e95f37d1c6e87a3_IW516401_01_PROD_862_IWC_2000x2000_45mm.jpg",
    description:
      "The IWC Portofino Hand-Wound Moon Phase is a luxurious and elegant dress watch that features a moon phase display and an impressive 8-day power reserve. Its refined design is inspired by the timeless beauty of the Italian Riviera.",
  },
  {
    brand: "Audemars Piguet",
    model: "Royal Oak Offshore",
    price: 39500,
    caseMaterial: "18K pink gold",
    bandMaterial: "Rubber",
    waterResistance: 100,
    movement: "Caliber 3126/3840, automatic",
    features: ["Chronograph", "Date", "Sapphire crystal"],
    imageUrl:
      "http://cdn.shopify.com/s/files/1/0550/6511/6752/products/IMG_2046.jpg?v=1667924450",
    description:
      "The Audemars Piguet Royal Oak Offshore is a bold and masculine watch that is perfect for the discerning collector who appreciates the finer things in life. Its distinctive octagonal case and integrated bracelet have become symbols of luxury and elegance.",
  },
  {
    brand: "Jaeger-LeCoultre",
    model: "Master Ultra Thin Moon",
    price: 12600,
    caseMaterial: "Stainless steel",
    bandMaterial: "Alligator leather",
    waterResistance: 50,
    movement: "Caliber 925, automatic",
    features: ["Moon phase display", "Small seconds", "Date"],
    imageUrl:
      "https://img.jaeger-lecoultre.com/open-graph-squared-boxed-image-1/o-dpr-2/4fc048262e530e298d820b3a006bafbb9c315bad.jpg",
    description:
      "The Jaeger-LeCoultre Master Ultra Thin Moon is a refined and sophisticated watch that features a beautifully designed moon phase display. Its thin and elegant case is a testament to the brand's expertise in watchmaking.",
  },
  {
    brand: "Zenith",
    model: "Chronomaster Sport",
    price: 9900,
    caseMaterial: "Stainless steel",
    bandMaterial: "Rubber",
    waterResistance: 100,
    movement: "Caliber El Primero 3600, automatic",
    features: ["Chronograph", "Date", "Tachymeter scale"],
    imageUrl:
      "https://www.rueschenbeck.de/media/catalog/product/cache/1/image/450x450/9df78eab33525d08d6e5fb8d27136e95/1/8/18-3101-3600-69-M3100__0.jpg",
    description:
      "The Zenith Chronomaster Sport is a versatile and sporty watch that combines style and performance. Its high-precision movement and chronograph function make it the perfect watch for the modern adventurer.",
  },
  {
    brand: "Breguet",
    model: "Classique 5177",
    price: 21900,
    caseMaterial: "18K rose gold",
    bandMaterial: "Alligator leather",
    waterResistance: 30,
    movement: "Caliber 777Q, automatic",
    features: ["Power reserve of 55 hours", "Small seconds"],
    imageUrl:
      "https://wempe-media.com/media/image/5177BR159V6_BG110106_wempe_01.jpg",
    description:
      "The Breguet Classique 5177 is a classic and elegant watch that features the brand's signature guilloché dial and Breguet hands. Its refined design is a tribute to the brand's long-standing heritage in watchmaking.",
  },
  {
    brand: "Chopard",
    model: "L.U.C XP",
    price: 17800,
    caseMaterial: "18K rose gold",
    bandMaterial: "Alligator leather",
    waterResistance: 30,
    movement: "Caliber L.U.C 96.53-L, automatic",
    features: ["Power reserve of 58 hours", "Date"],
    imageUrl:
      "https://juwelierklink.de/wp-content/uploads/2020/12/ChopLUC-600x600.jpg",
    description:
      "The Chopard L.U.C XP is a sleek and sophisticated watch that features a beautifully designed dial with a date window at 6 o'clock. Its slim and elegant case is a testament to the brand's expertise in watchmaking.",
  },
  {
    brand: "Audemars Piguet",
    model: "Royal Oak Chronograph",
    price: 25400,
    caseMaterial: "Stainless steel",
    bandMaterial: "Stainless steel",
    waterResistance: 50,
    movement: "Caliber 2385, automatic",
    features: ["Chronograph", "Date"],
    imageUrl:
      "https://images.stockx.com/images/Audemars-Piguet-Royal-Oak-Chronograph-26331STOO1220ST01-Blue-front.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1610578031",
    description:
      "The Audemars Piguet Royal Oak Chronograph is a classic and iconic watch that features the brand's signature octagonal bezel and 'Grande Tapisserie' dial. Its high-precision movement and chronograph function make it the perfect watch for the modern gentleman.",
  },
  {
    brand: "IWC Schaffhausen",
    model: "Portugieser Chronograph",
    price: 7800,
    caseMaterial: "Stainless steel",
    bandMaterial: "Alligator leather",
    waterResistance: 30,
    movement: "Caliber 79350, automatic",
    features: ["Chronograph", "Date"],
    imageUrl:
      "https://www.iwc.com/content/dam/rcq/iwc/21/50/06/1/2150061.png.transform.global_image_png_180_2x.png",
    description:
      "The IWC Schaffhausen Portugieser Chronograph is a classic and elegant watch that features a beautifully designed dial with a chronograph function and a date window at 3 o'clock. Its refined design is a testament to the brand's long-standing heritage in watchmaking.",
  },
  {
    brand: "Glashütte Original",
    model: "Senator Excellence Panorama Date Moon Phase",
    price: 13200,
    caseMaterial: "Stainless steel",
    bandMaterial: "Alligator leather",
    waterResistance: 50,
    movement: "Caliber 36-04, automatic",
    features: ["Moon phase display", "Panorama date"],
    imageUrl:
      "https://service.glashuette-original.com/storage/masters/watches/medium/W13604010261.png",
    description:
      "The Glashütte Original Senator Excellence Panorama Date Moon Phase is a sophisticated and elegant watch that features a beautifully designed moon phase display and panorama date. Its refined design is a tribute to the brand's long-standing heritage in watchmaking.",
  },
];

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

//Search specific watch by Brand name
router.get("/watch-search", async (req, res) => {
  const { brand } = req.query;
  const watches = await Watch.find({ brand });

  res.render("watches/index", { watches });
});

// add to cart page
// router.post("/cart/add", async (req, res) => {
//   const id = req.body.watchID;
//   console.log("this is the id from the request body!");
//   console.log(id);
//   const watch = await Cart.create({
//     products: id,
//   });
//   // res.send("adding to cart!");
//   // res.redirect("/cart");
//   res.render("cart", watch);
// });

// add to cart
router.post("/cart/add", async (req, res) => {
  const id = req.body.watchID;
  console.log("this is the id from the request body!");
  console.log(id);
  const watch = await Watch.findById(id);
  const cart = await Cart.findOneAndUpdate(
    {},
    {
      $push: {
        products: `${watch.brand} ${watch.model}`,
        price: `${watch.price}`,
      },
    },
    { upsert: true, new: true }
  );
  console.log("SHOPPING CART BELOW!");
  console.log(cart);
  // store the cart ID in the session
  req.session.cartID = cart._id;
  // set a success message in the session
  req.session.successMessage = "Added to cart!";
  res.redirect("/cart");
  // res.send("adding to cart!");
});

router.get("/cart", async (req, res) => {
  const cartID = req.session.cartID;
  console.log("THIS IS THE CART ID");
  console.log(cartID);
  let products = [];
  let price = 0;
  // let quantity = 0;

  if (cartID) {
    // find the cart for the current user
    const cart = await Cart.findOne({ _id: cartID });
    const products = cart.products;
    const prices = cart.price;
    let productPrices = {};
    for (let i = 0; i < prices.length; i++) {
      productPrices[products[i]] = prices[i];
    }
    console.log(productPrices);

    res.render("cart", {
      productPrices,
    });
  }
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
