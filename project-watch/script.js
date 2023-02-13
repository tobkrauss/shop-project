// api branch test!
const express = require("express");
const axios = require("axios");
const { response } = require("express");
const app = express();

// get all brands
// app.get("/", async (req, res) => {
//   try {
//     const response = await axios({
//       method: "GET",
//       url: "https://watch-database1.p.rapidapi.com/all-brands",
//       headers: {
//         "X-RapidAPI-Key": "ff6f56c567msha90eb6c0f5e2b84p1d6a07jsn2353546b7e8e",
//         "X-RapidAPI-Host": "watch-database1.p.rapidapi.com",
//       },
//     });
//     res.send(response.data);
//   } catch (error) {
//     console.error(error);
//     res.send("An error occurred while retrieving the data");
//   }
// });

// get all family by brand name
app.get("/brand", async (req, res) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://watch-database1.p.rapidapi.com/all-family-by/brandname/Rolex",
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

// get all models from brand and family
app.get("/brand/models", async (req, res) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://watch-database1.p.rapidapi.com/all-models-by/brandname/Rolex/family/Submariner",
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

// get specific model
app.get("/brand/models/id", async (req, res) => {
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

// get image
app.get("/brand/models/id/image", async (req, res) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://watch-database1.p.rapidapi.com/watch-media-links-by-id/91894",
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

app.listen(3000, () => {
  console.log("listenin on port 3000");
});
