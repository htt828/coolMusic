const mongoose = require('mongoose')
const Schema = mongoose.Schema

let sliderSchema = new Schema({
	prePlayImgUrl:String,
	videoUrl:String
})
mongoose.model("Slider",sliderSchema)

