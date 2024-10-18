const mongoose = require("mongoose");

const actorMovieSchema = new mongoose.Schema({
  actor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "actors",
    required: true,
  },
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movie_stickets",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

actorMovieSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const ActorMovie = mongoose.model("movie_actors", actorMovieSchema);

module.exports = ActorMovie;
