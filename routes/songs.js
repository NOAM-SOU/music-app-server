const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const Playlist = require("../models/Playlist");
const authJWT = require("../middleware/authorization");
const User = require("../models/User");
const { restart } = require("nodemon");

router.post("/addsong/:id", authJWT, async (req, res) => {
  console.log(req.body);
  let song = await Song.findOne({ src: req.body.src });
  if (song) {
    console.log("exist");
    return;
  } else {
    song = await new Song({ ...req.body }).save();
    let newSong = await Playlist.findOne(song);
    if (newSong) {
      console.log("exist un the playlist");
      return;
    } else {
      newSong = await Playlist.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { playlist: song } },
        { new: true }
      );
    }
  }
  res.send(song);
});

router.get("/allsongs", authJWT, async (req, res) => {
  let songsList = await User.findOne({ _id: req.user._id }).populate("");
  res.send(songsList);
});

router.delete("/:title", authJWT, async (req, res) => {
  let song = await Song.findOne({ title: req.params.title });
  if (!song) return res.status(400);
  if (req.user.username === song.user) {
    deletedSong = await Song.deleteOne({ title: req.params.title });
    return res.send({ message: "OK", deletedSong });
  }
  return res.status(401);
});

router.post("/add/favorite", authJWT, async (req, res) => {
  console.log(req.body);
  const song = await Song.findOne({ src: req.body.src });
  if (song) {
    console.log("exist");
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { favoriteSongs: song } },
      { new: true }
    );
    return;
  } else {
    const newSong = await new Song({ ...req.body }).save();
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { favoriteSongs: newSong } },
      { new: true }
    );
    console.log(req.user);
  }
  res.send(song);
});

router.post("/addtofavorite", authJWT, async (req, res) => {
  let song = await Song.findOne({ src: req.body.src });
  if (song) {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { favoriteSongs: song } },
      { new: true }
    );
  } else {
    song = await new Song({ ...req.body }).save();
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { favoriteSongs: song } },
      { new: true }
    );
  }
  console.log(song);
  res.send(song);
});

router.get("/getfavorite", authJWT, async (req, res) => {
  let fav = await User.findOne({ _id: req.user._id })
    .populate("favoriteSongs")
    .exec();
  console.log(fav.favoriteSongs);
  res.send(fav.favoriteSongs);
});

// else if (song) {
//   await User.findOneAndUpdate(
//     { _id: req.user._id },
//     { $push: { favoriteSongs: song } },
//     { new: true }
//   );
// } else {
//   song = await new Song({ ...req.body }).save();
//   await User.findOneAndUpdate(
//     { _id: req.user._id },
//     { $push: { favoriteSongs: song } },
//     { new: true }
//   );
// }
// if (song) {
//   await User.findOneAndUpdate(
//     { _id: req.user._id },
//     { $push: { favoriteSongs: song } },
//     { new: true }
//   );
// } else {
//   song = await new Song({ ...req.body }).save();
//   await User.findOneAndUpdate(
//     { _id: req.user._id },
//     { $push: { favoriteSongs: song } },
//     { new: true }
//   );
// }

module.exports = router;
