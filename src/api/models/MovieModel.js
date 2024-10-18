const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const movieSchema = new Schema({
  // Tên phim
  name: {
    type: String,
    required: true
  },
  //Ảnh
  img: {
    type: String,
    required: true
  },

  img_video:{
    type: String,
    required: true
  },

  url_video: {
    type: String,
    required: true
  },

  // Mô tả phim
  description: {
    type: String,
  },

  // Nhà sản xuất
  producer: {
    type: String,
    required: true,
  },

  // Đạo diễn phim
  director: {
    type: String,
    required: true,
  },

  age_limit: {
    type: Number,
    require: true
  },

  country: {
    type: String,
    require: true
  },

  // Thời lượng phim (phút)
  duration: {
    type: Number,
  },

  // Ngày phát hành
  release_date: {
    type: Date,
  },

  subtitles:{
    type: String,
    require:true
  },
  // Tổng điểm từ các lượt vote
  totalRatingPoints: {
    type: Number,
    default: 0,
  },

  // Số lượng người đã vote
  votes: {
    type: Number,
    default: 0,
  },

  // Đánh giá trung bình (0-10)
  rating: {
    type: Number,
    default: null,
    min: 0,
    max: 10,
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

movieSchema.pre("save", function (next) {
    this.updated_at = Date.now();
    next();
  });

movieSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("movie_stickets", movieSchema);
