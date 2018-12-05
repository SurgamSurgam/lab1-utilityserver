const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.get("/gif", (req, res) => {
  let query = req.query;
  let items = Object.values(query);
  let apiKey = "bh9XoPmSxq8G94wQUNX2vvTb4vuePoNo";
  let url = `http://api.giphy.com/v1/gifs/search?q=${items[0]}&api_key=${apiKey}&limit=2`;
  let images = [];

  axios
    .get(url)
    .then(res => {
      let arrObj = res.data.data;
      arrObj.forEach(el => images.push(el.url));
    })
    .then(() => res.send(images))
    .catch(res => {
      console.log("error", res);
    });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
