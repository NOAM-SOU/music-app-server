const express = require("express");
const API_KEY = process.env.API_KEY;
const axios = require("axios").default;
const router = express.Router();

router.get("/", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://youtube-v31.p.rapidapi.com/search",
    params: {
      q: req.query.q,
      part: "snippet,id",
      regionCode: "US",
      maxResults: "50",
      order: "date",
    },
    headers: {
      "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
      "x-rapidapi-key": `${API_KEY}`,
    },
  };

  axios
    .request(options)
    .then((response) => {
      const item = response.data.items;

      const obj = item.map((p) => {
        return {
          id: p.id.videoId,
          title: p.snippet.title,
          artist: p.snippet.channelTitle,
          img: p.snippet.thumbnails.high.url,
          artistId: p.snippet.channelId,
        };
      });
      console.log(obj);
      //   console.log(response.data.items.id.videoId);

      res.send(obj);
    })
    .catch((error) => {
      console.error(error);
    });
});

router.get("/mp3", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://youtube-mp36.p.rapidapi.com/dl",
    params: { id: req.query.q },
    headers: {
      "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
      "x-rapidapi-key": `${API_KEY}`,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

// router.get("/api/mp3", async (req, res) => {
//   var options = {
//     method: "GET",
//     url: "https://youtube-search-results.p.rapidapi.com/youtube-search/",
//     params: { q: "justin+bieber" },
//     headers: {
//       "x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
//       "x-rapidapi-key": "a2af679808msha0eaa427da7a206p18c767jsn6af22a3577b2",
//     },
//   };

//   axios
//     .request(options)
//     .then(function (response) {
//       console.log(response.data);
//       res.send(response.data.refinements);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// });

router.get("/api/mp3", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://simple-youtube-search.p.rapidapi.com/search",
    params: { query: req.query.q, safesearch: "false" },

    headers: {
      "x-rapidapi-host": "simple-youtube-search.p.rapidapi.com",
      "x-rapidapi-key": "a2af679808msha0eaa427da7a206p18c767jsn6af22a3577b2",
    },
  };

  axios
    .request(options)
    .then((response) => {
      const results = response.data.results;

      const obj = results.map((song) => {
        return {
          id: song.id,
          img: song.thumbnail.url,
          title: song.title,
        };
      });
      console.log(obj);
      res.send(obj);
      // .then((response) => {
      //   const item = response.data.items;

      //   const obj = item.map((p) => {
      //     return {
      //       id: p.id.videoId,
      //       title: p.snippet.title,
      //       artist: p.snippet.channelTitle,
      //       img: p.snippet.thumbnails.high.url,
      //       artistId: p.snippet.channelId,
      //     };
      //   });
      //   console.log(obj);
      //   //   console.log(response.data.items.id.videoId);

      //   res.send(obj);
    })
    .catch(function (error) {
      console.error(error);
    });
});

module.exports = router;
