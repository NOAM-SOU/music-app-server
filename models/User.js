const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    playlists: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Playlist" }],
    favoriteSongs: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Song" }],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
