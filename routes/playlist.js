const express = require("express");
const router = express.Router();
const Playlist = require("../models/Playlist");
const User = require("../models/User");

const authJWT = require("../middleware/authorization");
const Song = require("../models/Song");

router.post("/newplaylist", authJWT, async (req, res) => {
  console.log(req.body);
  let playlist = await new Playlist({
    ...req.body,
    userId: req.user._id,
  }).save();
  console.log("Playlist added successfully");
  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { playlists: playlist } },
    { new: true }
  );
  res.send(playlist);
});

router.get("/", authJWT, async (req, res) => {
  let play = await User.findOne({ _id: req.user._id })
    .populate("playlists")
    .exec();
  console.log(play.playlists);
  res.send(play.playlists);
});

router.get("/getplaylists/:id", authJWT, async (req, res) => {
  let list = await Playlist.findOne({ _id: req.params.id });
  console.log(list.playlist);
  res.send(list.playlist);
});

// router.post("/addsongtoplaylist" , authJWT, async (req,res) => {
//   const song = await Song.findOne({...req.body})
//   const existIn =
//   if(song){
//      await Playlist.findOneAndUpdate({_id: req.params.id},{$push: {playlist: song}})

//   } else {

//   }
// })

module.exports = router;
