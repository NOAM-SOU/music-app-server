const mongoose = require("mongoose");
const userPlaylistSchema = new mongoose.Schema({
  playlistName: { type: String, required: true },
  playlist: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Song" }],
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
});

const Playlist = mongoose.model("Playlist", userPlaylistSchema);
module.exports = Playlist;
