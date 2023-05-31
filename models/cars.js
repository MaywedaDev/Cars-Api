const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const carSchema = new Schema({
	make: {
		type: String,
		required: true
	},
	model: {
		type: String,
		required: true
	},
	transmission: {
		type: String,
		required: true
	},
    year: {
    	type: Number,
		required: true
    },
    cylinders: {
    	type: Number,
    	required: true
    },
    top_speed: {
    	type: Number,
    	required: true
    },
    acceleration: {
    	type: Number,
    	required: true
    },
    origin: {
    	type: String,
    	required: true
    },
    engine_type: {
    	type: String,
    	required: true
    },
    power: {
    	type: Number,
    	required: true
    }
}, { timestamps: true })

const Cars = mongoose.model('Cars', carSchema)

module.exports = Cars;